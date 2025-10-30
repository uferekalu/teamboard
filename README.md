# 🧩 TeamBoard – Lightweight Work Management Platform

TeamBoard is a **monorepo full-stack project** designed to help teams manage projects and tasks collaboratively.  
It demonstrates authentication, project/task management, and clear separation of concerns between frontend and backend.

This repository is structured as a **monorepo** with two main subfolders:

```
teamboard/
│
├── backend/      # NestJS + MongoDB API server
├── frontend/     # React + Vite client application
└── README.md     # (this file)
```

---

## 🚀 Overview

**TeamBoard** enables users to:
- Sign up and log in securely (JWT authentication)
- Create, view, update, and delete projects
- Manage tasks within projects
- Collaborate efficiently in a lightweight internal platform

---

## 🏗️ Architecture

| Layer | Stack |
|-------|-------|
| **Frontend** | React, Vite, TypeScript, TailwindCSS, React Query |
| **Backend** | NestJS, MongoDB, TypeScript, Mongoose, JWT |
| **Database** | MongoDB |
| **Styling & Animation** | TailwindCSS, Framer Motion |
| **State Management** | React Query + Context API |
| **Validation** | Zod, Class Validator |

The system is designed as a **modular monolith** that can later evolve into **microservices**.  
Each service (e.g., users, projects, tasks) is encapsulated into its own NestJS module.

---

## 🧠 Design Decisions

- **React Query** handles server-state management, caching, and revalidation.
- **Zod** is used for schema validation in forms.
- **NestJS modules** cleanly separate user, project, and task logic.
- **JWT authentication** ensures secure communication between client and server.
- **Mongoose models** structure the database layer with clear entity relationships.

---

## ⚙️ Setup & Run

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/uferekalu/teamboard.git
cd teamboard
```

### 2️⃣ Install Dependencies
```bash
# install both frontend and backend dependencies
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Configure Environment Variables

Create `.env` files in both `/backend` and `/frontend` directories.

#### Example `.env` for backend
```
MONGODB_URI=mongodb+srv://<your-db-url>
JWT_SECRET=your-secret-key
PORT=3000
```

#### Example `.env` for frontend
```
VITE_API_URL=http://localhost:3000/api
```

### 4️⃣ Run Development Servers
In two separate terminals:

**Backend:**
```bash
cd backend
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Access the app at **http://localhost:5173**.

---

## 🧩 Folder Structure (Monorepo)
```
teamboard/
│
├── backend/
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## 💡 Future Improvements
- Role-based permissions (Admin, Member)
- Real-time updates via WebSockets
- Enhanced analytics dashboard
- Cloud deployment (Render/Railway + Vercel)

---

## 📜 License
This project is licensed under the **MIT License**.

---

**Developed by Kalu Ufere 🛠️**
