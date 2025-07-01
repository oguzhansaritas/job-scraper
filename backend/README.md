# Job Scraper Backend

Modern, modular backend application following SOLID principles for intelligent job analysis and resume matching.

## 🏗️ Architecture

This backend application is designed following software engineering best practices:

### SOLID Principles

- **Single Responsibility Principle (SRP)**: Each class and module has a single responsibility
- **Open/Closed Principle (OCP)**: Code is open for extension, closed for modification
- **Liskov Substitution Principle (LSP)**: Interfaces are properly implemented and substitutable
- **Interface Segregation Principle (ISP)**: Small, focused interfaces are used
- **Dependency Inversion Principle (DIP)**: High-level modules are not dependent on low-level modules

### Other Principles

- **DRY (Don't Repeat Yourself)**: Code duplication is minimized
- **KISS (Keep It Simple, Stupid)**: Simple and understandable code is written
- **YAGNI (You Aren't Gonna Need It)**: Only necessary features are implemented

## 📁 Project Structure

```
backend/
├── src/
│   ├── core/                 # Core interfaces and abstract classes
│   │   ├── __init__.py
│   │   └── interfaces.py     # IJobScraper, IMatchCalculator, IJobAnalyzer
│   ├── models/               # Data models
│   │   ├── __init__.py
│   │   └── job_models.py     # JobData, MatchScore, JobResult
│   ├── services/             # Business logic services
│   │   ├── __init__.py
│   │   ├── scraper_service.py     # Web scraping service
│   │   ├── match_service.py       # Job matching service
│   │   └── analyzer_service.py    # Workflow orchestration
│   ├── utils/                # Helper utilities
│   │   ├── __init__.py
│   │   └── helpers.py        # Text processing, validation
│   ├── config/               # Configuration
│   │   ├── __init__.py
│   │   └── settings.py       # Application settings
│   ├── api/                  # Flask API endpoints
│   │   ├── __init__.py
│   │   └── routes.py         # HTTP routes
│   ├── main.py               # Main application entry point
│   ├── lambda_adapter.py     # AWS Lambda adapter
│   └── __init__.py
├── requirements.txt          # Python dependencies
└── README.md                # This file
```

## 🚀 Usage

### Local Development

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Start the application:**
   ```bash
   python src/main.py
   ```

3. **API endpoint:**
   ```
   http://localhost:5001/analyze
   ```

### Environment Variables

```bash
# Server configuration
HOST=0.0.0.0
PORT=5001
DEBUG=True

# Request settings
REQUEST_TIMEOUT=10
MAX_CONTENT_LENGTH=1048576
MAX_LINKS_PER_REQUEST=10

# Environment
ENVIRONMENT=development  # development, production, lambda
```

### AWS Lambda Deployment

Use `lambda_adapter.py` for Lambda deployment:

```python
from lambda_adapter import lambda_handler
```

## 📡 API Endpoints

### POST /analyze

Performs job analysis.

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

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "job-scraper-api",
  "version": "2.0.0"
}
```

## 🏗️ Extending the System

### Adding a New Scraper

1. Implement the `IJobScraper` interface
2. Add the new service to the `services/` directory
3. Use dependency injection in `main.py`

### Adding a New Matching Algorithm

1. Implement the `IMatchCalculator` interface
2. Extend `services/match_service.py` or create a new service

### Adding a New API Endpoint

1. Add a new method to `api/routes.py`
2. Create a new blueprint if necessary

## 🧪 Testing

```bash
# Unit tests
pytest tests/

# Coverage
pytest --cov=src tests/
```

## 📝 Important Changes

- Monolithic `local_api_server.py` refactored to modular architecture
- SOLID principle-compliant interfaces added
- Dependency injection pattern implemented
- Comprehensive error handling added
- Configurable settings system created
- Adapter pattern used for Lambda deployment
