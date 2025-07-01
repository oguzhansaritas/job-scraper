# Job Scraper Full System

Modern, modular ve SOLID prensiplerine uygun job scraper sistemi. Next.js frontend ve Python Flask backend ile geliştirilmiştir.

## 🏗️ Sistem Mimarisi

Bu proje software engineering best practices'lere uygun olarak tasarlanmıştır:

### SOLID Prensipleri ✅
- **Single Responsibility Principle (SRP)**: Her component/service tek sorumluluğa sahip
- **Open/Closed Principle (OCP)**: Genişletmeye açık, değişikliğe kapalı
- **Liskov Substitution Principle (LSP)**: Interface substitution desteği
- **Interface Segregation Principle (ISP)**: Küçük, odaklanmış interface'ler
- **Dependency Inversion Principle (DIP)**: Dependency injection pattern

### Diğer Prensipler ✅
- **DRY (Don't Repeat Yourself)**: Kod tekrarı minimize edildi
- **KISS (Keep It Simple, Stupid)**: Basit ve anlaşılır kod
- **YAGNI (You Aren't Gonna Need It)**: Sadece gerekli özellikler

## 📁 Proje Yapısı

```
job_scraper_full_system/
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
│   │   │   ├── JobFilters.tsx       # Filtering component
│   │   │   ├── StatsOverview.tsx    # Statistics component
│   │   │   └── ui/                  # Reusable UI components
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useJobAnalysis.ts    # Job analysis logic
│   │   │   └── useResumeProcessing.ts # Resume processing
│   │   ├── lib/                     # Utility libraries
│   │   │   ├── jobUtils.ts          # Job-related utilities
│   │   │   ├── pdfUtils.ts          # PDF processing
│   │   │   ├── constants.ts         # App constants
│   │   │   └── utils.ts             # General utilities
│   │   └── types/                   # TypeScript type definitions
│   ├── package.json
│   └── README.md
├── local_api_server.py              # DEPRECATED - Legacy compatibility
├── lambda_function.py               # DEPRECATED - Legacy compatibility
├── API_ENDPOINT_GUIDE.md
├── REFACTORING_GUIDE.md
└── README.md                        # This file
```

## 🚀 Hızlı Başlangıç

### 1. Backend Kurulumu

```bash
cd backend
pip install -r requirements.txt
python src/main.py
```

Backend çalışacak: `http://localhost:5001`

### 2. Frontend Kurulumu

```bash
cd job-scraper-frontend
npm install
npm run dev
```

Frontend çalışacak: `http://localhost:3000`

### 3. Environment Konfigürasyonu

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

## 💡 Özellikler

### Backend
- ✅ Modular SOLID architecture
- ✅ Dependency injection pattern
- ✅ Comprehensive error handling
- ✅ Multiple environment support
- ✅ AWS Lambda compatibility
- ✅ Configurable settings
- ✅ Clean separation of concerns

### Frontend
- ✅ Modern React with TypeScript
- ✅ Custom hooks for state management
- ✅ Modular component architecture
- ✅ PDF resume processing
- ✅ Real-time job analysis
- ✅ Advanced filtering and sorting
- ✅ Responsive design

## 📡 API Kullanımı

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

## 🏗️ Mimari Kararları

### Backend Architecture

1. **Interface Segregation**: Her service kendi interface'ini implement eder
2. **Dependency Injection**: Services constructor'larda inject edilir
3. **Factory Pattern**: ApplicationFactory ana uygulamayı oluşturur
4. **Adapter Pattern**: Lambda deployment için adapter kullanılır
5. **Strategy Pattern**: Farklı environment'lar için farklı config'ler

### Frontend Architecture

1. **Custom Hooks**: Business logic React hook'larında
2. **Component Composition**: Küçük, yeniden kullanılabilir component'ler
3. **Type Safety**: Comprehensive TypeScript typing
4. **Separation of Concerns**: UI, business logic ve utils ayrı
5. **Constants Management**: Centralized constants file

## 🛠️ Geliştirme

### Yeni Feature Ekleme

1. **Backend**: Interface oluştur → Service implement et → API endpoint ekle
2. **Frontend**: Type tanımla → Hook oluştur → Component geliştir

### Test Yazma

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

## 📦 Deployment

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
`backend/src/lambda_adapter.py` dosyasını Lambda'ya deploy edin.

## 📚 Belgeler

- [Backend README](backend/README.md) - Detaylı backend belgeleri
- [Frontend README](job-scraper-frontend/README.md) - Frontend belgeleri
- [API Guide](API_ENDPOINT_GUIDE.md) - API kullanım kılavuzu
- [Refactoring Guide](REFACTORING_GUIDE.md) - Refactoring belgeleri

## 🔄 Migration from Legacy

Eski `local_api_server.py` ve `lambda_function.py` dosyları backward compatibility için korunmuştur ancak DEPRECATED olarak işaretlenmiştir. Yeni modular backend'i kullanın.

## 🚀 Teknolojiler

### Backend
- Python 3.8+
- Flask 3.0+
- Beautiful Soup 4
- Requests
- AWS Lambda (Optional)

### Frontend  
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- PDF.js

## 📝 License

MIT License
