#!/bin/bash
# סקריפט לבניית והעלאת Frontend ל-GitHub Pages
set -e
cd "$(dirname "$0")"

echo "בונה Frontend עם API URL של Render..."
cd frontend
VITE_API_URL=https://shops-index-netivot.onrender.com npm run build

echo "מעתיק ל-docs..."
cd ..
rm -rf docs
mkdir docs
cp -r frontend/dist/* docs/

echo "מוכן! הרץ: git add docs && git commit -m 'Deploy' && git push"
echo "או השתמש ב-GitHub Desktop לדחיפה"
