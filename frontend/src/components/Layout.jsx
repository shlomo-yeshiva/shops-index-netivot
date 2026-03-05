import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="bg-amber-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold hover:text-amber-100 transition">
            🏪 אינדקס חנויות נתיבות
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-amber-800 text-amber-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© אינדקס חנויות נתיבות - מידע על חנויות באזור</p>
        </div>
      </footer>
    </div>
  )
}
