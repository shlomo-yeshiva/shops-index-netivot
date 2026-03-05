/**
 * בסיס כתובת ה-API - מקומי משתמש ב-proxy, פרודקשן משתמש בכתובת המלאה
 * הגדר VITE_API_URL במשתני סביבה כשיוצא לפרודקשן (לדוגמה: https://your-backend.onrender.com)
 */
export const API_BASE = import.meta.env.VITE_API_URL || ''
