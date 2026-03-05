# אינדקס חנויות נתיבות 🏪

אתר אינדקס חנויות עם חיפוש ומפת גוגל.

## דרישות מקדימות

- Node.js 18+
- MongoDB (מקומי או Atlas)
- מפתח Google Maps JavaScript API

## התקנה והרצה

### 1. Backend

```bash
cd backend
npm install
```

צור קובץ `.env` בתיקיית backend:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shops-index
```

הרצת השרת:

```bash
npm run dev
```

הזנת נתוני דוגמה (פעם אחת):

```bash
npm run seed
```

### 2. Frontend

```bash
cd frontend
npm install
```

צור קובץ `.env.local` בתיקיית frontend:

```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

קבלת מפתח Google Maps:
1. היכנס ל-[Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. צור פרויקט (או השתמש בקיים)
3. הפעל את **Maps JavaScript API**
4. צור API Key
5. (מומלץ) הגבל את ה-Key לדומיינים שלך

הרצת ה-Frontend:

```bash
npm run dev
```

### 3. גישה לאתר

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API

| שיטה | נתיב | תיאור |
|------|------|--------|
| GET | /api/shops | כל החנויות (query, category) |
| GET | /api/shops/:id | חנות בודדת |
| POST | /api/shops | הוספת חנות |
| POST | /api/shops/seed | הזנת נתוני דוגמה |

## מבנה הפרויקט

```
shops-index/
├── backend/
│   ├── models/Shop.js      # סכימת חנות
│   ├── routes/shops.js     # REST API
│   ├── scripts/seed.js     # הזנת נתונים
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/     # SearchForm, ShopCard, MapView, Layout
│   │   └── pages/          # StoreList, StoreDetail
│   └── .env.local
└── README.md
```

## שדות חנות

| שדה | חובה | תיאור |
|-----|------|--------|
| name | ✓ | שם החנות |
| address | ✓ | כתובת |
| openingHours | | שעות פעילות |
| phone | | טלפון |
| category | | קטגוריה |
| lat | ✓ | קו רוחב |
| lng | ✓ | קו אורך |
