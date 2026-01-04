import { useCart } from '../context/CartContext.jsx'
import { formatPKR } from '../utils/currency.js'

export default function Cart() {
  const { items, updateQty, removeFromCart, clearCart } = useCart()
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <section>
      <div className="toolbar">
        <div className="left">
          <span className="pill">Reminder list — use at physical market</span>
        </div>
        <div className="right">
          <button className="btn" onClick={clearCart} disabled={items.length === 0}>Clear</button>
        </div>
      </div>
      <div className="list">
        {items.map(item => (
          <div key={item.id} className="list-item">
            <div className="meta">
              <div className="title">{item.name}</div>
              <div className="muted">{item.category} • {formatPKR(item.price)}</div>
              <div className="qty">
                <label htmlFor={`qty-${item.id}`} className="sr-only">Quantity</label>
                <input
                  id={`qty-${item.id}`}
                  className="input"
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={e => updateQty(item.id, parseInt(e.target.value || '1', 10))}
                />
              </div>
            </div>
            <div>
              <button className="btn danger" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="card">
            <h3>No reminders yet</h3>
            <p className="desc">Add plants from the catalog to build your list.</p>
          </div>
        )}
      </div>
      <div className="spacer" />
      <div className="pill" aria-live="polite">Total estimated: {formatPKR(total)}</div>
    </section>
  )
}