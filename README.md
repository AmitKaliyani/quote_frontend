# 🚀 Installation & Setup

## Prerequisites

Before running the application, ensure the following are installed:

- Node.js (v18 or later)
- pnpm (v9 or later)
- Git

> **Note:** This application requires the Quotes Hub Backend API to be running.

---

## 1. Clone the Repository

```bash
https://github.com/AmitKaliyani/quote_frontend.git
```

---

## 2. Install Dependencies

```bash
pnpm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_BACKEND_BASE_URL=https://zero6-quote-backend.onrender.com/api
```

---

## 4. Start the Development Server

```bash
pnpm run dev
```

The application will be available at

```
http://localhost:5173
```

---

## Backend Requirement

This frontend communicates with the Quotes Hub Backend API.

Before running the frontend, make sure the backend server is running.

Backend Repository:

```
https://github.com/AmitKaliyani/06_quote_backend.git
```

---

## Related Repositories

| Repository | Description |
|------------|-------------|
| Quotes Hub Backend | REST API & Business Logic |
| Quotes Hub Admin | Admin Dashboard |
