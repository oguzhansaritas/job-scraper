import { useState } from 'react';
import { type ResumeData, extractTextFromPDF, parseResumeText, generateKeywordsFromResume, generateKeywordsFromManualText } from '@/lib/pdfUtils';
import { FILE_LIMITS, UI_MESSAGES } from '@/lib/constants';

export const useResumeProcessing = () => {
  const [resume, setResume] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [processingPDF, setProcessingPDF] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePDFUpload = async (file: File) => {
    if (file.size > FILE_LIMITS.MAX_PDF_SIZE) {
      setError(UI_MESSAGES.ERRORS.FILE_TOO_LARGE);
      return;
    }

    setProcessingPDF(true);
    setError(null);

    try {
      const extractedText = await extractTextFromPDF(file);
      console.log('PDF extracted text:', extractedText.substring(0, 500) + '...');
      setResume(extractedText);
    } catch (error) {
      console.error('PDF processing error:', error);
      setError(UI_MESSAGES.ERRORS.PDF_PROCESSING);
    } finally {
      setProcessingPDF(false);
    }
  };

  const analyzeResume = async () => {
    if (!resume.trim()) {
      setError('Please enter your resume information.');
      return null;
    }

    setProcessingPDF(true);
    setError(null);

    try {
      const parsedData = parseResumeText(resume);
      setResumeData(parsedData);
      
      const autoKeywords = generateKeywordsFromResume(parsedData);
      return autoKeywords;
      
    } catch (error) {
      console.error('Resume analysis error:', error);
      setError(UI_MESSAGES.ERRORS.RESUME_ANALYSIS);
      return null;
    } finally {
      setProcessingPDF(false);
    }
  };

  const generateKeywords = () => {
    if (!resume.trim()) {
      setError('Please enter resume text first to generate keywords.');
      return [];
    }

    try {
      const generatedKeywords = generateKeywordsFromManualText(resume);
      if (generatedKeywords.length > 0) {
        setError(null);
        return generatedKeywords;
      } else {
        setError(UI_MESSAGES.ERRORS.NO_KEYWORDS_GENERATED);
        return [];
      }
    } catch (error) {
      console.error('Keyword generation error:', error);
      setError(UI_MESSAGES.ERRORS.KEYWORD_GENERATION);
      return [];
    }
  };

  const clearResumeData = () => {
    setResumeData(null);
    setResume('');
    setError(null);
  };

  return {
    resume,
    resumeData,
    processingPDF,
    error,
    setResume,
    setError,
    handlePDFUpload,
    analyzeResume,
    generateKeywords,
    clearResumeData,
  };
};
