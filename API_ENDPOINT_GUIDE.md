# AWS API Endpoint Değiştirme Rehberi

## 🔄 Mevcut Durum
- Sistem şu anda mock API kullanıyor (USE_MOCK_API = false oldu)
- Environment variable ile endpoint yönetimi eklendi

## 🛠️ Endpoint Değiştirme Seçenekleri

### 1. Environment Variable ile (.env.local)
```bash
# .env.local dosyasını düzenleyin:
NEXT_PUBLIC_API_ENDPOINT=https://YOUR-NEW-API-ID.execute-api.REGION.amazonaws.com/STAGE
```

### 2. AWS API Gateway Yeni Endpoint
```bash
# AWS CLI ile yeni API Gateway oluşturma:
aws apigateway create-rest-api --name job-scraper-api-v2
aws lambda create-function --function-name job-scraper-v2 --runtime python3.9
```

### 3. Local Python API (For Testing)
```bash
# Run local API server:
cd /Users/oguzhansaritas/Downloads/job_scraper_full_system
pip install flask flask-cors requests beautifulsoup4
python local_api_server.py

# .env.local'da:
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5000/analyze
```

### 4. Vercel/Netlify Serverless Function
```bash
# Vercel ile deploy:
npm i -g vercel
vercel --prod

# API endpoint:
NEXT_PUBLIC_API_ENDPOINT=https://your-project.vercel.app/api/analyze
```

## 🧪 Test Etme
1. .env.local dosyasını düzenleyin
2. Development sunucusunu yeniden başlatın: `npm run dev`
3. Browser console'da "Kullanılan API endpoint:" logunu kontrol edin
4. Gerçek linklerle test edin

## ⚠️ Önemli Notlar
- Environment değişkenleri değiştirildiğinde sunucuyu yeniden başlatın
- CORS ayarlarının doğru olduğundan emin olun
- API endpoint'inin POST metodunu desteklediğini kontrol edin
- Request body formatının uyumlu olduğunu doğrulayın
