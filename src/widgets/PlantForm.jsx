import { useEffect, useState } from 'react'

const empty = {
  name: '',
  price: '',
  category: 'Indoor',
  description: '',
  image: ''
}

export default function PlantForm({ initial, onCancel, onSave }) {
  const [data, setData] = useState(empty)
  useEffect(() => {
    setData(prev => ({ ...prev, ...initial }))
  }, [initial])

  function update(field, value) {
    setData(d => ({ ...d, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      name: data.name.trim(),
      price: Number(data.price) || 0,
      category: data.category.trim() || 'Uncategorized',
      description: data.description.trim(),
      image: data.image.trim()
    }
    onSave(payload)
  }

  return (
    <form className="form" onSubmit={handleSubmit} aria-label="Plant form">
      <div className="row">
        <input className="input" placeholder="Name" value={data.name} onChange={e => update('name', e.target.value)} required />
        <input className="input" type="number" placeholder="Price" value={data.price} onChange={e => update('price', e.target.value)} min="0" step="0.01" />
      </div>
      <div className="row">
        <select className="select" value={data.category} onChange={e => update('category', e.target.value)}>
          <option>Indoor</option>
          <option>Outdoor</option>
          <option>Succulent</option>
          <option>Flowering</option>
          <option>Herbs</option>
        </select>
        <input className="input" placeholder="Image path (e.g., /rose.jpg)" value={data.image} onChange={e => update('image', e.target.value)} />
      </div>
      <textarea className="input" placeholder="Description" value={data.description} onChange={e => update('description', e.target.value)} rows={3} />
      <div className="actions">
        <button className="btn primary" type="submit">{initial?.id ? 'Save changes' : 'Add plant'}</button>
        <button className="btn" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}