"use client"

import { useState } from "react"
import { useCampStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function CreateCamp() {
  const router = useRouter()
  const addCamp = useCampStore((state) => state.addCamp)
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    price: "",
    category: "adventure",
    imageUrl: "",
    ageRange: "",
    capacity: "",
  })

  const [imagePreview, setImagePreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        setFormData((prev) => ({
          ...prev,
          imageUrl: base64String,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      addCamp({
        name: formData.name,
        description: formData.description,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
        ageRange: formData.ageRange,
        capacity: parseInt(formData.capacity),
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        price: "",
        category: "adventure",
        imageUrl: "",
        ageRange: "",
        capacity: "",
      })
      setImagePreview("")

      // Redirect to browse page
      router.push("/browse")
    } catch (error) {
      console.error("Error creating camp:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-[#001220] py-12 px-4" style={{ fontFamily: 'Caveat, cursive' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-bold text-white mb-2">Create a Camp</h1>
            <p className="text-2xl text-white/80">Share your amazing camp with families</p>
          </div>
          <Link href="/">
            <Button variant="outline" size="lg">
              ← Back Home
            </Button>
          </Link>
        </div>

        <Card className="bg-white/95 border-[#ff0088] border-2">
          <CardHeader>
            <CardTitle className="text-4xl text-[#001220]">Camp Details</CardTitle>
            <CardDescription className="text-xl text-gray-600">
              Fill in the information about your camp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xl text-[#001220]">
                  Camp Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Summer Adventure Camp"
                  required
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xl text-[#001220]">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what makes your camp special..."
                  required
                  rows={6}
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xl text-[#001220]">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-xl text-[#001220]">
                    Category *
                  </Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#ff0088] focus:border-transparent"
                  >
                    <option value="adventure">Adventure</option>
                    <option value="sports">Sports</option>
                    <option value="arts">Arts & Crafts</option>
                    <option value="stem">STEM</option>
                    <option value="nature">Nature</option>
                    <option value="music">Music</option>
                    <option value="dance">Dance</option>
                    <option value="academic">Academic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-xl text-[#001220]">
                    Start Date *
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-xl text-[#001220]">
                    End Date *
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-xl text-[#001220]">
                    Price ($) *
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="299.99"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-xl text-[#001220]">
                    Capacity *
                  </Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="20"
                    required
                    className="text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ageRange" className="text-xl text-[#001220]">
                  Age Range *
                </Label>
                <Input
                  id="ageRange"
                  name="ageRange"
                  value={formData.ageRange}
                  onChange={handleChange}
                  placeholder="e.g., 8-12 years"
                  required
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUpload" className="text-xl text-[#001220]">
                  Upload Camp Image
                </Label>
                <div className="space-y-4">
                  <Input
                    id="imageUpload"
                    name="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-lg cursor-pointer"
                  />
                  <p className="text-sm text-gray-500">
                    Upload an image (max 5MB) or enter a URL below
                  </p>
                  
                  {imagePreview && (
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border-2 border-[#ff0088]">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImagePreview("")
                          setFormData((prev) => ({ ...prev, imageUrl: "" }))
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-xl text-[#001220]">
                  Or Enter Image URL
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={imagePreview ? "" : formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/camp-image.jpg"
                  className="text-lg"
                  disabled={!!imagePreview}
                />
                <p className="text-sm text-gray-500">
                  Leave blank to use a default image
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="flex-1 text-xl py-6"
                >
                  {isSubmitting ? "Creating..." : "Create Camp"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.push("/browse")}
                  className="text-xl py-6"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}