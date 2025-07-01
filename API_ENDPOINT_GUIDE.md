# AWS API Endpoint Configuration Guide

## 🔄 Current Status
- System currently uses the configured API endpoint
- Environment variable management for endpoint configuration added

## 🛠️ Endpoint Configuration Options

### 1. Environment Variable (.env.local)
```bash
# Edit .env.local file:
NEXT_PUBLIC_API_ENDPOINT=https://YOUR-NEW-API-ID.execute-api.REGION.amazonaws.com/STAGE
```

### 2. AWS API Gateway New Endpoint
```bash
# Create new API Gateway with AWS CLI:
aws apigateway create-rest-api --name job-scraper-api-v2
aws lambda create-function --function-name job-scraper-v2 --runtime python3.9
```

### 3. Local Python API (For Testing)
```bash
# Run local API server:
cd backend
pip install -r requirements.txt
python src/main.py

# In .env.local:
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5001/analyze
```

### 4. Vercel/Netlify Serverless Function
```bash
# Deploy with Vercel:
npm i -g vercel
vercel --prod

# API endpoint:
NEXT_PUBLIC_API_ENDPOINT=https://your-project.vercel.app/api/analyze
```

## 🧪 Testing
1. Edit the .env.local file
2. Restart development server: `npm run dev`
3. Check "Using API endpoint:" log in browser console
4. Test with real job posting links

## ⚠️ Important Notes
- Restart the server when environment variables are changed
- CORS ayarlarının doğru olduğundan emin olun
- API endpoint'inin POST metodunu desteklediğini kontrol edin
- Request body formatının uyumlu olduğunu doğrulayın
