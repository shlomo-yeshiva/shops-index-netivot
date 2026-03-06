# הגדרת Render – Deployment מאוחד

## מה השתנה
- **Frontend + Backend** רצים יחד על Render
- **כתובת אחת:** https://shops-index-netivot.onrender.com
- אין צורך ב-GitHub Pages
- אין בעיות CORS או "לא ניתן להשיג"

---

## הגדרה ב-Render

### 1. מחיקת ה-Web Service הקיים
אם יש שירות ישן – מחק אותו.

### 2. יצירת Web Service חדש
- **New** → **Web Service**
- חבר את `shlomo-yeshiva/shops-index-netivot`

### 3. הגדרות
| שדה | ערך |
|-----|-----|
| **Root Directory** | השאר ריק (שורש הפרויקט) |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### 4. Environment Variables
הוסף:
```
MONGODB_URI=mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/shops-index?retryWrites=true&w=majority
```
**חשוב:** `/shops-index` לפני `?`

---

## אחרי ה-Deploy

- **אתר:** https://shops-index-netivot.onrender.com
- **API:** https://shops-index-netivot.onrender.com/api/shops
- **Seed (אם ריק):** https://shops-index-netivot.onrender.com/api/seed-shops?force=1
- **Debug:** https://shops-index-netivot.onrender.com/api/debug
