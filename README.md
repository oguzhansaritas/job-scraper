# 🚀 Job Scraper & Resume Analyzer

**AI-powered job scraping and resume matching system** that automatically analyzes job postings and matches them with your resume/CV for optimal job search results.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Python](https://img.shields.io/badge/Python-3.9+-green)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan)

## ✨ Features

### 🔍 **Smart Job Analysis**
- **Multi-URL Support**: Analyze multiple job postings simultaneously
- **Intelligent Scoring**: Advanced algorithm ranks jobs by compatibility
- **Real-time Processing**: Fast analysis with optimized backend

### 📄 **Resume Integration**
- **PDF Upload**: Drag & drop PDF resume upload with automatic text extraction
- **AI Keyword Extraction**: Automatically extracts relevant skills from your resume
- **Text Input**: Manual resume text input option
- **Smart Parsing**: Extracts skills, experience, and education automatically

### 🎯 **Matching System**
- **Advanced Keyword Matching**: Matches job requirements with your skills
- **Resume Compatibility**: Calculates percentage match with job descriptions
- **Skill Highlighting**: Shows matched and missing skills for each job
- **Priority Sorting**: Results sorted by compatibility score

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Feedback**: Loading states and progress indicators
- **Color-coded Results**: Visual scoring with intuitive color system
- **Professional Interface**: Built with modern React and Tailwind CSS

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.3.4** - React framework with app router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component library
- **PDF.js** - Client-side PDF processing

### Backend
- **Python 3.9+** - Modern Python with type hints
- **Flask** - Lightweight web framework
- **BeautifulSoup4** - Web scraping
- **Requests** - HTTP client
- **Modular Architecture** - SOLID principles implementation

### Infrastructure
- **AWS Lambda** - Serverless computing (optional)
- **Vercel** - Frontend deployment
- **Environment Variables** - Configuration management

## 🏗️ System Architecture

This project follows **software engineering best practices** and **SOLID principles**:

### SOLID Principles ✅
- **Single Responsibility Principle (SRP)**: Each component/service has a single responsibility
- **Open/Closed Principle (OCP)**: Open for extension, closed for modification
- **Liskov Substitution Principle (LSP)**: Interface substitution support
- **Interface Segregation Principle (ISP)**: Small, focused interfaces
- **Dependency Inversion Principle (DIP)**: Dependency injection pattern

### Other Principles ✅
- **DRY (Don't Repeat Yourself)**: Code duplication minimized
- **KISS (Keep It Simple, Stupid)**: Simple and understandable code
- **YAGNI (You Aren't Gonna Need It)**: Only necessary features implemented

## 📁 Project Structure

```
job-scraper/
├── backend/                          # Python Flask Backend
│   ├── src/
│   │   ├── core/                    # Abstract classes & interfaces
│   │   │   └── interfaces.py        # IJobScraper, IMatchCalculator
│   │   ├── models/                  # Data models
│   │   │   └── job_models.py        # JobData, MatchScore, JobResult
│   │   ├── services/                # Business logic services
│   │   │   ├── scraper_service.py   # Web scraping service
│   │   │   ├── match_service.py     # Job matching service
│   │   │   └── analyzer_service.py  # Workflow orchestration
│   │   ├── utils/                   # Helper utilities
│   │   │   └── helpers.py           # Text processing, validation
│   │   ├── config/                  # Configuration
│   │   │   └── settings.py          # App settings & environments
│   │   ├── api/                     # Flask API endpoints
│   │   │   └── routes.py            # HTTP routes
│   │   ├── main.py                  # Main application entry
│   │   └── lambda_adapter.py        # AWS Lambda adapter
│   ├── requirements.txt             # Python dependencies
│   └── README.md                    # Backend documentation
├── job-scraper-frontend/            # Next.js Frontend
│   ├── src/
│   │   ├── app/                     # Next.js app router
│   │   ├── components/              # React components
│   │   │   ├── JobBotUI.tsx         # Main UI component
│   │   │   ├── JobCard.tsx          # Job display component
│   │   │   ├── JobFilters.tsx       # Filtering controls
│   │   │   └── StatsOverview.tsx    # Statistics display
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useJobAnalysis.ts    # Job processing logic
│   │   │   └── useResumeProcessing.ts # Resume handling
│   │   ├── lib/                     # Utility libraries
│   │   │   ├── pdfUtils.ts          # PDF processing
│   │   │   └── jobUtils.ts          # Job analysis utilities
│   │   └── types/                   # TypeScript definitions
│   ├── public/                      # Static assets
│   ├── package.json                 # Dependencies and scripts
│   └── README.md                    # Frontend documentation
└── README.md                        # This file
```

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Python >= 3.9
```

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/job-scraper.git
cd job-scraper
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python src/main.py
```

The backend will start on `http://localhost:5001`

### 3. Frontend Setup
```bash
# Navigate to frontend (in a new terminal)
cd job-scraper-frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
```

### 4. Environment Configuration
Create `.env.local` in the frontend directory:
```bash
# Local development
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5001/analyze

# Production AWS API (optional)
# NEXT_PUBLIC_API_ENDPOINT=https://your-api-gateway.amazonaws.com/prod/scrape
```

### 5. Start Development Servers
```bash
# In frontend directory
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How to Use

### 1. **Upload Your Resume**
- Click "Upload PDF Resume" or drag & drop your PDF file
- Wait for automatic text extraction and keyword generation
- Review and edit extracted keywords if needed

### 2. **Add Job Links**
- Paste job posting URLs (one per line) in the text area
- Supports multiple job boards and company career pages
- No limit on the number of URLs

### 3. **Analyze Jobs**
- Click "Analyze Jobs" to start the process
- Monitor real-time progress with visual indicators
- View results as they are processed

### 4. **Review Results**
- Jobs are automatically sorted by compatibility score
- Use filters to show only jobs above a certain score
- Click on job cards to view detailed analysis
- Export results for future reference

## 🎯 Scoring System

### Resume Match Score (0-100%)
- Analyzes how well your resume content matches the job description
- Considers skills, experience, and education alignment
- Uses advanced text similarity algorithms

### Keyword Match Score (0-100%)
- Compares your skills/keywords with job requirements
- Identifies matched and missing keywords
- Provides actionable insights for skill development

### Total Compatibility Score
- Weighted average of resume and keyword scores
- Provides overall job compatibility rating
- Helps prioritize job applications

## 🚀 Deployment

### Frontend (Vercel - Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd job-scraper-frontend
vercel --prod
```

### Backend Options

#### 1. AWS Lambda (Serverless)
```bash
# Package for Lambda deployment
zip -r lambda-deployment.zip backend/src/ backend/requirements.txt
# Upload to AWS Lambda
```

#### 2. Traditional Hosting
```bash
# Install dependencies on server
pip install -r requirements.txt

# Start with production WSGI server
gunicorn -w 4 -b 0.0.0.0:5001 src.main:app
```

### Static Deployment (FTP)
```bash
# Build static version
cd job-scraper-frontend
npm run build

# Upload 'out' directory contents to your web server
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd job-scraper-frontend
npm run test
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **Python**: Follow PEP 8 style guide
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured rules for frontend
- **Testing**: Write tests for new features

## 📊 Performance

- **Frontend**: Optimized with Next.js 15 and Turbopack
- **Backend**: Efficient web scraping with caching
- **Processing**: Concurrent job analysis for faster results
- **Memory**: Optimized for handling large numbers of job postings

## 🔒 Security

- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Built-in protection against abuse
- **CORS**: Properly configured for cross-origin requests
- **Environment Variables**: Sensitive data stored securely

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/job-scraper/issues)
- **Documentation**: [Wiki](https://github.com/your-username/job-scraper/wiki)
- **Email**: support@your-domain.com

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Flask Community** - For the lightweight web framework
- **Open Source Contributors** - For the tools and libraries used

---

<div align="center">

**Built with ❤️ for job seekers worldwide**

[⭐ Star this repo](https://github.com/your-username/job-scraper) • [🐛 Report Bug](https://github.com/your-username/job-scraper/issues) • [💡 Request Feature](https://github.com/your-username/job-scraper/issues)

</div>

## � Documentation

- [Backend README](backend/README.md) - Detailed backend documentation
- [Frontend README](job-scraper-frontend/README.md) - Frontend documentation  
- [API Guide](API_ENDPOINT_GUIDE.md) - API usage guide
- [Refactoring Guide](REFACTORING_GUIDE.md) - Refactoring documentation

## � Migration from Legacy

Legacy `local_api_server.py` and `lambda_function.py` files are kept for backward compatibility but marked as DEPRECATED. Use the new modular backend.

## � API Usage

### Job Analysis Endpoint

```bash
POST http://localhost:5001/analyze
Content-Type: application/json

{
  "links": [
    "https://example.com/job1",
    "https://example.com/job2"
  ],
  "keywords": ["python", "react", "sql"],
  "resume": "Your resume text here..."
}
```

### Response Format

```json
{
  "results": [
    {
      "url": "https://example.com/job1",
      "title": "Software Developer",
      "total_score": 85.5,
      "resume_score": 78.2,
      "keyword_score": 95.0,
      "matched_skills": ["python", "react"],
      "resume_matches": 12,
      "keyword_matches": 2
    }
  ],
  "summary": {
    "total_jobs": 2,
    "successful": 1,
    "failed": 1
  }
}
```

## 🏗️ Architecture Decisions

### Backend Architecture

1. **Interface Segregation**: Each service implements its own interface
2. **Dependency Injection**: Services are injected in constructors
3. **Factory Pattern**: ApplicationFactory creates the main application
4. **Adapter Pattern**: Adapter used for Lambda deployment
5. **Strategy Pattern**: Different configs for different environments

### Frontend Architecture

1. **Custom Hooks**: Business logic in React hooks
2. **Component Composition**: Small, reusable components
3. **Type Safety**: Comprehensive TypeScript typing
4. **Separation of Concerns**: UI, business logic, and utils separated
5. **Constants Management**: Centralized constants file

## 🛠️ Development

### Adding New Features

1. **Backend**: Create interface → Implement service → Add API endpoint
2. **Frontend**: Define types → Create hook → Develop component

### Writing Tests

```bash
# Backend
cd backend
pytest tests/

# Frontend
cd job-scraper-frontend
npm test
```

### Code Quality

```bash
# Backend
black src/
flake8 src/

# Frontend
npm run lint
npm run type-check
```

## � Quick Development Setup

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python src/main.py
```

Backend will run on: `http://localhost:5001`

### 2. Frontend Setup

```bash
cd job-scraper-frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:3000`

### 3. Environment Configuration

**Backend (.env):**
```bash
ENVIRONMENT=development
HOST=0.0.0.0
PORT=5001
DEBUG=True
REQUEST_TIMEOUT=10
MAX_LINKS_PER_REQUEST=10
```

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5001/analyze
```

## ⚡ Deployment Options

### Development
```bash
npm run dev           # Frontend
python src/main.py    # Backend
```

### Production
```bash
npm run build && npm start  # Frontend
gunicorn -c gunicorn.conf.py src.main:app  # Backend
```

### AWS Lambda
Deploy `backend/src/lambda_adapter.py` to Lambda.
