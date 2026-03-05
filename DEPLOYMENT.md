# העלאת אינדקס חנויות נתיבות לאינטרנט

מדריך להעלאת האפליקציה לאינטרנט – בחינם.

## שלב 1: MongoDB Atlas (מסד נתונים בענן)

1. היכנס ל־https://www.mongodb.com/atlas
2. צור חשבון (חינם)
3. צור **Cluster** חדש (בחר M0 Free)
4. לחץ **Connect** → **Drivers** → העתק את ה-Connection String  
   (נראה כמו: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/`)
5. הוסף את שם מסד הנתונים: `shops-index`  
   לדוגמה: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/shops-index?retryWrites=true&w=majority`
6. ב-**Network Access** הוסף `0.0.0.0/0` (להרשאה מכל מקום)

---

## שלב 2: Render – Backend (API)

1. היכנס ל־https://render.com וצור חשבון
2. **New** → **Web Service**
3. חבר את ה-repository של GitHub (או דחוף את הקוד ל-GitHub)
4. **Root Directory:** `shops-index/backend`
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. **Environment Variables:**
   - `MONGODB_URI` = מחרוזת החיבור מ-Atlas
   - `PORT` = Render יגדיר אוטומטית
8. לחץ **Create Web Service**
9. אחרי ההעלאה – העתק את כתובת ה-URL (למשל: `https://shops-index-xxxx.onrender.com`)

---

## שלב 3: הזנת הנתונים ל-Atlas

לפני העלאת ה-frontend, הזן את 63 החניות למסד הנתונים:

```bash
cd "/Users/shlomocohen/Desktop/חניות נתיבות /shops-index/backend"
```

צור קובץ `.env` עם:

```
MONGODB_URI=mongodb+srv://....@cluster0.xxxxx.mongodb.net/shops-index?retryWrites=true&w=majority
PORT=5001
```

ואז הרץ:

```bash
node scripts/seed.js --force
```

---

## שלב 4: Vercel – Frontend

1. היכנס ל־https://vercel.com וצור חשבון
2. **Add New** → **Project** → חבר את ה-repository
3. **Root Directory:** `shops-index/frontend`
4. **Framework Preset:** Vite
5. **Environment Variables:**
   - `VITE_API_URL` = כתובת ה-backend ב-Render (למשל: `https://shops-index-xxxx.onrender.com`)
   - `VITE_GOOGLE_MAPS_API_KEY` = מפתח Google Maps (אם יש)
6. לחץ **Deploy**

---

## סיכום כתובות

| רכיב | כתובת |
|------|--------|
| MongoDB | Atlas (נסתר) |
| Backend API | https://xxx.onrender.com |
| Frontend | https://xxx.vercel.app |

---

## אלטרנטיבות

- **Railway** – אפשר להעלות Backend + Frontend יחד
- **Netlify** – חלופה ל-Vercel ל-Frontend

---

## הערה

ב-Render, השירות החינמי "נרדם" אחרי 15 דקות ללא פעילות. הגישה הראשונה אחרי זה יכולה לקחת 30–50 שניות.
