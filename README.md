# TeamUp 🚀
A modern, responsive Project and Task Management Web Application built with the MERN stack (MongoDB, Express, React, Node.js) and Material-UI (MUI). It helps users organize, prioritize, and monitor their projects and tasks using dynamic, interactive charts.

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Directory Structure](#-directory-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Local Setup](#-installation--local-setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Configuration](#%EF%B8%8F-configuration)
  - [Backend Environment Variables (`.env`)](#backend-environment-variables-env)
  - [Frontend Environment Config (`envirment.js`)](#frontend-environment-config-envirmentjs)
- [Running the Application](#-running-the-application)
- [Application Flow & Routes](#-application-flow--routes)
  - [Frontend Routes (React Router DOM)](#frontend-routes-react-router-dom)
  - [Backend API Endpoints](#backend-api-endpoints)

---

## ✨ Features

- **🔐 User Authentication:** Secure register and login system using JSON Web Tokens (JWT) and passwords hashed with bcrypt.
- **📊 Global & Project-Specific Dashboards:** Interactive visualization of project completion rates and task priority distributions using Chart.js.
- **📁 Project Management:** Complete CRUD functionality for projects (create, view list, update, and delete). Deleting a project automatically cascades to delete all associated project tasks.
- **📝 Dual-Mode Task Tracking:**
  - **Personal Tasks:** Private tasks scoped to the user, completely independent of any project.
  - **Project Tasks:** Tasks assigned to specific projects, tracking project milestones.
- **⚡ Task Status & Priorities:** Toggle between `completed` and `incomplete` states, and set priorities (`high`, `medium`, `low`).
- **🎨 Premium UI/UX:** Built with Material-UI (MUI), featuring responsive navigation layouts, customized themes, SweetAlert2 alerts, and Notistack toast notifications.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (v18)
- **Build Tool:** Vite (configured with port `3000`)
- **Styling & Components:** Material-UI (MUI v5), Emotion CSS
- **Routing:** React Router DOM (v6, using `createBrowserRouter`)
- **Charts:** Chart.js & React-Chartjs-2
- **Utilities:** Axios (API communication), Moment, Day.js, Date-fns, Notistack, SweetAlert2

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Security:** JSON Web Tokens (JWT), bcryptjs for password hashing, and CORS middleware
- **Dev Tools:** Nodemon for server hot-reloading

---

## 📂 Directory Structure

```text
TeamUp/
├── backend/
│   ├── controller/      # API logic (user, project, task, and projectTask controllers)
│   ├── db/              # Database connection helper
│   ├── middleWare/      # Route guards (e.g., authMiddleWare for JWT verify)
│   ├── model/           # Mongoose Schemas (User, Project, Task, ProjectTask)
│   ├── routes/          # Express route definitions
│   ├── index.js         # Backend server entry point
│   └── package.json     # Backend configuration & dependencies
│
└── frontEnd/
    ├── public/          # Static assets
    ├── src/
    │   ├── components/  # Shared components (navigation, charts, helpers)
    │   ├── layout/      # DefaultLayout (authenticated) and GuestLayout (non-auth)
    │   ├── pages/       # Page components (Dashboard, Tasks, MyTask, Projects, etc.)
    │   ├── router/      # Route definition config (router.jsx)
    │   ├── services/    # Axios base setup and services
    │   ├── theme.js     # Custom Material-UI theme configurations
    │   ├── utility/     # Auth token helper functions
    │   ├── main.jsx     # Vite entry file
    │   └── App.jsx      # Root component
    ├── envirment.js     # API Base URL config
    ├── vite.config.js   # Vite configuration
    └── package.json     # Frontend configuration & dependencies
```

---

## ⚙️ Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) (usually bundles with Node.js)
- A running [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Cluster or a locally installed MongoDB server

---

## 🚀 Installation & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Fazal-dev/TeamUp.git
cd TeamUp
```

### 2. Backend Setup
1. Change directory to `/backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `/backend` folder (see the [Configuration](#backend-environment-variables-env) section).

### 3. Frontend Setup
1. Open a new terminal tab/window and navigate to the `/frontEnd` folder:
   ```bash
   cd frontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## ⚙️ Configuration

### Backend Environment Variables (`.env`)
Create a file named `.env` in the `/backend` directory:
```env
PORT=8000
DB_URL=mongodb+srv://<username>:<password>@yourcluster.mongodb.net/teamup?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
```
> 💡 *Note: Replace database URL and secret key with your actual credentials.*

### Frontend Environment Config (`envirment.js`)
Ensure `frontEnd/envirment.js` points to the correct backend host:
* **For Local Development:**
  ```javascript
  const environment = {
    baseUrl: "http://localhost:8000",
  };
  export default environment;
  ```
* **For Production Deployment:**
  ```javascript
  const environment = {
    baseUrl: "https://your-backend-api.vercel.app",
  };
  export default environment;
  ```

---

## 💻 Running the Application

### Start the Backend
From the `/backend` directory:
```bash
npm start
```
*The backend server will run on [http://localhost:8000](http://localhost:8000) using nodemon.*

### Start the Frontend
From the `/frontEnd` directory:
```bash
npm run dev
```
*The frontend development server will spin up on [http://localhost:3000](http://localhost:3000).*

---

## 🔗 Application Flow & Routes

### Frontend Routes (React Router DOM)

| Path | Layout | Component | Description |
| :--- | :--- | :--- | :--- |
| `/login` | `GuestLayout` | `<Login />` | Login page |
| `/signup` | `GuestLayout` | `<SignUp />` | Sign up page |
| `/dashbord` | `DefaultLayout` | `<Dashbord />` | Main dashboard displaying project statistics & overview |
| `/projects` | `DefaultLayout` | `<Projects />` | Project creation & listing |
| `/ProjectDashboard/:projectId` | `DefaultLayout` | `<ProjectDashboard />` | Visual statistics & metrics specific to a single project |
| `/projectTask/:id` | `DefaultLayout` | `<Tasks />` | Tasks list inside a specific project |
| `/editProject/:id` | `DefaultLayout` | `<EditProject />` | Form to edit details of a project |
| `/editProjectTask/:id/:projectId` | `DefaultLayout` | `<EditProjectTask />` | Form to edit details of a project-specific task |
| `/Mytasks` | `DefaultLayout` | `<MyTask />` | Personal tasks list (independent of projects) |
| `/addTask` | `DefaultLayout` | `<AddTask />` | Form to create a new personal task |
| `/editTask/:id` | `DefaultLayout` | `<EditTask />` | Form to edit a personal task |

---

### Backend API Endpoints

All routes listed below except the user authentication routes (`/api/user/` and `/api/user/login`) require a valid `Authorization: Bearer <token>` header.

#### 👤 User Authentication (`/api/user`)
* `POST /api/user/` - Register a new user profile.
* `POST /api/user/login` - Authenticate user & retrieve JWT token.
* `GET /api/user/me` - Retrieve current logged-in user profile details (protected).
* `GET /api/user/:id` - Fetch user details by ID.

#### 📁 Project Operations (`/api/project`)
* `GET /api/project` - Get all projects created by the logged-in user.
* `POST /api/project` - Create a new project.
* `GET /api/project/:id` - Get details of a specific project.
* `PATCH /api/project/:id` - Update project details.
* `DELETE /api/project/:id` - Delete a project and all associated project tasks.

#### 📝 Personal Tasks (`/api/task`)
* `GET /api/task` - Fetch all personal tasks for the current user.
* `POST /api/task` - Create a new personal task.
* `GET /api/task/:id` - Get details of a single personal task.
* `PATCH /api/task/:id` - Update a personal task.
* `DELETE /api/task/:id` - Delete a personal task.

#### 🗃️ Project-Specific Tasks (`/api/projectTask`)
* `GET /api/projectTask/:id` - Get all tasks assigned to project ID `:id`.
* `POST /api/projectTask` - Add a new task to a project.
* `GET /api/projectTask/task/:taskId` - Retrieve details of a single project task by its ID.
* `PATCH /api/projectTask/:id` - Edit a project task by its ID.
* `DELETE /api/projectTask/:id` - Delete a project task by its ID.

---

## 📄 License
This project is licensed under the ISC License.
