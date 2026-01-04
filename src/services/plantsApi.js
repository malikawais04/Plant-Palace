import { seedPlants } from '../data/seed.js'

const IMAGE_MAP = {
  'p-aloevera': '/aloevera.jpg',
  'p-snakeplant': '/snakeplant.jpg',
  'p-rose': '/rose.jpg',
  'p-basil': '/basil.jpg',
  'p-arecapalm': '/arecapalm.jpg',
  'p-lily': '/lily.jpg',
  'p-sunflower': '/sunflower.jpg',
  'p-cactus': '/cactus.jpg',
}

const KEY = 'plants'

function delay(ms = 250) {
  return new Promise(res => setTimeout(res, ms))
}

export async function ensureSeed() {
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seedPlants))
  } else {
    try {
      const list = JSON.parse(raw)
      const next = list.map(p => (
        IMAGE_MAP[p.id] && IMAGE_MAP[p.id] !== p.image
          ? { ...p, image: IMAGE_MAP[p.id] }
          : p
      ))
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
  }
  await delay(150)
}

export async function getPlants() {
  await delay()
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

export async function createPlant(data) {
  await delay()
  const list = await getPlants()
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  const plant = { id, ...data }
  const next = [plant, ...list]
  localStorage.setItem(KEY, JSON.stringify(next))
  return plant
}

export async function updatePlant(id, data) {
  await delay()
  const list = await getPlants()
  const next = list.map(p => p.id === id ? { ...p, ...data } : p)
  localStorage.setItem(KEY, JSON.stringify(next))
  return next.find(p => p.id === id)
}

export async function deletePlant(id) {
  await delay()
  const list = await getPlants()
  const next = list.filter(p => p.id !== id)
  localStorage.setItem(KEY, JSON.stringify(next))
  return { ok: true }
}