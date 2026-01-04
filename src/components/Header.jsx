import { useCart } from '../context/CartContext.jsx'

export default function Header({ currentView, onNavigate }) {
  const { totalItems } = useCart()
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand" role="heading" aria-level={1}>
          <span className="logo">🌿</span>
          <span className="title">Plant Palace</span>
        </div>
        <nav className="nav" aria-label="Main">
          <button className={`btn ${currentView === 'catalog' ? 'primary' : 'ghost'}`} onClick={() => onNavigate('catalog')}>
            Catalog
          </button>
          <button className={`btn ${currentView === 'cart' ? 'primary' : 'ghost'}`} onClick={() => onNavigate('cart')}>
            Reminder Cart
            <span className="pill" style={{ marginLeft: 8 }} aria-label={`Items in cart: ${totalItems}`}>
              {totalItems}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}