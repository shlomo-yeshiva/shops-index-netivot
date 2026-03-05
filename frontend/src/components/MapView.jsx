import { useMemo } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px'
}

export default function MapView({ lat, lng, shopName = '' }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || ''
  })

  const center = useMemo(() => ({ lat: Number(lat), lng: Number(lng) }), [lat, lng])

  if (!apiKey) {
    return (
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8 text-center">
        <p className="text-amber-800 font-semibold mb-2">מפת גוגל לא זמינה</p>
        <p className="text-gray-600 text-sm">
          הוסף את מפתח Google Maps API בקובץ <code className="bg-amber-100 px-2 py-1 rounded">.env.local</code>:
        </p>
        <code className="block mt-2 text-left bg-gray-100 p-4 rounded text-sm">
          VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
        </code>
        <p className="text-gray-500 text-xs mt-4">
          קואורדינטות: {lat}, {lng}
        </p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center text-red-800">
        שגיאה בטעינת מפת גוגל. בדוק את מפתח ה-API.
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="bg-amber-50 rounded-xl h-[400px] flex items-center justify-center">
        <p>טוען מפה...</p>
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={{
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true
      }}
    >
      <Marker
        position={center}
        title={shopName}
      />
    </GoogleMap>
  )
}
