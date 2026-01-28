import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Camp {
  id: string
  name: string
  description: string
  location: string
  startDate: string
  endDate: string
  price: number
  category: string
  imageUrl: string
  ageRange: string
  capacity: number
  createdAt: string
}

interface CampStore {
  camps: Camp[]
  addCamp: (camp: Omit<Camp, 'id' | 'createdAt'>) => void
  getCamps: () => Camp[]
  getCampById: (id: string) => Camp | undefined
  filterCamps: (filters: {
    category?: string
    location?: string
    minPrice?: number
    maxPrice?: number
    searchTerm?: string
  }) => Camp[]
  deleteCamp: (id: string) => void
}

export const useCampStore = create<CampStore>()(
  persist(
    (set: any, get: any) => ({
      camps: [],
      addCamp: (camp: Omit<Camp, 'id' | 'createdAt'>) => {
        const newCamp: Camp = {
          ...camp,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }
        set((state: CampStore) => ({
          camps: [...state.camps, newCamp],
        }))
      },
      getCamps: () => get().camps,
      getCampById: (id: string) => get().camps.find((camp: Camp) => camp.id === id),
      filterCamps: (filters: {
        category?: string
        location?: string
        minPrice?: number
        maxPrice?: number
        searchTerm?: string
      }) => {
        const { category, location, minPrice, maxPrice, searchTerm } = filters
        let filtered = get().camps
        if (category && category !== 'all') {
          filtered = filtered.filter((camp: Camp) => 
            camp.category.toLowerCase() === category.toLowerCase()
          )
        }
        if (location) {
          filtered = filtered.filter((camp: Camp) =>
            camp.location.toLowerCase().includes(location.toLowerCase())
          )
        }
        if (minPrice !== undefined) {
          filtered = filtered.filter((camp: Camp) => camp.price >= minPrice)
        }
        if (maxPrice !== undefined) {
          filtered = filtered.filter((camp: Camp) => camp.price <= maxPrice)
        }
        if (searchTerm) {
          filtered = filtered.filter((camp: Camp) =>
            camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            camp.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        return filtered
      },
      deleteCamp: (id: string) => {
        set((state: CampStore) => ({
          camps: state.camps.filter((camp: Camp) => camp.id !== id),
        }))
      },
    }),
    {
      name: 'camp-storage',
    }
  )
)