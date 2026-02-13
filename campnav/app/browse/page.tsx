"use client"

import { useState, useMemo } from "react"
import { useCampStore } from "@/store/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function Browse() {
  const camps = useCampStore((state) => state.camps)
  const deleteCamp = useCampStore((state) => state.deleteCamp)
  const filterCamps = useCampStore((state) => state.filterCamps)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [locationFilter, setLocationFilter] = useState("")
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(10000000)

  const categories = [
    { value: "all", label: "All Camps" },
    { value: "adventure", label: "Adventure" },
    { value: "sports", label: "Sports" },
    { value: "arts", label: "Arts & Crafts" },
    { value: "stem", label: "STEM" },
    { value: "nature", label: "Nature" },
    { value: "music", label: "Music" },
    { value: "dance", label: "Dance" },
    { value: "academic", label: "Academic" },
  ]

  const filteredCamps = useMemo(() => {
    return filterCamps({
      category: selectedCategory,
      location: locationFilter,
      searchTerm: searchTerm,
      minPrice: minPrice,
      maxPrice: maxPrice,
    })
  }, [searchTerm, selectedCategory, locationFilter, minPrice, maxPrice, filterCamps])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-[#001220] py-12 px-4" style={{ fontFamily: 'Caveat, cursive' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-6xl font-bold text-white mb-2">Browse Camps</h1>
            <p className="text-2xl text-white/80">
              {filteredCamps.length} {filteredCamps.length === 1 ? 'camp' : 'camps'} available
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline" size="lg">
                ← Home
              </Button>
            </Link>
            <Link href="/create-camp">
              <Button size="lg">
                + Create Camp
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-white/95 border-[#ff0088] border-2">
          <CardHeader>
            <CardTitle className="text-3xl text-[#001220]">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-[#001220]">Search</label>
              <Input
                type="text"
                placeholder="Search camps by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-[#001220]">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.value)}
                    className="text-lg"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-[#001220]">Location</label>
              <Input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Price Range Filter */}
            <div className="space-y-4">
              <label className="text-lg font-medium text-[#001220]">Price Range</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Min Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rwf</span>
                    <Input
                      type="number"
                      min="0"
                      max={maxPrice}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="text-lg pl-12"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Max Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rwf</span>
                    <Input
                      type="number"
                      min={minPrice}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="text-lg pl-12"
                      placeholder="10000000"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-base text-gray-600 bg-[#ff0088]/5 rounded-lg p-3">
                <span>Filtering camps from</span>
                <span className="font-semibold text-[#ff0088]">
                  {minPrice.toLocaleString()} Rwf - {maxPrice.toLocaleString()} Rwf
                </span>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'all' || locationFilter || minPrice > 0 || maxPrice < 10000000) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setLocationFilter("")
                  setMinPrice(0)
                  setMaxPrice(10000000)
                }}
                className="text-lg"
              >
                Clear All Filters
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Camp Listings */}
        {filteredCamps.length === 0 ? (
          <Card className="bg-white/95 border-[#ff0088] border-2">
            <CardContent className="py-16 text-center">
              <div className="text-6xl mb-4">🏕️</div>
              <h3 className="text-3xl font-bold text-[#001220] mb-2">No camps found</h3>
              <p className="text-xl text-gray-600 mb-6">
                {camps.length === 0
                  ? "Be the first to create a camp!"
                  : "Try adjusting your filters or search term"}
              </p>
              <Link href="/create-camp">
                <Button size="lg" className="text-xl">
                  Create a Camp
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCamps.map((camp) => (
              <Card
                key={camp.id}
                className="bg-white border-[#ff0088] border-2 hover:shadow-2xl transition-all hover:scale-105 flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  {camp.imageUrl.startsWith('data:') ? (
                    <img
                      src={camp.imageUrl}
                      alt={camp.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={camp.imageUrl}
                      alt={camp.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute top-3 right-3 bg-[#ff0088] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {camp.category}
                  </div>
                  {camp.mediaGallery && camp.mediaGallery.length > 0 && (
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <span>📸</span>
                      <span>{camp.mediaGallery.length} photos</span>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl text-[#001220] line-clamp-2">
                    {camp.name}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    📍 {camp.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-gray-700 mb-4 line-clamp-3 text-lg">
                    {camp.description}
                  </p>
                  
                  <div className="space-y-2 text-base text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{formatDate(camp.startDate)} - {formatDate(camp.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span>Ages: {camp.ageRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🎯</span>
                      <span>Capacity: {camp.capacity}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <div className="text-2xl font-bold text-[#ff0088]">
                    {camp.price.toLocaleString()} Rwf
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/camp/${camp.id}`}>
                      <Button size="lg" className="text-lg">
                        Learn More
                      </Button>
                    </Link>
                    <Button size="lg" className="text-lg" variant="destructive" onClick={() => deleteCamp(camp.id)}>
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}