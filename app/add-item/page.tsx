"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Package, Upload, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  "Tops",
  "Bottoms",
  "Outerwear",
  "Dresses",
  "Footwear",
  "Accessories",
];

const types = {
  Tops: ["T-Shirt", "Blouse", "Sweater", "Tank Top", "Hoodie"],
  Bottoms: ["Jeans", "Pants", "Shorts", "Skirt", "Leggings"],
  Outerwear: ["Jacket", "Coat", "Blazer", "Cardigan", "Vest"],
  Dresses: ["Casual Dress", "Formal Dress", "Maxi Dress", "Mini Dress"],
  Footwear: ["Sneakers", "Boots", "Heels", "Flats", "Sandals"],
  Accessories: ["Bag", "Hat", "Scarf", "Jewelry", "Belt"],
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const conditions = ["Like New", "Excellent", "Good", "Fair"];

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    points: 25,
  });
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Reset type when category changes
    if (field === "category") {
      setFormData((prev) => ({ ...prev, type: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 5 - images.length); // limit to 5 images
    const readers = fileArray.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file); // Read as base64
      });
    });

    Promise.all(readers).then((base64Images) => {
      setImages((prev) => [...prev, ...base64Images]);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (
      currentTag.trim() &&
      !tags.includes(currentTag.trim()) &&
      tags.length < 10
    ) {
      setTags((prev) => [...prev, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newItem = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      condition: formData.condition,
      points: formData.points,
      status: "active",
      views: 0,
      image: images.length > 0 ? images[0] : "/placeholder.svg",
    };

    const existing = JSON.parse(localStorage.getItem("userItems") || "[]");
    localStorage.setItem("userItems", JSON.stringify([...existing, newItem]));

    router.push("/dashboard?tab=items");
  };

  const calculatePoints = () => {
    let basePoints = 20;

    switch (formData.condition) {
      case "Like New":
        basePoints += 15;
        break;
      case "Excellent":
        basePoints += 10;
        break;
      case "Good":
        basePoints += 5;
        break;
      case "Fair":
        basePoints += 0;
        break;
    }

    // Adjust based on category
    if (["Outerwear", "Footwear"].includes(formData.category)) {
      basePoints += 10;
    }

    return basePoints;
  };

  // Update points when condition or category changes
  const suggestedPoints = calculatePoints();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">ReWear</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">List a New Item</CardTitle>
            <CardDescription>
              Add your unused clothing item to the ReWear community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium transition-colors duration-300 hover:text-green-600">
                  Photos (up to 5)
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-all duration-300 hover:scale-105 hover:bg-green-50 group">
                      <Upload className="h-8 w-8 text-gray-400 mb-2 transition-all duration-300 group-hover:text-green-500 group-hover:scale-110" />
                      <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-green-600">
                        Add Photo
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2 group">
                  <Label
                    htmlFor="title"
                    className="transition-colors duration-300 group-focus-within:text-green-600"
                  >
                    Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                    required
                  />
                </div>

                <div className="space-y-2 group">
                  <Label
                    htmlFor="description"
                    className="transition-colors duration-300 group-focus-within:text-green-600"
                  >
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the item's condition, style, fit, and any other relevant details..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                    required
                  />
                </div>
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                    disabled={!formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category &&
                        types[formData.category as keyof typeof types]?.map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          )
                        )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Size and Condition */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Size *</Label>
                  <Select
                    value={formData.size}
                    onValueChange={(value) => handleInputChange("size", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Condition *</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      handleInputChange("condition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Points */}
              <div className="space-y-2">
                <Label htmlFor="points">Points Value</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="points"
                    type="number"
                    min="10"
                    max="100"
                    value={formData.points}
                    onChange={(e) =>
                      handleInputChange(
                        "points",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    className="w-32"
                  />
                  <span className="text-sm text-gray-600">
                    Suggested: {suggestedPoints} points
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("points", suggestedPoints)}
                  >
                    Use Suggested
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <Label>Tags (optional)</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    disabled={!currentTag.trim()}
                  >
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  disabled={
                    isSubmitting ||
                    !formData.title ||
                    !formData.description ||
                    !formData.category ||
                    !formData.type ||
                    !formData.size ||
                    !formData.condition
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Listing Item...
                    </span>
                  ) : (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      List Item
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
