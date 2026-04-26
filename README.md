# ☁️ Weather Dashboard – MERN Stack with Email Alerts

A full‑stack weather application that provides real‑time weather data, 5‑day forecasts, interactive maps, voice search, and automatic email alerts for extreme weather conditions. Built with the **MERN stack** (MongoDB, Express, React, Node.js) and enhanced with **3D animations** (Three.js) and a **glass‑morphism UI**.

![Dashboard Preview](./screenshot.png)

---

## ✨ Features

- **User authentication** – JWT‑based signup/login, password hashing (bcrypt).
- **Current weather & 5‑day forecast** – powered by OpenWeatherMap API.
- **Saved locations** – users can save favourite cities and see their current weather instantly.
- **Interactive world map** – click any location to fetch weather, plus geolocation button.
- **Voice search** – speak city names (Web Speech API).
- **Email weather alerts** – automatic emails every 3 hours when thresholds (rain, extreme temps, high wind) are met – fully customisable.
- **Celsius / Fahrenheit toggle** – all temperatures convert on the fly.
- **Dark / Light theme** – user preference saved in browser.
- **Glass‑morphism UI** – modern, responsive design.

---

## 🛠️ Tech Stack

| Layer       | Technologies                                                                 |
|-------------|-------------------------------------------------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS, React Router, Axios, Recharts, Leaflet, Lucide Icons |
| Backend     | Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, Nodemailer, node‑cron    |
| APIs        | OpenWeatherMap (current, forecast, geocoding), OpenStreetMap (reverse geocode)|
| Testing     | Nodemailer test email, manual alerts                                          |

---
weather-dashboard/
├── backend/
│   ├── models/               # User, SavedLocation
│   ├── routes/               # auth, weather, locations, users
│   ├── controllers/          # business logic
│   ├── middleware/           # auth, errorHandler
│   ├── services/             # emailService, weatherAlertService
│   ├── utils/                # weatherAPI helper
│   ├── scheduler.js          # cron job for alerts
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/       # WeatherCard, MapView, HourlyForecast, etc.
    │   ├── pages/            # Home, Dashboard, Login, Register
    │   ├── context/          # AuthContext, WeatherContext
    │   ├── services/         # API client
    │   ├── assets/           # images, fonts
    │   └── App.jsx
    └── index.html
## 📦 Installation

### 1. Clone the repository

git clone https://github.com/Laibasheikh0215/Weather-Dashboard.git

cd Weather-Dashboard

## 🙏 Acknowledgements

OpenWeatherMap for weather data.

Leaflet for interactive maps.

Lucide for icons.

## 🗺️ API & External Services

OpenWeatherMap – free tier provides 60 calls/min. Get your API key at OpenWeatherMap.

OpenStreetMap (Nominatim) – used for reverse geocoding on the map.

Gmail SMTP – requires an App Password (2‑step verification ON). Generate at Google App Passwords.


## 📧 Email Alerts (How they work)

Backend scheduler (node‑cron) runs every 3 hours (customisable in scheduler.js).

For each saved location of every user, current weather is fetched.

If any threshold is exceeded (e.g., rain, extreme heat/cold, high wind), an email is sent only to that user.

Users can disable alerts from the dashboard (bell icon toggle).

https://./email-alert.png


Thresholds (adjustable in weatherAlertService.js)

temp: { min: -5, max: 40 },   // alert when below -5°C or above 40°C

wind: 15,                     // wind speed > 15 m/s

rain: 'Rain',

storm: 'Thunderstorm'

```bash

git clone https://github.com/Laibasheikh0215/Weather-Dashboard.git
cd Weather-Dashboard
