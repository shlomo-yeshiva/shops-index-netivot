# תיקון סופי – אינדקס חנויות נתיבות

## מה תוקן

1. **Auto-seed** – השרת מזין אוטומטית 63 חנויות כשהמסד ריק
2. **Base path** – ה-Frontend מוגדר ל-GitHub Pages (`/shops-index-netivot/`)
3. **HashRouter** – ניווט עובד ב-GitHub Pages
4. **סקריפט deploy** – `./deploy-frontend.sh`

---

## שלבי פריסה

### 1. Render – MONGODB_URI
ב-Render → Environment, ודא:
```
MONGODB_URI=mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/shops-index?retryWrites=true&w=majority
```
**חשוב:** `/shops-index` לפני `?` – זה שם מסד הנתונים.

### 2. MongoDB Atlas – Network Access
Network Access → Add IP → **Allow access from anywhere** (0.0.0.0/0)

### 3. דחיפת הקוד ל-GitHub
```bash
cd "/Users/shlomocohen/Desktop/חניות נתיבות/shops-index"
git add .
git commit -m "Fix: auto-seed, base path, HashRouter"
git push origin main
```

### 4. בניית והעלאת Frontend
```bash
./deploy-frontend.sh
git add docs
git commit -m "Deploy frontend"
git push origin main
```

### 5. המתנה והבדיקה
- המתן 3–5 דקות
- API: https://shops-index-netivot.onrender.com/api/shops
- אתר: https://shlomo-yeshiva.github.io/shops-index-netivot/

---

## אם ה-API מחזיר [] ריק
פתח בדפדפן (מריץ seed ידנית):
https://shops-index-netivot.onrender.com/api/shops/seed?force=1
