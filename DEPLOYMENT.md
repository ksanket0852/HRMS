# HR Management System - Deployment Guide

This guide covers various deployment options for the HR Management System.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git installed

### 1. Clone and Setup
```bash
git clone <repository-url>
cd HR-managment
```

### 2. Environment Configuration
```bash
# Backend environment
cp backend/env.example backend/.env
# Edit backend/.env with your configuration

# Frontend environment
cp frontend/env.example frontend/.env
# Edit frontend/.env with your configuration
```

### 3. Deploy with Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432

## ☁️ Cloud Deployment

### AWS Deployment

#### Using ECS with Fargate

1. **Create ECR Repositories**
```bash
# Create repositories
aws ecr create-repository --repository-name hrms-backend
aws ecr create-repository --repository-name hrms-frontend

# Build and push images
docker build -t hrms-backend ./backend
docker build -t hrms-frontend ./frontend

# Tag and push
docker tag hrms-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/hrms-backend:latest
docker tag hrms-frontend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/hrms-frontend:latest

docker push <account-id>.dkr.ecr.<region>.amazonaws.com/hrms-backend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/hrms-frontend:latest
```

2. **Create RDS PostgreSQL Database**
```bash
aws rds create-db-instance \
  --db-instance-identifier hrms-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username hrms_user \
  --master-user-password your-secure-password \
  --allocated-storage 20
```

3. **Deploy with ECS**
- Create ECS cluster
- Create task definitions for backend and frontend
- Create services
- Configure load balancer

#### Using Elastic Beanstalk

1. **Backend Deployment**
```bash
cd backend
eb init
eb create production
eb deploy
```

2. **Frontend Deployment**
```bash
cd frontend
npm run build
# Upload build files to S3
# Configure CloudFront distribution
```

### Google Cloud Platform

#### Using Cloud Run

1. **Build and Deploy Backend**
```bash
# Build container
gcloud builds submit --tag gcr.io/PROJECT-ID/hrms-backend ./backend

# Deploy to Cloud Run
gcloud run deploy hrms-backend \
  --image gcr.io/PROJECT-ID/hrms-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

2. **Deploy Frontend**
```bash
# Build container
gcloud builds submit --tag gcr.io/PROJECT-ID/hrms-frontend ./frontend

# Deploy to Cloud Run
gcloud run deploy hrms-frontend \
  --image gcr.io/PROJECT-ID/hrms-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

3. **Setup Cloud SQL**
```bash
# Create Cloud SQL instance
gcloud sql instances create hrms-db \
  --database-version=POSTGRES_13 \
  --tier=db-f1-micro \
  --region=us-central1
```

### Azure Deployment

#### Using Azure Container Instances

1. **Create Resource Group**
```bash
az group create --name hrms-rg --location eastus
```

2. **Deploy Backend**
```bash
az container create \
  --resource-group hrms-rg \
  --name hrms-backend \
  --image your-registry/hrms-backend:latest \
  --dns-name-label hrms-backend \
  --ports 5000
```

3. **Deploy Frontend**
```bash
az container create \
  --resource-group hrms-rg \
  --name hrms-frontend \
  --image your-registry/hrms-frontend:latest \
  --dns-name-label hrms-frontend \
  --ports 80
```

## 🔧 Manual Deployment

### Backend Deployment

1. **Server Setup**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb hrms_db
```

2. **Application Setup**
```bash
cd backend
npm install --production
npm run migrate
npm start
```

3. **Process Management with PM2**
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/server.js --name hrms-backend

# Save PM2 configuration
pm2 save
pm2 startup
```

### Frontend Deployment

1. **Build Application**
```bash
cd frontend
npm install
npm run build
```

2. **Serve with Nginx**
```bash
# Install Nginx
sudo apt-get install nginx

# Copy build files
sudo cp -r build/* /var/www/html/

# Configure Nginx
sudo nano /etc/nginx/sites-available/hrms
```

3. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔐 SSL/HTTPS Setup

### Using Let's Encrypt

1. **Install Certbot**
```bash
sudo apt-get install certbot python3-certbot-nginx
```

2. **Obtain Certificate**
```bash
sudo certbot --nginx -d your-domain.com
```

3. **Auto-renewal**
```bash
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoring and Logging

### Application Monitoring

1. **Health Checks**
```bash
# Backend health check
curl http://localhost:5000/health

# Frontend health check
curl http://localhost:3000
```

2. **Log Monitoring**
```bash
# View application logs
tail -f backend/logs/combined.log
tail -f backend/logs/error.log
```

3. **Database Monitoring**
```bash
# Check database status
sudo systemctl status postgresql

# Monitor database performance
sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"
```

### Performance Optimization

1. **Enable Gzip Compression**
```nginx
# In nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

2. **Database Optimization**
```sql
-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_attendance_date ON attendance(date);
```

3. **Caching with Redis**
```bash
# Install Redis
sudo apt-get install redis-server

# Configure Redis
sudo nano /etc/redis/redis.conf
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy HRMS

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Your deployment commands here
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Issues**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection
psql -h localhost -U hrms_user -d hrms_db
```

2. **Port Conflicts**
```bash
# Check port usage
sudo netstat -tulpn | grep :5000
sudo netstat -tulpn | grep :3000
```

3. **Permission Issues**
```bash
# Fix file permissions
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

### Log Analysis

1. **Application Logs**
```bash
# View recent errors
grep "ERROR" backend/logs/error.log | tail -20

# Monitor real-time logs
tail -f backend/logs/combined.log
```

2. **System Logs**
```bash
# View system logs
sudo journalctl -u nginx
sudo journalctl -u postgresql
```

## 📈 Scaling

### Horizontal Scaling

1. **Load Balancer Setup**
```nginx
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

server {
    location /api {
        proxy_pass http://backend;
    }
}
```

2. **Database Scaling**
- Read replicas for read operations
- Connection pooling
- Database sharding for large datasets

### Vertical Scaling

1. **Resource Monitoring**
```bash
# Monitor CPU and memory
htop
free -h
df -h
```

2. **Optimization**
- Increase server resources
- Optimize database queries
- Implement caching strategies

## 🔒 Security Checklist

- [ ] SSL/HTTPS enabled
- [ ] Firewall configured
- [ ] Database access restricted
- [ ] Environment variables secured
- [ ] Regular security updates
- [ ] Backup strategy implemented
- [ ] Monitoring and alerting setup
- [ ] Access logs reviewed regularly

## 📞 Support

For deployment issues:
1. Check the logs first
2. Review this documentation
3. Create an issue in the repository
4. Contact the development team

---

**Happy Deploying! 🚀**
