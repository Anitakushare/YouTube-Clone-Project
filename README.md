# 🎥 YouTube Clone – MERN Stack Project

This project is a full-featured YouTube clone built using **React, Vite, Tailwind CSS, Express.js, MongoDB**, and **JWT Authentication**.

---

## 📌 Frontend – YouTube UI (React + Vite)

A modern, responsive frontend for browsing and managing videos using React, Tailwind, Context API, and React Router.

### ✨ Features

- Fetch videos from a backend API
- Display video player with recommended sidebar videos
- Filter videos using search and filter tags
- Responsive layout with Tailwind CSS
- Loading placeholders while fetching data
- Context API for global state (search, filter, sidebar, etc.)
- React Router for navigation
- Axios for API communication

### 🛠️ Technologies Used

- React
- Vite
- Context API
- React Router
- Tailwind CSS v3
- Axios
- React Icons

### 🚀 Getting Started

#### Prerequisites

- Node.js (v16+)
- npm or yarn

#### Installation

```bash
git clone https://github.com/Anitakushare/YouTube-Clone-Project
cd YouTube-Clone-Project
```
npm install


- Run Development Server

-  npm run dev


### Component Overview

- Home.jsx: Fetches and filters videos based on search; displays tags and video cards.

- VideoPlayerPage.jsx: Displays selected video with a sidebar of recommended videos.

- videoPlayerPage.jsx: Renders video thumbnail, title, channel info,like dislikes, and views.

- HomePage.jsx & : Video grid display with search and filter functionality.

- ChannelPage.jsx:Display channel belogs to Specific User channel info and video with edit and delete 
- functionality,also upload video .

## Youtube BackEnd

- A backend server built with Express.js, MongoDB, and JWT for authentication.

## Features
- RESTful API built with Express.js 
- MongoDB integration using Mongoose
- User authentication with JWT (jsonwebtoken)
- Password hashing with bcrypt
- Environment variables support via dotenv
- CORS enabled for cross-origin requests
- Auto-restart during development using nodemon
 - Getting Started
## Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MongoDB database (local or cloud)
- Installation
- Clone the repository:
- Create a .env file in the root directory and add your environment variables, eg
- 
```bash
SECRET_KEY=YoutubeCloneDev123
MONGODB_URI=mongodb://localhost:27017/YouTubeDb
PORT=3000
```


## Running the Server
- npm run dev npm start

## Dependencies
- express

- mongoose

- jsonwebtoken

- bcrypt

- cors

- dotenv

- nodemon
