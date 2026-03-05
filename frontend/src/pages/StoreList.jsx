import { useState, useEffect } from 'react'
import SearchForm from '../components/SearchForm'
import ShopCard from '../components/ShopCard'
import { CATEGORIES } from '../constants/categories'
import { API_BASE } from '../config'

const API_URL = `${API_BASE}/api/shops`

export default function StoreList() {
  const [shops, setShops] = useState([])
  const categories = CATEGORIES
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchShops = async (params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const searchParams = new URLSearchParams()
      if (params.query) searchParams.append('query', params.query)
      if (params.category) searchParams.append('category', params.category)
      const url = `${API_URL}${searchParams.toString() ? '?' + searchParams.toString() : ''}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('שגיאה בטעינת החנויות')
      const data = await res.json()
      setShops(data)
    } catch (err) {
      setError(err.message)
      setShops([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShops()
  }, [])

  const handleSearch = (params) => {
    fetchShops(params)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900 mb-6">🏪 רשימת חנויות</h1>
      <SearchForm onSearch={handleSearch} categories={categories} />

      {loading && (
        <div className="text-center py-12">
          <p className="text-amber-700">טוען חנויות...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 mb-6">
          <p>⚠️ {error}</p>
          <p className="text-sm mt-2">ודא שה-backend רץ (מקומי: http://localhost:5001)</p>
        </div>
      )}

      {!loading && !error && shops.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
          <p className="text-amber-800">לא נמצאו חנויות.</p>
          <p className="text-sm text-gray-600 mt-2">
            הרץ <code className="bg-amber-100 px-2 py-1 rounded">npm run seed</code> בתיקיית backend להזנת חנויות נתיבות
          </p>
        </div>
      )}

      {!loading && !error && shops.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <ShopCard key={shop._id} shop={shop} />
          ))}
        </div>
      )}
    </div>
  )
}
