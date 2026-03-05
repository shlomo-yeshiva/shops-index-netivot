import { Link } from 'react-router-dom'

export default function ShopCard({ shop }) {
  return (
    <Link
      to={`/shop/${shop._id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-amber-100 hover:border-amber-300"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-amber-900">{shop.name}</h3>
        {shop.category && (
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
            {shop.category}
          </span>
        )}
      </div>
      <p className="text-gray-600 mb-1">📍 {shop.address}</p>
      {shop.openingHours && (
        <p className="text-gray-500 text-sm">🕐 {shop.openingHours}</p>
      )}
      {shop.phone && (
        <p className="text-gray-500 text-sm mt-1">📞 {shop.phone}</p>
      )}
      <p className="text-amber-600 text-sm mt-3 font-medium">לחץ לפרטים נוספים ←</p>
    </Link>
  )
}
