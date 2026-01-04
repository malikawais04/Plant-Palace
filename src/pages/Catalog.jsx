import { useEffect, useMemo, useState } from 'react'
import { getPlants, createPlant, updatePlant, deletePlant, ensureSeed } from '../services/plantsApi.js'
import PlantCard from '../widgets/PlantCard.jsx'
import PlantForm from '../widgets/PlantForm.jsx'
import { seedPlants } from '../data/seed';

export default function Catalog() {
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState('all')
  const categories = useMemo(() => ['all', ...Array.from(new Set(plants.map(p => p.category)))], [plants])

  useEffect(() => {
    ensureSeed().then(() => getPlants())
      .then(setPlants)
      .catch(err => setError(err?.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return plants
    return plants.filter(p => p.category === filter)
  }, [plants, filter])

  function handleReset() {
  if (window.confirm("This will delete all custom plants and restore the original list. Continue?")) {
    setPlants(seedPlants);
    localStorage.removeItem('plants'); 
    window.location.reload();}
  }

  async function handleCreate(data) {
    const created = await createPlant(data)
    setPlants(prev => [created, ...prev])
  }

  async function handleUpdate(id, data) {
    const updated = await updatePlant(id, data)
    setPlants(prev => prev.map(p => p.id === id ? updated : p))
    setEditing(null)
  }

  async function handleDelete(id) {
    await deletePlant(id)
    setPlants(prev => prev.filter(p => p.id !== id))
  }

return (
    <section>
      <div className="toolbar">
        <div className="left">
          <span className="pill">Plant Reminder Catalog</span>
        </div>
        <div className="right">
          <select 
            className="select" 
            value={filter} 
            onChange={e => setFilter(e.target.value)} 
            aria-label="Filter by category"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button className="btn-reset" onClick={handleReset} style={{ marginRight: '8px' }}>
            Reset Catalog
          </button>

          <button className="btn" onClick={() => setEditing({})}>Add Plant</button>
        </div>
      </div>

      {editing && <div className="spacer" />}
      
      {editing && (
        <PlantForm
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={(data) => editing?.id ? handleUpdate(editing.id, data) : handleCreate(data)}
        />
      )}

      <div className="spacer" />
      {loading && <p className="muted">Loading plants...</p>}
      {error && <p className="muted" role="alert">{error}</p>}

      <div className="grid" aria-live="polite">
        {filtered.map(p => (
          <PlantCard 
            key={p.id} 
            plant={p} 
            onEdit={() => setEditing(p)} 
            onDelete={() => handleDelete(p.id)} 
          />
        ))}

        {filtered.length === 0 && !loading && (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <h3>No plants found</h3>
            <p className="desc">Your catalog is empty.</p>
            <button className="btn" onClick={handleReset}>Restore Original Plants</button>
          </div>
        )}
      </div>
    </section>
  );
}