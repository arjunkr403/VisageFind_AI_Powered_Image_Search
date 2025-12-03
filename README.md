## 🗓️ Initial Setup — *24 Nov 2025*

### ✔️ Completed

- 📁 Created project root folder  
- 🔗 Initialized Git & connected GitHub repository  
- 🎨 Frontend Setup (React + Vite)
  - TailwindCSS
  - shadcn/ui components
  - Axios for API calls
  - Added Vite PWA support
- ⚙️ Backend Setup (FastAPI)
  - Installed ML dependencies:
    - PyTorch
    - Sentence Transformers
    - FAISS (vector search)
- 🐳 Containerization
  - Setup Docker + Docker Compose
  - Started **Postgres** + **Redis** containers
- 📂 Finalized complete folder structure


---

## 🗓️ Backend Architecture + DB/Redis Setup — *02 Dec 2025*

### ✔️ Completed

- Created `.env` file for environment variables
- Implemented configuration handler using **Pydantic** → `config.py`
- Setup PostgreSQL database connection
- Setup Redis caching connection
- Added `/health` API route (`routers/health.py`)
- Registered routers in `main.py`
- Verified backend infrastructure:
  - 🚀 FastAPI running successfully
  - 🗄️ DB connection: **OK**
  - ⚡ Redis cache: **OK**
- Backend skeleton ready for ML search features


### 📘 What I Learned

- Secure environment variables using `.env`
- Loading app settings via **Pydantic** models
- PostgreSQL connection flow with `psycopg2`
- Redis usage for high-speed caching
- FastAPI modular router architecture
- Role of health-check APIs in production

---

## 🗓️ Image Upload API + Database Setup — 03 Dec 2025

### ✔️ Completed

- Added uploads/ directory for storing user-uploaded images
- Implemented images table creation using raw SQL
- Integrated automatic DB table initialization in main.py
- Developed /upload API route:
  - Image type validation (PNG/JPG/JPEG)
  - UUID-based secure filename generation
  - Saved file to local filesystem
  - Inserted metadata (filename, path, timestamp) into PostgreSQL
- Added Redis caching for uploaded image metadata
- Registered upload router in main.py
- Tested upload functionality successfully using Postman


### 📘 What I Learned

- Handling file uploads using FastAPI’s UploadFile
- Secure filename creation using UUID
- Creating and inserting data into tables using psycopg2
- Using Redis to store metadata for faster access
- Building modular, scalable router structures in FastAPI
- Designing a file-storage workflow required for ML pipelines


---