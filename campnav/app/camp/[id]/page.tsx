"use client"

import { useState, useEffect } from "react"
import { useCampStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function CampDetails() {
  const params = useParams()
  const id = params.id as string
  const getCampById = useCampStore((state) => state.getCampById)
  const camp = getCampById(id)
  
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openMedia = (index: number) => {
    setSelectedMediaIndex(index)
    setIsModalOpen(true)
  }

  const closeMedia = () => {
    setIsModalOpen(false)
    setSelectedMediaIndex(null)
  }

  const nextMedia = () => {
    if (camp?.mediaGallery && selectedMediaIndex !== null) {
      setSelectedMediaIndex((selectedMediaIndex + 1) % camp.mediaGallery.length)
    }
  }

  const prevMedia = () => {
    if (camp?.mediaGallery && selectedMediaIndex !== null) {
      setSelectedMediaIndex(
        (selectedMediaIndex - 1 + camp.mediaGallery.length) % camp.mediaGallery.length
      )
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      
      if (e.key === 'Escape') {
        closeMedia()
      } else if (e.key === 'ArrowRight') {
        nextMedia()
      } else if (e.key === 'ArrowLeft') {
        prevMedia()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, selectedMediaIndex])

  if (!camp) {
    return (
      <div className="min-h-screen bg-[#001220] py-12 px-4 flex items-center justify-center" style={{ fontFamily: 'Caveat, cursive' }}>
        <Card className="bg-white/95 border-[#ff0088] border-2 max-w-2xl">
          <CardContent className="py-16 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-4xl font-bold text-[#001220] mb-4">Camp Not Found</h1>
            <p className="text-xl text-gray-600 mb-6">
              The camp you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/browse">
              <Button size="lg" className="text-xl">
                Browse All Camps
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const calculateDuration = () => {
    const start = new Date(camp.startDate)
    const end = new Date(camp.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="min-h-screen bg-[#001220] py-12 px-4" style={{ fontFamily: 'Caveat, cursive' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/browse">
            <Button variant="outline" size="lg">
              ← Back to Browse
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg" className="text-white hover:text-[#ff0088]">
              Home
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Quick Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <Card className="bg-white border-[#ff0088] border-2 overflow-hidden">
              <div className="relative h-96 w-full">
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
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                )}
                <div className="absolute top-4 right-4 bg-[#ff0088] text-white px-4 py-2 rounded-full text-xl font-bold">
                  {camp.category}
                </div>
              </div>
            </Card>

            {/* Promotional Video */}
            {camp.promoVideo && (
              <Card className="bg-white/95 border-[#ff0088] border-2">
                <CardHeader>
                  <CardTitle className="text-4xl text-[#001220] flex items-center gap-2">
                    <span>🎥</span>
                    <span>Watch Our Camp Introduction</span>
                  </CardTitle>
                  <CardDescription className="text-xl text-gray-600">
                    Get a sneak peek of what awaits at {camp.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-lg overflow-hidden bg-black">
                    <video
                      src={camp.promoVideo}
                      className="w-full"
                      controls
                      controlsList="nodownload"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Camp Details */}
            <Card className="bg-white/95 border-[#ff0088] border-2">
              <CardHeader>
                <CardTitle className="text-5xl text-[#001220] mb-2">
                  {camp.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-2xl text-gray-600">
                  <span>📍</span>
                  <span>{camp.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-[#001220] mb-3">About This Camp</h3>
                  <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                    {camp.description}
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-3xl font-bold text-[#001220] mb-4">Camp Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">📅</span>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Start Date</p>
                          <p className="text-xl text-gray-700">{formatDate(camp.startDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">📅</span>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">End Date</p>
                          <p className="text-xl text-gray-700">{formatDate(camp.endDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">⏰</span>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Duration</p>
                          <p className="text-xl text-gray-700">{calculateDuration()} days</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">👥</span>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Age Range</p>
                          <p className="text-xl text-gray-700">{camp.ageRange}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🎯</span>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Capacity</p>
                          <p className="text-xl text-gray-700">{camp.capacity} participants</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🏷️</span>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Category</p>
                          <p className="text-xl text-gray-700 capitalize">{camp.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Gallery */}
            {camp.mediaGallery && camp.mediaGallery.length > 0 && (
              <Card className="bg-white/95 border-[#ff0088] border-2">
                <CardHeader>
                  <CardTitle className="text-4xl text-[#001220]">📸 Photo & Video Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {camp.mediaGallery.map((media, index) => (
                      <div 
                        key={index} 
                        className="relative group cursor-pointer"
                        onClick={() => openMedia(index)}
                      >
                        <div className="relative h-48 w-full rounded-lg overflow-hidden border-2 border-[#ff0088]/30 hover:border-[#ff0088] transition-colors">
                          {media.startsWith('data:video') ? (
                            <>
                              <video
                                src={media}
                                className="w-full h-full object-cover pointer-events-none"
                              />
                              {/* Play button overlay for videos */}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                                  <svg 
                                    className="w-8 h-8 text-[#ff0088]" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          ) : media.startsWith('data:') ? (
                            <img
                              src={media}
                              alt={`${camp.name} - Gallery image ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <Image
                              src={media}
                              alt={`${camp.name} - Gallery image ${index + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 border-[#ff0088] border-2 sticky top-8">
              <CardHeader>
                <CardTitle className="text-4xl text-[#001220]">Enrollment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#ff0088]/10 rounded-lg p-6 text-center">
                  <p className="text-lg text-gray-600 mb-2">Price per child</p>
                  <p className="text-5xl font-bold text-[#ff0088]">
                    {camp.price.toLocaleString()} Rwf
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(camp.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(camp.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-900">{calculateDuration()} days</span>
                  </div>
                </div>


                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>✅</span>
                    <span className="text-lg">Spots Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>✅</span>
                    <span className="text-lg">Qualified Instructors</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>✅</span>
                    <span className="text-lg">Safety First</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>✅</span>
                    <span className="text-lg">Fun Guaranteed</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-center text-gray-600 text-lg mb-3">
                    Have questions?
                  </p>
                  <p className="text-center text-gray-700 mb-4">
                    Email us at: <span className="font-semibold text-[#ff0088]">campLoc@gmail.com</span>
                  </p>

                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Media Viewer Modal */}
        {isModalOpen && selectedMediaIndex !== null && camp.mediaGallery && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeMedia}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4">
              {/* Close button */}
              <button
                onClick={closeMedia}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Previous button */}
              {camp.mediaGallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevMedia()
                  }}
                  className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Media content */}
              <div 
                className="relative max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {camp.mediaGallery[selectedMediaIndex].startsWith('data:video') ? (
                  <video
                    src={camp.mediaGallery[selectedMediaIndex]}
                    className="max-w-full max-h-[85vh] rounded-lg"
                    controls
                    autoPlay
                  />
                ) : camp.mediaGallery[selectedMediaIndex].startsWith('data:') ? (
                  <img
                    src={camp.mediaGallery[selectedMediaIndex]}
                    alt={`${camp.name} - Gallery image ${selectedMediaIndex + 1}`}
                    className="max-w-full max-h-[85vh] rounded-lg object-contain"
                  />
                ) : (
                  <div className="relative w-full h-[85vh]">
                    <Image
                      src={camp.mediaGallery[selectedMediaIndex]}
                      alt={`${camp.name} - Gallery image ${selectedMediaIndex + 1}`}
                      fill
                      className="object-contain rounded-lg"
                      sizes="90vw"
                    />
                  </div>
                )}
                
                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {selectedMediaIndex + 1} / {camp.mediaGallery.length}
                </div>
              </div>

              {/* Next button */}
              {camp.mediaGallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextMedia()
                  }}
                  className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                  aria-label="Next"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
