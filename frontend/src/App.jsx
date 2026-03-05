import { Routes, Route } from 'react-router-dom'
import StoreList from './pages/StoreList'
import StoreDetail from './pages/StoreDetail'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StoreList />} />
        <Route path="/shop/:id" element={<StoreDetail />} />
      </Routes>
    </Layout>
  )
}

export default App
