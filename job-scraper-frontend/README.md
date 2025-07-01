# 🎯 Job Scraper Frontend

> **Modern Next.js application for intelligent job posting compatibility analysis with your resume**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Overview

Job Scraper Frontend is a sophisticated React-based web application that empowers job seekers by providing intelligent compatibility analysis between their resume and job postings. Using advanced text processing and machine learning algorithms, it helps users identify the best job opportunities that match their skills and experience.

## ✨ Key Features

### 📄 **Smart Resume Processing**
- **PDF Upload & Analysis**: Seamlessly upload and parse PDF resumes with automatic text extraction
- **Intelligent Keyword Generation**: AI-powered keyword extraction from resume content
- **Multi-format Support**: Robust PDF processing with fallback text extraction methods

### 🔍 **Advanced Job Analysis**
- **Bulk URL Processing**: Analyze multiple job postings simultaneously from various job boards
- **Compatibility Scoring**: Sophisticated algorithm calculating resume match, keyword match, and overall compatibility
- **Real-time Analysis**: Instant feedback with progress tracking and error handling

### 📊 **Comprehensive Insights**
- **Detailed Scoring System**: 
  - Resume Match Score (0-100%)
  - Keyword Match Score (0-100%)
  - Total Compatibility Score (weighted average)
- **Statistical Overview**: Total jobs analyzed, average scores, and top matches
- **Visual Progress Indicators**: Real-time processing status with loading animations

### 🎛️ **Powerful Filtering & Sorting**
- **Smart Filters**: Filter jobs by minimum compatibility score
- **Multiple Sort Options**: Sort by compatibility score or job title
- **Match-only View**: Toggle to show only jobs that meet your criteria
- **Responsive Results**: Instant filtering with smooth animations

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility First**: WCAG compliant with keyboard navigation support
- **Dark/Light Themes**: Automatic theme detection with manual override
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions

## 🛠️ Technology Stack

### **Frontend Core**
- **[Next.js 15.3.4](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### **UI & Styling**
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[Class Variance Authority](https://cva.style/)** - Component variant management

### **Document Processing**
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - Client-side PDF text extraction
- **Custom PDF Utilities** - Enhanced text processing and fallback mechanisms

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Turbopack](https://turbo.build/)** - Ultra-fast development server
- **PostCSS** - CSS transformation and optimization

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18.0+ 
npm 9.0+ or yarn 3.0+
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/job-scraper-frontend.git
cd job-scraper-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure environment variables**
```env
# .env.local
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Job Scraper
NEXT_PUBLIC_VERSION=0.1.0
```

### Development

```bash
# Start development server with Turbopack
npm run dev

# Or with yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📖 Usage Guide

### 1. **Resume Upload & Analysis**
```
1. Click "Upload PDF Resume" button
2. Select your PDF resume file
3. Wait for automatic text extraction
4. Click "Analyze Resume" to generate keywords
5. Review extracted keywords and edit if needed
```

### 2. **Job Analysis Workflow**
```
1. Paste job posting URLs (one per line) in the text area
2. Ensure your resume keywords are set
3. Click "Analyze Jobs" to start processing
4. Monitor real-time progress with visual indicators
5. Review results with detailed compatibility scores
```

### 3. **Advanced Filtering**
```
1. Use the score filter slider to set minimum compatibility
2. Toggle "Show only matched jobs" for focused results
3. Sort by compatibility score or alphabetically by title
4. Click on job cards to view detailed analysis
```

## 🏗️ Project Structure

```
job-scraper-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # Base UI components
│   │   ├── JobBotUI.tsx       # Main application component
│   │   ├── JobCard.tsx        # Job result display
│   │   ├── JobFilters.tsx     # Filtering controls
│   │   └── StatsOverview.tsx  # Statistics display
│   ├── hooks/                 # Custom React hooks
│   │   ├── useJobAnalysis.ts  # Job processing logic
│   │   └── useResumeProcessing.ts # Resume handling
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts           # General utilities
│   │   ├── pdfUtils.ts        # PDF processing
│   │   ├── jobUtils.ts        # Job analysis utilities
│   │   └── constants.ts       # Application constants
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
├── components.json            # Shadcn/ui configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_ENDPOINT` | Backend API URL | Yes | `http://localhost:5000` |
| `NEXT_PUBLIC_APP_NAME` | Application name | No | `Job Scraper` |
| `NEXT_PUBLIC_VERSION` | App version | No | `0.1.0` |

### API Integration

The frontend communicates with a Python Flask backend. Ensure your backend is running and accessible at the configured endpoint.

**Expected API Response Format:**
```json
{
  "results": [
    {
      "title": "Software Engineer",
      "company": "Tech Corp",
      "url": "https://example.com/job/123",
      "resume_match_score": 85,
      "keyword_match_score": 92,
      "total_score": 88,
      "matching_keywords": ["React", "TypeScript", "Node.js"],
      "missing_keywords": ["Docker", "AWS"]
    }
  ]
}
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Component testing (if configured)
npm run test
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow the configured rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Use semantic commit messages

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/job-scraper-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/job-scraper-frontend/discussions)
- **Documentation**: [Wiki](https://github.com/your-username/job-scraper-frontend/wiki)

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework

---

<div align="center">

**Built with ❤️ by developers, for developers**

[⭐ Star this repo](https://github.com/your-username/job-scraper-frontend) • [🐛 Report Bug](https://github.com/your-username/job-scraper-frontend/issues) • [💡 Request Feature](https://github.com/your-username/job-scraper-frontend/issues)

</div>
