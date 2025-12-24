# Mini School Management System

A full-stack mini school application for managing students, teachers, classes, and sections.


## 1. Clone Project

git clone https://github.com/your-username/mini-school-management.git  
cd mini-school-management


## 2. Environment Variables Setup

### Backend (.env)

Create a file `backend/.env` and add:

DB_HOST=localhost  
DB_USER=root  
DB_PASS=your_password  
DB_NAME=mini_school_db  
PORT=8000  
JWT_SECRET=my_super_secret_string_mini_school_app  

### Frontend (.env)

Create a file `frontend/.env` and add:

VITE_API_BASE_URL=http://localhost:8000/api


## 3. Backend & Database Setup

- This project uses **MySQL**
- You can use **XAMPP / phpMyAdmin** or any local MySQL server
- Create the database before starting backend

Install backend dependencies:

cd backend  
npm install  


## 4. Frontend Setup

Install frontend dependencies:

cd frontend  
npm install  


## 5. Start Project
### Start Backend
cd backend  
npm run dev  

### Start Frontend
cd frontend  
npm run dev  