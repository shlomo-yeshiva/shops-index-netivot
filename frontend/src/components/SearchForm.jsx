import { useState } from 'react'

export default function SearchForm({ onSearch, categories = [] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ query: query.trim(), category: category.trim() })
  }

  const handleClear = () => {
    setQuery('')
    setCategory('')
    onSearch({ query: '', category: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-amber-800 mb-4">🔍 חיפוש חנויות</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חפש לפי שם או כתובת..."
            className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
        </div>
        {categories.length > 0 && (
          <div className="w-full md:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
            >
              <option value="">כל הקטגוריות</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition"
          >
            חפש
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            נקה
          </button>
        </div>
      </div>
    </form>
  )
}
