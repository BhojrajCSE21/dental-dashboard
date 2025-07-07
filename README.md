# 🦷 ENTNT Dental Center Management Dashboard

A responsive, role-based dental clinic management system built with **React**. This project allows dentists (Admins) to manage patients, appointments, treatments, and file uploads — all using localStorage (no backend). Patients can view their data and history.

---

## 🚀 Live Demo & Repository

- 🔗 **Live App:** [https://your-vercel-link](https://your-vercel-link)
- 💻 **GitHub Repo:** [https://github.com/BhojrajCSE21/dental-dashboard.git](https://github.com/BhojrajCSE21/dental-dashboard.git)

---

## 🧾 Table of Contents

- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Authentication & Roles](#-authentication--roles)
- [Mock Data Format](#-mock-data-format)
- [Setup & Installation](#-setup--installation)


---

## 📸 Screenshots

### 📊 Admin Dashboard

![Dashboard Screenshot](https://github.com/BhojrajCSE21/dental-dashboard/raw/master/Screenshot%202025-07-07%20223034.png)


---

## ✨ Features

### 👨‍⚕️ Admin Features
- Dashboard with KPIs: total patients, appointments, completed treatments, revenue.
- Patient management: view, add, edit, and delete patients.
- Appointment management: create, update, and delete appointments (incidents).
- File uploads: upload and preview invoices/x-rays (stored as base64/blob URLs).
- Calendar view: monthly and weekly views of appointments.
- View recent appointments in a table with a “View All” link to the appointment list.

### 👤 Patient Features
- View profile
- See upcoming appointments and treatment history
- View uploaded medical records

---

## 🔐 Authentication & Roles

Authentication is simulated using hardcoded users and stored in `localStorage`.

### ✉️ Sample Users

```json
{
  "users": [
    {
      "id": "1",
      "role": "Admin",
      "email": "admin@entnt.in",
      "password": "admin123"
    },
    {
      "id": "2",
      "role": "Patient",
      "email": "john@entnt.in",
      "password": "patient123",
      "patientId": "p1"
    }
  ]
}
```

## 📁 Project Structure

src/
├── components/       
├── context/         
├── pages/           
├── utils/           
├── App.jsx
└── main.jsx


## 🖥️ Setup & Installation

```bash
git clone https://github.com/BhojrajCSE21/dental-dashboard.git.git
cd dental-dashboard
npm install
npm run dev   
```

