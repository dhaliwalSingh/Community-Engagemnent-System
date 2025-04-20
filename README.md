# 🤝 Community Engagement Platform

A modern, full-stack web app to connect users through community posts, help requests, and an intelligent AI-powered assistant. Built with a microfrontend architecture using React 19, Apollo Client, GraphQL, and styled with TailwindCSS.

---

## 🌟 Features

### 🔐 Authentication
- User login/signup (JWT-based)
- Role-based access (Admin, Volunteer, General User)

### 📰 Community Posts
- Create, edit, delete posts (Admins & Authors)
- View post feed with real-time updates
- Filter posts by category

### 🆘 Help Requests
- Submit and manage help requests
- Mark requests as resolved
- Assign volunteers and track status

### 🤖 AI Assistant
- **Gemini-powered contextual assistant**
- Retrieves similar posts and requests
- Generates helpful responses and follow-up suggestions for users

---

## 🧱 Tech Stack

| Layer        | Tech |
|--------------|------|
| Frontend     | React 19, Vite, TailwindCSS, React Bootstrap |
| Microfrontend | Module Federation via `@originjs/vite-plugin-federation` |
| Backend      | Node.js, Express, Apollo GraphQL Server |
| Database     | MongoDB (Mongoose) |
| AI Assistant | Gemini API |
| Auth         | JWT-based role authentication |
| Dev Tools    | React Hooks, Apollo Client, GraphQL Playground |

---

## 🚀 Getting Started

### 1. Clone the Repo


git clone https://github.com/<your-org>/community-engagement-app.git
cd community-engagement-app

# Set Environment Variables
- PORT=4000
- MONGODB_URI=<your_mongodb_uri>
- JWT_SECRET=<your_jwt_secret>
- GEMINI_API_KEY=<your_gemini_api_key>


# Backend
cd backend
npm install

# Frontends
cd ../auth-frontend && npm install
cd ../community-frontend && npm install
cd ../shell && npm install

