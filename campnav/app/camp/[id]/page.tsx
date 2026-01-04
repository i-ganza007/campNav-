"use client"

import { useCampStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function CampDetails() {
  const params = useParams()
  const id = params.id as string
  const getCampById = useCampStore((state) => state.getCampById)
  const camp = getCampById(id)

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
                    ${camp.price.toFixed(2)}
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

                <Button size="lg" className="w-full text-2xl py-6">
                  Enroll Now
                </Button>

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
                  <Button variant="outline" size="lg" className="w-full text-xl">
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
