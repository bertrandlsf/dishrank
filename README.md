# 🍽️ DishRank

> **Rate the dish, not the restaurant.**

DishRank is a web application that allows customers to rate dishes individually. If a dish does not exist yet, the customer can add it themselves with a photo, a rating and a comment.

---

## 📋 Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Routes](#api-routes)
- [Team](#team)

---

## ❓ The Problem

Yelp and Google rate the **restaurant** as a whole. But is the pad thai at THIS restaurant any good? Nobody knows. Over 55,000 people raised this problem on Reddit. No app had ever been built to solve it.

---

## 💡 The Solution

DishRank lets you rate **dishes** individually, not the restaurant. The database builds itself thanks to customers — zero manual entry needed.

**Main flow:**
1. The customer types a dish name in the search bar
2. If the dish exists → they click on it and give a rating + comment
3. If the dish does not exist → they add it with its name, the restaurant, a photo, a rating and a comment
4. The dish is immediately visible to everyone

---

## ✅ Features

| Feature | Status |
|---|---|
| Real-time dish search | ✅ MVP |
| Add a missing dish (name + restaurant + photo) | ✅ MVP |
| Give a rating (1 to 5 stars) | ✅ MVP |
| Mandatory comment to justify the rating | ✅ MVP |
| Dish detail page (photo, average rating, reviews) | ✅ MVP |
| Filter by dietary preference | 🔜 Bonus |
| Share a dish | 🔜 Bonus |

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Frontend | React + Vite | User interface |
| Styling | Tailwind CSS | Fast styling without writing CSS |
| Backend | Node.js + Express | REST API |
| Database | SQLite (better-sqlite3) | Data storage |
| Photo upload | Multer | Image file handling |
| Deployment | DigitalOcean | Online hosting |

---

## 📁 Project Structure

```
dishrank/
├── backend/                        ← Person A (Backend Dev)
│   ├── server.js                   Main Express server
│   ├── database.js                 SQLite + table creation
│   ├── routes/
│   │   ├── plats.js                GET + POST /api/plats
│   │   └── avis.js                 POST /api/avis
│   ├── uploads/                    Photos stored here
│   └── package.json
│
├── frontend/                       ← Person B (Frontend Dev)
│   ├── index.html
│   ├── vite.config.js              Vite config + API proxy
│   ├── package.json
│   └── src/
│       ├── pages/
│       │   ├── Accueil.jsx         Search page
│       │   ├── Plat.jsx            Dish detail page
│       │   └── AjouterPlat.jsx     Add dish form
│       ├── components/
│       │   ├── Recherche.jsx       Autocomplete search bar
│       │   ├── CarteEtoiles.jsx    Star rating selector
│       │   └── CarteCommentaire.jsx  Display a review
│       ├── App.jsx                 Page routing
│       └── main.jsx
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Prerequisites
- [Node.js](https://nodejs.org) v18 or newer
- Git

### Clone the project

```bash
git clone https://github.com/bertrandlsf/dishrank.git
cd dishrank
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## 🚀 Running the Project

You need **2 terminals open at the same time**.

### Terminal 1 — Backend

```bash
cd dishrank/backend
node server.js
```

The server starts at **http://localhost:3001**

### Terminal 2 — Frontend

```bash
cd dishrank/frontend
npm run dev
```

The app starts at **http://localhost:5173**

Open **http://localhost:5173** in your browser. 🎉

---

## 🔌 API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/plats?search=XXX` | Search dishes by name |
| `GET` | `/api/plats/:id` | Get dish details + reviews |
| `POST` | `/api/plats` | Add a new dish (form-data) |
| `POST` | `/api/avis` | Add a review to a dish |

### Example POST /api/plats

```
Content-Type: multipart/form-data

nom          : "Pad Thai with shrimp"
restaurantNom: "Thai Express Waterloo"
photo        : [image file]
```

### Example POST /api/avis

```json
{
  "platId": 1,
  "note": 4,
  "commentaire": "Really good, well-balanced sauce!"
}
```

---

## 👥 Team

Project built at **ConHacks 2026** — Conestoga College, Waterloo 🇨🇦

| Name | Role | Branch |
|---|---|---|
| Li Sui Fong, Teng Lioong Bertrand | Backend Developer | `backend` |
| Djabou Djietcheu Alain Jaures | Frontend Developer | `frontend` |

---

*DishRank — ConHacks 2026 — Because it's not the restaurant you eat — it's the dish.* 🍽️