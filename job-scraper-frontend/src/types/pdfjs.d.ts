declare module 'pdfjs-dist' {
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
  
  export const version: string;
  
  export function getDocument(src: { data: ArrayBuffer }): {
    promise: Promise<{
      numPages: number;
      getPage: (pageNum: number) => Promise<{
        getTextContent: () => Promise<{
          items: Array<{ str: string }>;
        }>;
      }>;
    }>;
  };
}
