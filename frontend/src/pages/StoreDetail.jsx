import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import MapView from '../components/MapView'
import { API_BASE } from '../config'

const API_URL = `${API_BASE}/api/shops`

export default function StoreDetail() {
  const { id } = useParams()
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchShop = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_URL}/${id}`)
        if (!res.ok) {
          if (res.status === 404) throw new Error('חנות לא נמצאה')
          throw new Error('שגיאה בטעינת החנות')
        }
        const data = await res.json()
        setShop(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchShop()
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-amber-700">טוען פרטי חנות...</p>
      </div>
    )
  }

  if (error || !shop) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <p className="text-red-800">⚠️ {error || 'חנות לא נמצאה'}</p>
        <Link to="/" className="inline-block mt-4 text-amber-600 hover:text-amber-700 font-medium">
          ← חזרה לרשימה
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-6 font-medium">
        ← חזרה לרשימת חנויות
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-900">{shop.name}</h1>
              {shop.category && (
                <span className="inline-block mt-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  {shop.category}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4 text-lg">
            <div>
              <span className="font-semibold text-gray-700">📍 כתובת: </span>
              <span>{shop.address}</span>
            </div>
            {shop.openingHours && (
              <div>
                <span className="font-semibold text-gray-700">🕐 שעות פעילות: </span>
                <span>{shop.openingHours}</span>
              </div>
            )}
            {shop.phone && (
              <div>
                <span className="font-semibold text-gray-700">📞 טלפון: </span>
                <a href={`tel:${shop.phone}`} className="text-amber-600 hover:underline">
                  {shop.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 pt-0">
          <h2 className="text-xl font-bold text-amber-900 mb-4">📍 מיקום על המפה</h2>
          <MapView lat={shop.lat} lng={shop.lng} shopName={shop.name} />
        </div>
      </div>
    </div>
  )
}
