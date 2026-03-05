<!DOCTYPE html>
<!-- אינדקס חנויות נתיבות - דמו להצגה | למפת גוגל: הוסף GOOGLE_MAPS_API_KEY בסקריפט -->
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>אינדקס חנויות נתיבות</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Heebo', sans-serif; }
        /* הוסף את מפתח Google Maps כאן להצגת המפה */
        /* אפשר גם להשאיר ריק - יוצגו הקואורדינטות */
    </style>
</head>
<body class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
    <header class="bg-amber-600 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <a href="#" onclick="showList(); return false;" class="text-2xl font-bold hover:text-amber-100 transition">🏪 אינדקס חנויות נתיבות</a>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        <!-- דף רשימה -->
        <div id="listPage">
            <h1 class="text-3xl font-bold text-amber-900 mb-6">🏪 רשימת חנויות</h1>

            <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 class="text-xl font-bold text-amber-800 mb-4">🔍 חיפוש חנויות</h2>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchQuery" placeholder="חפש לפי שם או כתובת..."
                            class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
                    </div>
                    <div class="w-full md:w-48">
                        <select id="searchCategory" class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white">
                            <option value="">כל הקטגוריות</option>
                        </select>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="doSearch()" class="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition">חפש</button>
                        <button onclick="clearSearch()" class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition">נקה</button>
                    </div>
                </div>
            </div>

            <div id="shopsGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="noResults" class="hidden bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
                <p class="text-amber-800">לא נמצאו חנויות.</p>
            </div>
        </div>

        <!-- דף פרטי חנות -->
        <div id="detailPage" class="hidden">
            <a href="#" onclick="showList(); return false;" class="inline-flex items-center text-amber-700 hover:text-amber-800 mb-6 font-medium">← חזרה לרשימת חנויות</a>
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="p-8">
                    <h1 id="shopName" class="text-3xl font-bold text-amber-900"></h1>
                    <span id="shopCategory" class="inline-block mt-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"></span>
                    <div class="mt-6 space-y-4 text-lg">
                        <div><span class="font-semibold text-gray-700">📍 כתובת: </span><span id="shopAddress"></span></div>
                        <div><span class="font-semibold text-gray-700">🕐 שעות פעילות: </span><span id="shopHours"></span></div>
                        <div><span class="font-semibold text-gray-700">📞 טלפון: </span><a id="shopPhone" href="#" class="text-amber-600 hover:underline"></a></div>
                    </div>
                </div>
                <div class="p-8 pt-0">
                    <h2 class="text-xl font-bold text-amber-900 mb-4">📍 מיקום על המפה</h2>
                    <div id="mapContainer" class="w-full h-[400px] rounded-xl overflow-hidden"></div>
                    <div id="mapPlaceholder" class="hidden bg-amber-50 border-2 border-amber-200 rounded-xl p-8 text-center">
                        <p class="text-amber-800 font-semibold mb-2">מפת גוגל</p>
                        <p class="text-gray-600 text-sm">הוסף מפתח Google Maps API בקובץ (משתנה GOOGLE_MAPS_API_KEY) להצגת מפה</p>
                        <p class="text-gray-500 text-xs mt-4">קואורדינטות: <span id="coordsText"></span></p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-amber-800 text-amber-100 py-6 mt-12">
        <div class="container mx-auto px-4 text-center">
            <p>© אינדקס חנויות נתיבות</p>
        </div>
    </footer>

    <script>
        // ═══════════════════════════════════════════════════════════════
        // הוסף כאן את מפתח Google Maps API (או השאר ריק)
        // קבל מפתח מ: https://console.cloud.google.com/apis/credentials
        // ═══════════════════════════════════════════════════════════════
        const GOOGLE_MAPS_API_KEY = '';

        const SHOPS = [
            { id: '1', name: 'חנות מוצרי חשמל', address: 'דרך בן גוריון 15, נתיבות', openingHours: 'א-ה 09:00-19:00, ו 09:00-14:00', phone: '08-9991234', category: 'חשמל', lat: 31.4210, lng: 34.5950 },
            { id: '2', name: 'מכולת השכונה', address: 'רחוב הרצל 22, נתיבות', openingHours: 'כל יום 07:00-22:00', phone: '08-9995678', category: 'מכולת', lat: 31.4180, lng: 34.5920 },
            { id: '3', name: 'פרפריה יופי', address: 'רחוב ויצמן 8, נתיבות', openingHours: 'א-ה 09:00-20:00', phone: '08-9999012', category: 'יופי', lat: 31.4220, lng: 34.5980 },
            { id: '4', name: 'מאפיית נתיבות', address: 'רחוב הרצל 5, נתיבות', openingHours: 'כל יום 05:00-22:00', phone: '08-9993456', category: 'מזון', lat: 31.4170, lng: 34.5910 },
            { id: '5', name: 'חנות כלבו', address: 'דרך בן גוריון 45, נתיבות', openingHours: 'א-ה 08:00-20:00, ו 08:00-15:00', phone: '08-9997890', category: 'כלבו', lat: 31.4230, lng: 34.5960 }
        ];

        let filteredShops = [...SHOPS];
        let mapInstance = null;

        function getCategories() {
            return [...new Set(SHOPS.map(s => s.category).filter(Boolean))].sort();
        }

        function filterShops() {
            const query = document.getElementById('searchQuery').value.trim().toLowerCase();
            const category = document.getElementById('searchCategory').value.trim();
            filteredShops = SHOPS.filter(s => {
                const matchQuery = !query || s.name.toLowerCase().includes(query) || s.address.toLowerCase().includes(query) || (s.category && s.category.toLowerCase().includes(query));
                const matchCategory = !category || s.category === category;
                return matchQuery && matchCategory;
            });
        }

        function renderShops() {
            filterShops();
            const grid = document.getElementById('shopsGrid');
            const noResults = document.getElementById('noResults');
            grid.innerHTML = '';
            if (filteredShops.length === 0) {
                noResults.classList.remove('hidden');
                return;
            }
            noResults.classList.add('hidden');
            filteredShops.forEach(shop => {
                const card = document.createElement('a');
                card.href = '#';
                card.onclick = (e) => { e.preventDefault(); window.location.hash = 'shop/' + shop.id; };
                card.className = 'block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-amber-100 hover:border-amber-300';
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold text-amber-900">${shop.name}</h3>
                        ${shop.category ? `<span class="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">${shop.category}</span>` : ''}
                    </div>
                    <p class="text-gray-600 mb-1">📍 ${shop.address}</p>
                    ${shop.openingHours ? `<p class="text-gray-500 text-sm">🕐 ${shop.openingHours}</p>` : ''}
                    ${shop.phone ? `<p class="text-gray-500 text-sm mt-1">📞 ${shop.phone}</p>` : ''}
                    <p class="text-amber-600 text-sm mt-3 font-medium">לחץ לפרטים נוספים ←</p>
                `;
                grid.appendChild(card);
            });
        }

        function populateCategories() {
            const select = document.getElementById('searchCategory');
            getCategories().forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = cat;
                select.appendChild(opt);
            });
        }

        function showList() {
            window.location.hash = '';
            document.getElementById('listPage').classList.remove('hidden');
            document.getElementById('detailPage').classList.add('hidden');
            renderShops();
        }

        function showShop(id) {
            const shop = SHOPS.find(s => s.id === id);
            if (!shop) return;
            document.getElementById('listPage').classList.add('hidden');
            document.getElementById('detailPage').classList.remove('hidden');
            document.getElementById('shopName').textContent = shop.name;
            document.getElementById('shopCategory').textContent = shop.category || '';
            document.getElementById('shopCategory').style.display = shop.category ? 'inline-block' : 'none';
            document.getElementById('shopAddress').textContent = shop.address;
            document.getElementById('shopHours').textContent = shop.openingHours || '-';
            const phoneEl = document.getElementById('shopPhone');
            phoneEl.textContent = shop.phone || '-';
            phoneEl.href = shop.phone ? 'tel:' + shop.phone : '#';
            phoneEl.style.display = shop.phone ? 'inline' : 'none';
            document.getElementById('coordsText').textContent = shop.lat + ', ' + shop.lng;
            initMap(shop);
        }

        function initMap(shop) {
            const container = document.getElementById('mapContainer');
            const placeholder = document.getElementById('mapPlaceholder');
            container.innerHTML = '';
            container.classList.remove('hidden');
            placeholder.classList.add('hidden');

            if (!GOOGLE_MAPS_API_KEY) {
                container.classList.add('hidden');
                placeholder.classList.remove('hidden');
                return;
            }

            if (typeof google === 'undefined') {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=onMapLoaded`;
                script.async = true;
                script.defer = true;
                window.onMapLoaded = () => createMap(shop, container);
                document.head.appendChild(script);
            } else {
                createMap(shop, container);
            }
        }

        function createMap(shop, container) {
            const center = { lat: Number(shop.lat), lng: Number(shop.lng) };
            mapInstance = new google.maps.Map(container, {
                center,
                zoom: 16,
                mapTypeControl: true,
                fullscreenControl: true,
                zoomControl: true
            });
            new google.maps.Marker({ position: center, map: mapInstance, title: shop.name });
        }

        function doSearch() {
            renderShops();
        }

        function clearSearch() {
            document.getElementById('searchQuery').value = '';
            document.getElementById('searchCategory').value = '';
            renderShops();
        }

        document.getElementById('searchQuery').addEventListener('keypress', e => {
            if (e.key === 'Enter') doSearch();
        });

        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash.startsWith('shop/')) {
                const id = hash.split('/')[1];
                if (SHOPS.find(s => s.id === id)) showShop(id);
            } else {
                showList();
            }
        });

        if (window.location.hash && window.location.hash.startsWith('#shop/')) {
            const id = window.location.hash.slice(1).split('/')[1];
            showShop(id);
        } else {
            populateCategories();
            renderShops();
        }
    </script>
</body>
</html>
