# Job Scraper Backend

Modern, modular ve SOLID prensiplerine uygun job scraper backend uygulaması.

## 🏗️ Mimari

Bu backend uygulaması aşağıdaki software engineering prensiplerine uygun olarak tasarlanmıştır:

### SOLID Prensipleri

- **Single Responsibility Principle (SRP)**: Her sınıf ve modül tek bir sorumluluğa sahiptir
- **Open/Closed Principle (OCP)**: Kod genişletmeye açık, değişikliğe kapalıdır
- **Liskov Substitution Principle (LSP)**: Interface'ler doğru şekilde implement edilir
- **Interface Segregation Principle (ISP)**: Küçük, odaklanmış interface'ler kullanılır
- **Dependency Inversion Principle (DIP)**: Yüksek seviye modüller düşük seviye modüllere bağımlı değildir

### Diğer Prensipler

- **DRY (Don't Repeat Yourself)**: Kod tekrarı minimize edilir
- **KISS (Keep It Simple, Stupid)**: Basit ve anlaşılır kod yazılır
- **YAGNI (You Aren't Gonna Need It)**: Sadece gerekli olan özellikler implement edilir

## 📁 Dosya Yapısı

```
backend/
├── src/
│   ├── core/                 # Temel interface'ler ve abstract sınıflar
│   │   ├── __init__.py
│   │   └── interfaces.py     # IJobScraper, IMatchCalculator, IJobAnalyzer
│   ├── models/               # Data modelleri
│   │   ├── __init__.py
│   │   └── job_models.py     # JobData, MatchScore, JobResult
│   ├── services/             # İş mantığı servisleri
│   │   ├── __init__.py
│   │   ├── scraper_service.py     # Web scraping
│   │   ├── match_service.py       # Job matching
│   │   └── analyzer_service.py    # Workflow orchestration
│   ├── utils/                # Yardımcı fonksiyonlar
│   │   ├── __init__.py
│   │   └── helpers.py        # Text processing, validation
│   ├── config/               # Konfigürasyon
│   │   ├── __init__.py
│   │   └── settings.py       # Uygulama ayarları
│   ├── api/                  # Flask API endpoints
│   │   ├── __init__.py
│   │   └── routes.py         # HTTP route'ları
│   ├── main.py               # Ana uygulama giriş noktası
│   ├── lambda_adapter.py     # AWS Lambda adapter
│   └── __init__.py
├── requirements.txt          # Python dependencies
└── README.md                # Bu dosya
```

## 🚀 Kullanım

### Yerel Geliştirme

1. **Dependencies yükleyin:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Uygulamayı başlatın:**
   ```bash
   python src/main.py
   ```

3. **API endpoint'i:**
   ```
   http://localhost:5001/analyze
   ```

### Environment Variables

```bash
# Server konfigürasyonu
HOST=0.0.0.0
PORT=5001
DEBUG=True

# Request ayarları
REQUEST_TIMEOUT=10
MAX_CONTENT_LENGTH=1048576
MAX_LINKS_PER_REQUEST=10

# Environment
ENVIRONMENT=development  # development, production, lambda
```

### AWS Lambda Deployment

Lambda için `lambda_adapter.py` dosyasını kullanın:

```python
from lambda_adapter import lambda_handler
```

## 📡 API Endpoints

### POST /analyze

Job analizi yapar.

**Request:**
```json
{
  "links": ["https://example.com/job1", "https://example.com/job2"],
  "keywords": ["python", "react", "sql"],
  "resume": "Resume text here..."
}
```

**Response:**
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

### GET /health

Sağlık kontrolü.

**Response:**
```json
{
  "status": "healthy",
  "service": "job-scraper-api",
  "version": "2.0.0"
}
```

## 🏗️ Genişletme

### Yeni Scraper Eklemek

1. `IJobScraper` interface'ini implement edin
2. Yeni service'i `services/` klasörüne ekleyin
3. `main.py`'de dependency injection ile kullanın

### Yeni Matching Algorithm Eklemek

1. `IMatchCalculator` interface'ini implement edin
2. `services/match_service.py`'i genişletin veya yeni service oluşturun

### Yeni API Endpoint Eklemek

1. `api/routes.py`'e yeni method ekleyin
2. Gerekirse yeni blueprint oluşturun

## 🧪 Test

```bash
# Unit testler
pytest tests/

# Coverage
pytest --cov=src tests/
```

## 📝 Önemli Değişiklikler

- Monolitik `local_api_server.py` modüler yapıya dönüştürüldü
- SOLID prensiplerine uygun interface'ler eklendi
- Dependency injection pattern'i kullanıldı
- Comprehensive error handling eklendi
- Configurable settings sistemi oluşturuldu
- Lambda deployment için adapter pattern kullanıldı
