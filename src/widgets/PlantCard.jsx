import { useCart } from '../context/CartContext.jsx'
import { formatPKR } from '../utils/currency.js'

export default function PlantCard({ plant, onEdit, onDelete }) {
  const { addToCart } = useCart()
  return (
    <article className="card">
      {plant.image && <img className="img" src={plant.image} alt={plant.name} />}
      <h3>{plant.name}</h3>
      <div className="pill">{plant.category}</div>
      <div className="price">{formatPKR(plant.price)}</div>
      {plant.description && <p className="desc">{plant.description}</p>}
      <div className="actions">
        <button className="btn primary" onClick={() => addToCart(plant)}>Add to Reminder</button>
        <button className="btn" onClick={onEdit}>Edit</button>
        <button className="btn danger" onClick={onDelete}>Delete</button>
      </div>
    </article>
  )
}