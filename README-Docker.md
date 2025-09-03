# Hướng dẫn chạy Bandoso System với Docker

## Cấu trúc dự án
- `bandoso-admin/`: Frontend React app
- `bandoso-api/`: Backend FastAPI
- `nginx.conf`: Nginx reverse proxy configuration
- `docker-compose.yml`: Docker Compose configuration với Qdrant

## Yêu cầu
- Docker
- Docker Compose

## Cách chạy

### 1. Cấu hình Environment Variables

#### Frontend (bandoso-admin)
Copy file `bandoso-admin/env.example` thành `bandoso-admin/.env` và cập nhật các giá trị:
```bash
cp bandoso-admin/env.example bandoso-admin/.env
```

#### Backend (bandoso-api)
Copy file `bandoso-api/env.example` thành `bandoso-api/.env` và cập nhật các giá trị:
```bash
cp bandoso-api/env.example bandoso-api/.env
```

### 2. Chạy toàn bộ hệ thống
```bash
docker-compose up -d
```

### 3. Xem logs
```bash
# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f bandoso-api
docker-compose logs -f bandoso-admin
docker-compose logs -f nginx
docker-compose logs -f qdrant
```

### 4. Dừng hệ thống
```bash
docker-compose down
```

## Truy cập ứng dụng
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **API Documentation**: http://localhost/api/docs
- **Health Check**: http://localhost/health
- **Qdrant Dashboard**: http://localhost:6333/dashboard

## Cấu trúc Docker

### Nginx Reverse Proxy
- Port: 80
- Chức năng: Reverse proxy, load balancing, SSL termination
- Routes:
  - `/` → Frontend (bandoso-admin)
  - `/api/*` → Backend (bandoso-api)

### Frontend (bandoso-admin)
- Multi-stage build với Node.js và Nginx
- Build stage: Compile React app
- Production stage: Serve static files với Nginx
- Environment: `bandoso-admin/.env`

### Backend (bandoso-api)
- Python 3.11 với FastAPI
- Port: 8000 (internal)
- Uvicorn server
- Kết nối với Qdrant qua network
- Environment: `bandoso-api/.env`

### Qdrant Vector Database
- Vector database cho AI/ML features
- Ports: 6333 (HTTP), 6334 (gRPC)
- Persistent storage với Docker volume
- Health check endpoint

## Environment Variables

### Frontend Variables (bandoso-admin/.env)
- `VITE_SUPABASE_HOST`: Supabase host URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_GOONG_MAP_*`: Goong Map API keys
- `VITE_STORAGE_*`: Storage configuration
- `VITE_BACKEND_API_URL`: Backend API URL (sẽ là http://localhost/api)

### Backend Variables (bandoso-api/.env)
- `QDRANT_HOST`: Qdrant host (qdrant)
- `QDRANT_PORT`: Qdrant port (6333)
- `SUPABASE_HOST`: Supabase host URL
- `SUPABASE_SERVICE_KEY`: Supabase service key
- `GOOGLE_AI_API_KEY`: Google AI API key
- `OPENAI_API_KEY`: OpenAI API key
- `JINA_AI_API_KEY`: Jina AI API key
- `JWT_SECRET`: JWT secret key
- `JWT_ALGORITHM`: JWT algorithm
- `DEFAULT_REQUEST_LIMIT`: Request limit
- `CHUNK_COLLECTION_NAME`: Qdrant collection name
- `CACHE_COLLECTION_NAME`: Cache collection name
- `LIMIT_REACH_MESSAGE`: Limit reached message
- `EMBEDDING_SIZE`: Embedding size
- `ALLOWED_ORIGINS`: Allowed CORS origins

## Services và Dependencies

```
nginx (port 80)
├── bandoso-admin (frontend)
├── bandoso-api (backend)
    └── qdrant (vector database)
```

## Troubleshooting

### Kiểm tra health của services
```bash
docker-compose ps
```

### Rebuild images
```bash
docker-compose build --no-cache
```

### Xóa volumes (cẩn thận - sẽ mất data)
```bash
docker-compose down -v
```

### Kiểm tra network
```bash
docker network ls
docker network inspect bandoso-system_bandoso-network
```

### Kiểm tra Qdrant
```bash
# Kiểm tra Qdrant health
curl http://localhost:6333/health

# Xem Qdrant logs
docker-compose logs qdrant
```

### Kiểm tra environment variables
```bash
# Kiểm tra env của frontend
docker-compose exec bandoso-admin env | grep VITE

# Kiểm tra env của backend
docker-compose exec bandoso-api env | grep -E "(QDRANT|SUPABASE|JWT|API)"
```

## Production Deployment

### 1. Cấu hình SSL
Thêm SSL certificate vào nginx.conf:
```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    # ... rest of config
}
```

### 2. Environment Variables
Đảm bảo tất cả environment variables được cấu hình đúng trong production.

### 3. Monitoring
Thêm monitoring tools như Prometheus, Grafana cho production deployment.

### 4. Backup
Cấu hình backup cho Qdrant data và Supabase data:
```bash
# Backup Qdrant data
docker run --rm -v bandoso-system_qdrant_storage:/data -v $(pwd):/backup alpine tar czf /backup/qdrant-backup.tar.gz -C /data .
``` 