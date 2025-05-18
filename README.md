You Tube Frontend
A React + Vite frontend for browsing videos with filtering, built using ContextApi, React Router, and Tailwind CSS.

Features
Fetches videos from a backend API
Displays dummy video with recommended side videos
Filters videos by search text and filter Buttons
Responsive UI with Tailwind CSS
Loading placeholders while fetching data
Context Api for managing  state
React Router for navigation
Technologies Used
React 
Vite 
Context Api
React Router 
Tailwind CSS 3
Axios
React Icons
Getting Started

Prerequisites
Node.js 
npm or yarn
Installation
git clone https://github.com/Anitakushare/YouTube-Clone-Project
cd YouTube-Clone-Project
npm install


Run Development Server

 npm run dev


Component Overview

Home.jsx: Fetches and filters videos based on search; displays tags and video cards.

VideoPlayerPage.jsx: Displays selected video with a sidebar of recommended videos.

videoPlayerPage.jsx: Renders video thumbnail, title, channel info,like dislikes, and views.

HomePage.jsx & : Video grid display with search and filter functionality.

ChannelPage.jsx:Display channel belogs to Specific User channel info and video with edit and delete 
functionality,also upload video .

Youtube BackEnd

A backend server built with Express.js, MongoDB, and JWT for authentication.

Features
RESTful API built with Express.js 
MongoDB integration using Mongoose
User authentication with JWT (jsonwebtoken)
Password hashing with bcrypt
Environment variables support via dotenv
CORS enabled for cross-origin requests
Auto-restart during development using nodemon
Getting Started
Prerequisites
Node.js (v16+ recommended)
npm (comes with Node.js)
MongoDB database (local or cloud)
Installation
Clone the repository:

git clone https://github.com/nitin-sharma-7/yt_server.git
cd yt_backend
Install dependencies: npm install

Create a .env file in the root directory and add your environment variables, eg

SECRET_KEY=YoutubeCloneDev123
MONGODB_URI=mongodb://localhost:27017/YouTubeDb
PORT=3000

Running the Server
npm run dev npm start

Dependencies
express

mongoose

jsonwebtoken

bcrypt

cors

dotenv

nodemon