import { useState } from 'react'
import Header from './components/Header.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'

export default function App() {
  const [view, setView] = useState('catalog')

  return (
    <div className="app-shell">
      <Header currentView={view} onNavigate={setView} />
      <main className="container">
        {view === 'catalog' ? <Catalog /> : <Cart />}
      </main>
      <footer className="footer">
        <small>
          Plant Palace – Interactive Plant Catalog & Shopping Reminder System. No online buying.
        </small>
      </footer>
    </div>
  )
}