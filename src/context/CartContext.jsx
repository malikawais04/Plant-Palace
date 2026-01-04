import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartCtx = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem('cart')
    return raw ? JSON.parse(raw) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addToCart(plant) {
    setItems(prev => {
      const exists = prev.find(i => i.id === plant.id)
      if (exists) {
        return prev.map(i => i.id === plant.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [{ id: plant.id, name: plant.name, price: plant.price, category: plant.category, qty: 1 }, ...prev]
    })
  }

  function updateQty(id, qty) {
    const q = Math.max(1, Number.isFinite(qty) ? qty : 1)
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: q } : i))
  }

  function removeFromCart(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function clearCart() {
    setItems([])
  }
  const deletePlant = (id) => {
  const updatedPlants = plants.filter(plant => plant.id !== id);
  setPlants(updatedPlants);
  localStorage.setItem('plants', JSON.stringify(updatedPlants));
};

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  const value = { items, addToCart, updateQty, removeFromCart, clearCart, totalItems }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}