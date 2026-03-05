# הוראות Push ל-GitHub

## אם ההתחברות נכשלת – שימוש ב-Token בכתובת

### 1. צור Token חדש
- https://github.com/settings/tokens
- Generate new token (classic)
- סמן **repo**
- העתק את ה-Token (לא תצטרך לשלוח – תשמור רק אצלך)

### 2. עדכן את ה-remote עם ה-Token בכתובת
הרץ בטרמינל (החלף `YOUR_TOKEN_HERE` ב-Token האמיתי שיצרת):

```bash
cd "/Users/shlomocohen/Desktop/חניות נתיבות /shops-index"

git remote set-url origin https://shlomo-yeshiva:YOUR_TOKEN_HERE@github.com/shlomo-yeshiva/shops-index-netivot.git

git push -u origin main
```

### 3. אחרי שה-Push הצליח – הסר את ה-Token מהכתובת
לבטחון, החזר את הכתובת הרגילה:

```bash
git remote set-url origin https://github.com/shlomo-yeshiva/shops-index-netivot.git
```

---

## אלטרנטיבה: ניקוי Keychain ידני
1. פתח **Keychain Access** (מנגנון מפתחות)
2. חפש **github**
3. מחק רשומות ישנות של github.com
4. הרץ שוב `git push -u origin main`
