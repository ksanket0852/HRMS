# HR Management System (HRMS)

A comprehensive, AI-powered Human Resources Management System built with Node.js, React, and TypeScript. This system provides modern HR operations with real-time AI interviews, resume screening, and intelligent analytics.

## 🚀 Features

### Core HR Management
- **Employee Management**: Complete CRUD operations with role-based access
- **Attendance Tracking**: Real-time attendance monitoring and reporting
- **Payroll Processing**: Automated salary calculations and payment tracking
- **Performance Reviews**: 360-degree feedback and goal tracking
- **Leave Management**: Request, approval, and tracking system

### AI-Powered Features
- **Real-time Voice Interviews**: WebSocket-based audio processing with OpenAI Whisper
- **AI Resume Screening**: Automated candidate evaluation using machine learning
- **Sentiment Analysis**: Real-time candidate performance analysis
- **Conversational AI**: Gemini-powered chat interface for recruiters
- **Follow-up Question Generation**: Dynamic interview question suggestions

### Modern UI/UX
- **Responsive Design**: Mobile-first approach with Material-UI components
- **Role-based Dashboards**: Customized views for different user roles
- **Real-time Analytics**: Interactive charts and KPI tracking
- **Dark/Light Theme**: Modern theming with smooth transitions
- **Accessibility**: WCAG compliant interface design

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** with Prisma ORM
- **Socket.io** for real-time communication
- **JWT** for authentication
- **OpenAI API** for AI features
- **Google Gemini API** for conversational AI
- **Winston** for logging
- **Helmet** for security

### Frontend
- **React 19** with TypeScript
- **Material-UI** for components
- **Zustand** for state management
- **React Router** for navigation
- **Recharts** for data visualization
- **Framer Motion** for animations
- **Socket.io Client** for real-time features

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn package manager

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HR-managment
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb hrms_db

# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### 4. Environment Configuration
```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
DATABASE_URL="postgresql://username:password@localhost:5432/hrms_db"
JWT_SECRET_KEY="your-super-secret-jwt-key"
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_GEMINI_API_KEY="your-google-gemini-api-key"
```

### 5. Frontend Setup
```bash
cd ../frontend
npm install
```

### 6. Frontend Environment
```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=http://localhost:5000
```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start Backend Server**
```bash
cd backend
npm run dev
```

2. **Start Frontend Development Server**
```bash
cd frontend
npm start
```

3. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/health

### Production Mode

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Start Production Server**
```bash
cd backend
npm start
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Employee Management
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Job Management
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job posting
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### AI Features
- `POST /api/ai/screen-resume` - AI resume screening
- `POST /api/ai/generate-questions` - Generate interview questions
- `POST /api/ai/analyze-interview` - Analyze interview responses
- `POST /api/ai/chat` - Conversational AI chat

### WebSocket Events
- `audio-chunk` - Send audio data for processing
- `interview-feedback` - Receive AI analysis results

## 🔐 Security Features

- **JWT Authentication** with role-based access control
- **Rate Limiting** to prevent abuse
- **Input Validation** and sanitization
- **CORS Protection** with configurable origins
- **Security Headers** (Helmet.js)
- **Request Size Limiting**
- **SQL Injection Protection** (Prisma ORM)
- **XSS Protection**

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## 📈 Performance Optimization

- **Database Indexing** for faster queries
- **Caching** with Redis (optional)
- **Image Optimization** for file uploads
- **Code Splitting** in React
- **Lazy Loading** for components
- **Bundle Optimization**

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment
1. Build frontend: `npm run build`
2. Set production environment variables
3. Start backend server: `npm start`
4. Serve frontend build files

### Cloud Deployment
- **AWS**: Use ECS with RDS for PostgreSQL
- **Google Cloud**: Use Cloud Run with Cloud SQL
- **Azure**: Use App Service with Azure Database

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/hrms_db"
JWT_SECRET_KEY="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_GEMINI_API_KEY="your-google-gemini-api-key"
CORS_ORIGIN="http://localhost:3000"
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=http://localhost:5000
REACT_APP_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: [your-email@example.com]
- Documentation: [link-to-docs]

## 🔄 Changelog

### Version 1.0.0
- Initial release with core HR features
- AI-powered interview system
- Real-time analytics dashboard
- Role-based access control
- Mobile-responsive design

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced reporting and analytics
- [ ] Integration with external HR systems
- [ ] Multi-language support
- [ ] Advanced AI features
- [ ] Video interview capabilities
- [ ] Blockchain-based verification
- [ ] Advanced security features

---

**Built with ❤️ for modern HR operations**
