# 🖥️ TeamBoard Frontend

Frontend for the **TeamBoard** platform built with **React + TypeScript + Vite + TailwindCSS**.  
It connects seamlessly with the NestJS backend to deliver a smooth project and task management experience.

---

## ⚙️ Tech Stack
- **React 19**
- **Vite 7**
- **TypeScript**
- **TailwindCSS 4**
- **Framer Motion**
- **React Router DOM**
- **React Query**
- **React Hook Form + Zod**
- **Lucide React** (icons)
- **Axios**
- **React Hot Toast** (notifications)

---

## 🧱 Folder Structure

```
frontend/
├── src/
│   ├── api/               # Axios setup & API helpers
│   ├── components/        # Reusable UI components
│   ├── context/           # Global contexts (AuthContext, etc.)
│   ├── layouts/           # Layouts for Auth and Dashboard
│   ├── pages/             # Page components (Login, Dashboard, etc.)
│   ├── types/             # Shared TypeScript types/interfaces
│   └── main.tsx           # App entry point
│
├── public/
├── index.html
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🧩 Features
✅ User authentication (signup, login)  
✅ Protected routes using React Router  
✅ Project & Task CRUD functionality  
✅ Form validation with React Hook Form + Zod  
✅ API integration with Axios  
✅ Toast notifications for UX feedback  
✅ Responsive & animated UI with TailwindCSS + Framer Motion  

---

## 🧠 Design Decisions
- **React Query** handles API caching and refetching.
- **React Hook Form + Zod** ensures robust form validation.
- **Framer Motion** improves UX through subtle animations.
- **Context API** manages global auth state efficiently.

---

## 🧰 Setup Instructions

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:
```
VITE_API_URL=http://localhost:3000/api
```

Run development server:
```bash
npm run dev
```

Visit **http://localhost:5173**.

---

## 🧾 Build for Production

```bash
npm run build
npm run preview
```

---

## 📸 Screenshots of different UIs
![alt text](/frontend/public/image.png)
![alt text](/frontend/public/image-1.png)
![alt text](/frontend/public/image-2.png)
![alt text](/frontend/public/image-3.png)
![alt text](/frontend/public/image-4.png)
![alt text](/frontend/public/image-5.png)
![alt text](/frontend/public/image-6.png)

---

## 📜 License
MIT License © 2025 Kalu Ufere
