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
