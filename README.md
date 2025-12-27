## 🗓️ Initial Setup — 24 Nov 2025

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

## 🗓️ Backend Architecture + DB/Redis Setup — 02 Dec 2025

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


## 📅 Embedding Generation & FAISS Preparation — 09 Dec 2025

### ✔️ Completed

- Created ML module structure: clip_model.py, embeddings.py, faiss_index.py
- Loaded CLIP model (clip-ViT-B-32) for image embedding generation
- Implemented embedding generator function and integrated it with file storage
- Added embeddings table to PostgreSQL for storing vector representations
- Developed /embed/{image_id} API endpoint:
  - Validates image presence
  - Generates CLIP embeddings
  - Inserts embedding vectors into database
- Successfully tested embedding creation in Postman
- Prepared FAISS index creation function for Day 5 search features


### 📘 What I Learned

- How to use CLIP for generating semantic image embeddings
- Storing embeddings as lists of floats in PostgreSQL
- Structuring ML modules inside a production backend
- How FAISS indexes work (IndexFlatL2, dimension detection)
- Designing an end-to-end embedding pipeline for image search


---


## 📅 Search Pipeline (FAISS + Similarity Search API) — 09 Dec 2025

### ✔️ Completed

- Set up full FAISS search workflow
- Loaded all embeddings from PostgreSQL into memory
- Built FAISS index for similarity search
- Added real-time FAISS updates during image upload
- Implemented /search API endpoint
  - Accepts a query image
  - Generates CLIP embedding
  - Performs similarity search using FAISS
  - Returns most similar stored images
- Successfully tested search functionality in Postman
- Verified end-to-end search pipeline is working

### 📘 What I Learned

- How FAISS indexes accelerate similarity search
- How to organize ML search pipeline inside FastAPI
- Importance of global index loading during app startup
- How to generate embeddings for query images
- Mapping FAISS results back to database image records
- Building a complete semantic image search workflow


---


## 📅 C++ Image Preprocessing Optimization — 12 Dec 2025

### ✔️ Completed

- Set up a C++ preprocessing module using:
  - OpenCV for fast, optimized image operations
  - pybind11 for creating Python bindings
- Implemented high-performance preprocessing steps:
  - Image resizing to 224×224 (CLIP standard)
  - Denoising (fastNlMeansDenoisingColored)
  - Sharpening (Gaussian + weighted enhancement)
  - BGR → RGB conversion for CLIP compatibility
- Created cpp/preprocess.cpp implementing the preprocessing pipeline
- Compiled the module into a Python-importable .so file using CMake
- Successfully built the shared library using:
  - cmake ..
  - make -j4
- Integrated C++ preprocessing into Python backend:
  - Added module into app/ml/
  - Updated gen_img_embedding() to use fast preprocessing
  - Converted NumPy → PIL → CLIP embedding
- Fixed CLIP model usage (using model.encode() which works for both images and text in sentence-transformers)

### 📘 What I Learned

- How Python loads C++ modules compiled via pybind11
- How OpenCV C++ provides much faster preprocessing than Python
- Correct CLIP usage in sentence-transformers:
  - model.encode() supports images + text
  - encode_image() does NOT exist in this variant
- How preprocessing stabilizes CLIP embeddings and improves search quality
- How to structure a mixed C++ + Python production pipeline
- How to debug import paths for compiled .so modules


---

## 📅 Full-Stack Integration & Frontend Features — 27 Dec 2025

### ✔️ Completed

- Integrated React frontend with FastAPI backend for upload and search.
- Enhanced Dashboard page with live data, including a "Total Searches" counter.
- Implemented a full-stack Search History feature:
  - Backend: Added `search_history` table and a `/search/history` API endpoint to the search router.
  - Frontend: Built out the History page UI, fetching and displaying live search logs.
- Created a robust API service layer (`api.js`) with Axios to handle all backend communication.
- Refactored the search API for more efficient database connection handling.
- Performed end-to-end debugging to resolve a `500 Internal Server Error` caused by a database schema mismatch.

### 📘 What I Learned

- The complete lifecycle of a full-stack feature, from database to UI.
- Extending existing FastAPI routers with new endpoints to maintain a modular API.
- Managing complex state in React (loading status, tabs, API data).
- Building dynamic UIs that render live data instead of static mockups.
- How Axios handles `Content-Type` headers differently for `FormData` vs. JSON.
- End-to-end debugging, tracing an error from a frontend `AxiosError` to a backend database issue.

---
