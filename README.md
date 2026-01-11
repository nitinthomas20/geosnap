# Geo Location Guessing Game

A small web-based game inspired by GeoGuessr where players guess the latitude and longitude
of real-world locations based on images.

The goal is to test geographical intuition and attention to visual detail.

🚀 Live Demo: https://geosnap-001.web.app/

---

## 🎮 How It Works

1. The player starts a new game from the landing screen.
2. The game consists of 3 locations played sequentially.
3. For each location:
   - An image is shown.
   - The player enters latitude and longitude guesses.
   - The distance from the true location is calculated.
   - A map displays the guess, the correct location, and the distance.
4. Points are awarded based on accuracy.
5. After all locations, the player sees a summary with:
   - Total score
   - Distance for each location
6. Game results are stored in Firestore.

---

## 🧮 Scoring System

| Distance from location | Points |
|------------------------|--------|
| Exact match            | 15 points |
| > 50 m                 | 0 point |
| Between                | Linear interpolation |

The closer the guess, the higher the score.

---

## 🛠 Tech Stack

- Angular 21
- Firebase Hosting
- Firebase Firestore
- Leaflet
- TypeScript
- SCSS

---

## 📦 Data Storage

Each completed game stores:
- Timestamp
- Per-location guesses (lat, long, distance)
- Final score

Data is stored in Firebase Firestore.

---

## 🚀 Running Locally

```bash
npm install
ng serve
