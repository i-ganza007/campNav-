import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Custom IndexedDB storage for handling large media files
const indexedDBStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('camp-storage', 1)
      
      request.onerror = () => resolve(null)
      
      request.onsuccess = () => {
        const db = request.result
        if (!db.objectStoreNames.contains('camps')) {
          resolve(null)
          return
        }
        const transaction = db.transaction(['camps'], 'readonly')
        const store = transaction.objectStore('camps')
        const getRequest = store.get(name)
        
        getRequest.onsuccess = () => {
          resolve(getRequest.result ? JSON.stringify(getRequest.result) : null)
        }
        getRequest.onerror = () => resolve(null)
      }
      
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('camps')) {
          db.createObjectStore('camps')
        }
      }
    })
  },
  setItem: async (name: string, value: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('camp-storage', 1)
      
      request.onerror = () => reject(request.error)
      
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['camps'], 'readwrite')
        const store = transaction.objectStore('camps')
        const putRequest = store.put(JSON.parse(value), name)
        
        putRequest.onsuccess = () => resolve()
        putRequest.onerror = () => reject(putRequest.error)
      }
      
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('camps')) {
          db.createObjectStore('camps')
        }
      }
    })
  },
  removeItem: async (name: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      const request = indexedDB.open('camp-storage', 1)
      
      request.onerror = () => resolve()
      
      request.onsuccess = () => {
        const db = request.result
        if (!db.objectStoreNames.contains('camps')) {
          resolve()
          return
        }
        const transaction = db.transaction(['camps'], 'readwrite')
        const store = transaction.objectStore('camps')
        const deleteRequest = store.delete(name)
        
        deleteRequest.onsuccess = () => resolve()
        deleteRequest.onerror = () => resolve()
      }
      
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('camps')) {
          db.createObjectStore('camps')
        }
      }
    })
  },
}

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
  promoVideo?: string  // Base64 string or URL for promotional/introduction video
  mediaGallery?: string[]  // Array of base64 strings or URLs for additional media
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
}

export const useCampStore = create<CampStore>()(
  persist(
    (set, get) => ({
      camps: [],
      
      addCamp: (camp) => {
        const newCamp: Camp = {
          ...camp,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          camps: [...state.camps, newCamp],
        }))
      },
      
      getCamps: () => get().camps,
      
      getCampById: (id) => get().camps.find((camp) => camp.id === id),
      
      filterCamps: (filters) => {
        const { category, location, minPrice, maxPrice, searchTerm } = filters
        let filtered = get().camps
        
        if (category && category !== 'all') {
          filtered = filtered.filter((camp) => 
            camp.category.toLowerCase() === category.toLowerCase()
          )
        }
        
        if (location) {
          filtered = filtered.filter((camp) =>
            camp.location.toLowerCase().includes(location.toLowerCase())
          )
        }
        
        if (minPrice !== undefined) {
          filtered = filtered.filter((camp) => camp.price >= minPrice)
        }
        
        if (maxPrice !== undefined) {
          filtered = filtered.filter((camp) => camp.price <= maxPrice)
        }
        
        if (searchTerm) {
          filtered = filtered.filter((camp) =>
            camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            camp.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        
        return filtered
      },
    }),
    {
      name: 'camp-storage',
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
)