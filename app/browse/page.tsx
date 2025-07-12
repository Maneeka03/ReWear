"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, Heart, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import denim from "../../public/denim.jpeg";
import blouse from "../../public/blouse.jpeg";
import shoes2 from "../../public/Shoes2.webp";
import wool from "../../public/wool.webp";
import dress from "../../public/dress.webp";
import bag from "../../public/bag.jpeg";
import winter from "../../public/winter.jpg";
import Business2 from "../../public/Business2.jpg";

const mockItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Good",
    size: "M",
    points: 25,
    image: denim,
    uploader: "Sarah M.",
    location: "New York",
    tags: ["vintage", "denim", "casual"],
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    category: "Tops",
    condition: "Excellent",
    size: "S",
    points: 35,
    image: blouse,
    uploader: "Emma K.",
    location: "Los Angeles",
    tags: ["designer", "silk", "formal"],
  },
  {
    id: 3,
    title: "Athletic Running Shoes",
    category: "Footwear",
    condition: "Like New",
    size: "9",
    points: 40,
    image: shoes2,
    uploader: "Mike R.",
    location: "Chicago",
    tags: ["athletic", "running", "nike"],
  },
  {
    id: 4,
    title: "Wool Winter Coat",
    category: "Outerwear",
    condition: "Good",
    size: "L",
    points: 50,
    image: wool,
    uploader: "Lisa T.",
    location: "Boston",
    tags: ["wool", "winter", "warm"],
  },
  {
    id: 5,
    title: "Summer Floral Dress",
    category: "Dresses",
    condition: "Excellent",
    size: "M",
    points: 30,
    image: dress,
    uploader: "Anna S.",
    location: "Miami",
    tags: ["summer", "floral", "casual"],
  },
  {
    id: 6,
    title: "Leather Handbag",
    category: "Accessories",
    condition: "Good",
    size: "One Size",
    points: 45,
    image: bag,
    uploader: "Rachel P.",
    location: "Seattle",
    tags: ["leather", "handbag", "designer"],
  },
  {
    id: 7,
    title: "Leather Handbag",
    category: "Outerwear",
    condition: "Good",
    size: "M",
    points: 45,
    image: winter,
    uploader: "Rachel P.",
    location: "Seattle",
    tags: ["leather", "handbag", "designer"],
  },
  {
    id: 8,
    title: "Leather Handbag",
    category: "Outerwear",
    condition: "Good",
    size: "L",
    points: 45,
    image: Business2,
    uploader: "Rachel P.",
    location: "Seattle",
    tags: ["leather", "handbag", "designer"],
  },
];

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "all",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Dresses",
    "Footwear",
    "Accessories",
  ];
  const conditions = ["all", "Like New", "Excellent", "Good", "Fair"];

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesCondition =
      selectedCondition === "all" || item.condition === selectedCondition;

    return matchesSearch && matchesCategory && matchesCondition;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">ReWear</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/add-item">
              <Button className="bg-green-600 hover:bg-green-700">
                Add Item
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-300 group-focus-within:text-green-600" />
              <Input
                placeholder="Search items, brands, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-300 focus:scale-105 focus:shadow-lg"
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40 transition-all duration-300 hover:scale-105 focus:scale-105">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="transition-colors duration-200 hover:bg-green-50"
                    >
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedCondition}
                onValueChange={setSelectedCondition}
              >
                <SelectTrigger className="w-40 transition-all duration-300 hover:scale-105 focus:scale-105">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem
                      key={condition}
                      value={condition}
                      className="transition-colors duration-200 hover:bg-green-50"
                    >
                      {condition === "all" ? "All Conditions" : condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 transition-all duration-300 hover:scale-105 focus:scale-105">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="newest"
                    className="transition-colors duration-200 hover:bg-green-50"
                  >
                    Newest First
                  </SelectItem>
                  <SelectItem
                    value="points-low"
                    className="transition-colors duration-200 hover:bg-green-50"
                  >
                    Points: Low to High
                  </SelectItem>
                  <SelectItem
                    value="points-high"
                    className="transition-colors duration-200 hover:bg-green-50"
                  >
                    Points: High to Low
                  </SelectItem>
                  <SelectItem
                    value="popular"
                    className="transition-colors duration-200 hover:bg-green-50"
                  >
                    Most Popular
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-50"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Size</Label>
                  <div className="space-y-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox id={`size-${size}`} />
                        <Label htmlFor={`size-${size}`} className="text-sm">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Points Range
                  </Label>
                  <div className="space-y-2">
                    {["0-20", "21-40", "41-60", "60+"].map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox id={`points-${range}`} />
                        <Label htmlFor={`points-${range}`} className="text-sm">
                          {range}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Location
                  </Label>
                  <div className="space-y-2">
                    {["New York", "Los Angeles", "Chicago", "Boston"].map(
                      (location) => (
                        <div
                          key={location}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`location-${location}`} />
                          <Label
                            htmlFor={`location-${location}`}
                            className="text-sm"
                          >
                            {location}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-3 block">Tags</Label>
                  <div className="space-y-2">
                    {["vintage", "designer", "casual", "formal"].map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox id={`tag-${tag}`} />
                        <Label htmlFor={`tag-${tag}`} className="text-sm">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Browse Items ({filteredItems.length} found)
          </h1>
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className="bg-green-600 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-green-700">
                    {item.points} pts
                  </Badge>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-red-100"
                  >
                    <Heart className="h-4 w-4 transition-colors duration-300 hover:text-red-500" />
                  </Button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-1 transition-colors duration-300 group-hover:text-green-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {item.category} • Size {item.size}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="text-xs transition-all duration-300 group-hover:border-green-600 group-hover:text-green-600"
                  >
                    {item.condition}
                  </Badge>
                  <span className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                    {item.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                    by {item.uploader}
                  </span>
                  <Link href={`/item/${item.id}`}>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Items
          </Button>
        </div>
      </div>
    </div>
  );
}
