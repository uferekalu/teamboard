# 🧠 TeamBoard Backend

Backend for the **TeamBoard** platform built with **NestJS + MongoDB + TypeScript**.  
It provides RESTful APIs for authentication, projects, and tasks management.

---

## ⚙️ Tech Stack

- **NestJS 11**
- **MongoDB + Mongoose**
- **TypeScript**
- **JWT Authentication**
- **Class Validator + DTOs**
- **Swagger API Documentation**
- **Helmet** (security middleware)
- **Jest** (unit testing)

---

## 🧱 Folder Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module (JWT, login, signup)
│   ├── users/             # User entity & service
│   ├── projects/          # Project management logic
│   ├── tasks/             # Task management logic
│   ├── common/            # Shared utilities, guards, decorators
│   ├── main.ts            # Application entry point
│   └── app.module.ts      # Root application module
│
├── test/
├── .env
├── package.json
└── README.md
```

---

## 🧰 Environment Variables

Create `.env` file inside `backend/` with:

```
MONGODB_URI=mongodb+srv://<your-cluster-url>
JWT_SECRET=your-secret-key
PORT=3000
```

---

## 🧪 Run Locally

```bash
cd backend
npm install
npm run start:dev
```

Access API Docs at:  
👉 **https://teamboard-backend-ps7r.onrender.com/docs** (Swagger)

---

## 🧩 Features

✅ User authentication (JWT)  
✅ Project and task CRUD operations  
✅ DTO-based request validation  
✅ Modular NestJS architecture  
✅ Swagger API documentation  
✅ Unit and e2e testing with Jest  

---

## 🧠 Design Decisions

- **Modules** organize code into cohesive domains (Auth, User, Project, Task).  
- **DTOs + Validation Pipes** enforce strong typing and input validation.  
- **Swagger** provides an easy-to-navigate API reference.  
- **Helmet** and **bcrypt** enhance security.  
- Designed as a **monolith** with the potential to evolve into **microservices**.

---

## 📜 License
MIT License © 2025 Kalu Ufere
