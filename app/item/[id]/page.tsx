"use client";

import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Coins,
  Heart,
  MapPin,
  MessageCircle,
  Package,
  Share2,
  Star,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";

import denim from "../../../public/denim.jpeg";
import blouse from "../../../public/blouse.jpeg";
import shoes2 from "../../../public/Shoes2.webp";
import wool from "../../../public/wool.webp";
import dress from "../../../public/dress.webp";
import bag from "../../../public/bag.jpeg";
import winter from "../../../public/winter.jpg";
import Business2 from "../../../public/Business2.jpg";

export const mockItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Good",
    size: "M",
    points: 25,
    image: denim,
    uploader: {
      name: "Sarah M.",
      avatar: "/placeholder-user.jpg",
      rating: 4.8,
      totalSwaps: 23,
      joinDate: "March 2023",
      location: "New York",
    },
    tags: ["vintage", "denim", "casual"],
    description: "Classic vintage denim jacket from the 90s.",
    datePosted: "2024-01-10",
    availability: "available",
    likes: 12,
    views: 47,
    images: [denim],
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    category: "Tops",
    condition: "Excellent",
    size: "S",
    points: 35,
    image: blouse,
    uploader: {
      name: "Emma K.",
      avatar: "/placeholder-user.jpg",
      rating: 4.7,
      totalSwaps: 15,
      joinDate: "May 2023",
      location: "Los Angeles",
    },
    tags: ["designer", "silk", "formal"],
    description: "Elegant silk blouse perfect for formal occasions.",
    datePosted: "2024-01-12",
    availability: "available",
    likes: 20,
    views: 62,
    images: [blouse],
  },
  {
    id: 3,
    title: "Athletic Running Shoes",
    category: "Footwear",
    condition: "Like New",
    size: "9",
    points: 40,
    image: shoes2,
    uploader: {
      name: "Mike R.",
      avatar: "/placeholder-user.jpg",
      rating: 4.9,
      totalSwaps: 12,
      joinDate: "Feb 2023",
      location: "Chicago",
    },
    tags: ["athletic", "running", "nike"],
    description: "High-performance Nike running shoes in excellent condition.",
    datePosted: "2024-01-15",
    availability: "available",
    likes: 18,
    views: 51,
    images: [shoes2],
  },
  {
    id: 4,
    title: "Wool Winter Coat",
    category: "Outerwear",
    condition: "Good",
    size: "L",
    points: 50,
    image: wool,
    uploader: {
      name: "Lisa T.",
      avatar: "/placeholder-user.jpg",
      rating: 4.6,
      totalSwaps: 20,
      joinDate: "Jan 2023",
      location: "Boston",
    },
    tags: ["wool", "winter", "warm"],
    description: "Cozy wool coat perfect for cold winters.",
    datePosted: "2024-01-17",
    availability: "available",
    likes: 15,
    views: 60,
    images: [wool],
  },
  {
    id: 5,
    title: "Summer Floral Dress",
    category: "Dresses",
    condition: "Excellent",
    size: "M",
    points: 30,
    image: dress,
    uploader: {
      name: "Anna S.",
      avatar: "/placeholder-user.jpg",
      rating: 4.5,
      totalSwaps: 18,
      joinDate: "Mar 2023",
      location: "Miami",
    },
    tags: ["summer", "floral", "casual"],
    description: "Light and breezy floral dress ideal for summer days.",
    datePosted: "2024-01-20",
    availability: "available",
    likes: 22,
    views: 74,
    images: [dress],
  },
  {
    id: 6,
    title: "Leather Handbag",
    category: "Accessories",
    condition: "Good",
    size: "One Size",
    points: 45,
    image: bag,
    uploader: {
      name: "Rachel P.",
      avatar: "/placeholder-user.jpg",
      rating: 4.4,
      totalSwaps: 10,
      joinDate: "April 2023",
      location: "Seattle",
    },
    tags: ["leather", "handbag", "designer"],
    description: "Stylish leather handbag from a premium brand.",
    datePosted: "2024-01-22",
    availability: "available",
    likes: 17,
    views: 48,
    images: [bag],
  },
  {
    id: 7,
    title: "Winter Leather Jacket",
    category: "Outerwear",
    condition: "Good",
    size: "M",
    points: 45,
    image: winter,
    uploader: {
      name: "Rachel P.",
      avatar: "/placeholder-user.jpg",
      rating: 4.4,
      totalSwaps: 10,
      joinDate: "April 2023",
      location: "Seattle",
    },
    tags: ["leather", "handbag", "designer"],
    description: "Warm leather jacket for chilly winter days.",
    datePosted: "2024-01-25",
    availability: "available",
    likes: 19,
    views: 55,
    images: [winter],
  },
  {
    id: 8,
    title: "Business Casual Jacket",
    category: "Outerwear",
    condition: "Good",
    size: "L",
    points: 45,
    image: Business2,
    uploader: {
      name: "Rachel P.",
      avatar: "/placeholder-user.jpg",
      rating: 4.4,
      totalSwaps: 10,
      joinDate: "April 2023",
      location: "Seattle",
    },
    tags: ["leather", "handbag", "designer"],
    description: "Perfect jacket for business casual meetings and events.",
    datePosted: "2024-01-27",
    availability: "available",
    likes: 14,
    views: 50,
    images: [Business2],
  },
];

export default function ItemDetailPage() {
  const { id } = useParams();
  const itemId = Number(id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const item = mockItems.find((item) => item.id === itemId);

  if (!item) return notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [swapMessage, setSwapMessage] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const handleSwapRequest = () => {
    if (!swapMessage.trim()) {
      alert("Please enter a message before sending the swap request.");
      return;
    }

    const swapRequest = {
      id: Date.now(),
      type: "outgoing",
      item: item.title,
      partner: item.uploader.name,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      message: swapMessage,
      image: item.images[0] || "/placeholder.svg",
    };

    const existing = JSON.parse(localStorage.getItem("swapRequests") || "[]");
    localStorage.setItem(
      "swapRequests",
      JSON.stringify([...existing, swapRequest])
    );

    setSwapMessage("");
    setIsSubmitted(true);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (snackbarOpen) {
      const timer = setTimeout(() => setSnackbarOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbarOpen]);

  const handlePointsRedeem = () => {
    console.log("Redeeming item with points");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/browse">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">ReWear</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`transition-all duration-300 hover:scale-110 ${
                isLiked ? "text-red-500 bg-red-50" : "hover:bg-red-50"
              }`}
            >
              <Heart
                className={`h-4 w-4 mr-2 transition-all duration-300 ${
                  isLiked ? "fill-current scale-110" : ""
                }`}
              />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="transition-all duration-300 hover:scale-110 hover:bg-blue-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image Container - smaller size */}
            <div className="relative w-full max-w-[800px] h-[700px] bg-white rounded-lg overflow-hidden group">
              <Image
                src={item.images[selectedImage]}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                {item.points} points
              </Badge>
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <p className="text-gray-600">{item.description}</p>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{item.category}</span>
              <span>•</span>
              <span>Size {item.size}</span>
              <span>•</span>
              <span>{item.views} views</span>
            </div>

            <Badge
              variant="outline"
              className="text-green-600 border-green-600"
            >
              {item.condition}
            </Badge>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Uploader Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={item.uploader.avatar} />
                    <AvatarFallback>
                      {item.uploader.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.uploader.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{item.uploader.rating}</span>
                      </div>
                      <span>{item.uploader.totalSwaps} swaps</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.uploader.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Swap and Redeem Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowUpDown className="h-5 w-5 text-blue-600" />
                  <span>Request a Swap</span>
                </CardTitle>
                <CardDescription>Propose an item for swapping</CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <Button
                    disabled
                    className="w-full bg-gray-200 text-gray-600 cursor-not-allowed"
                  >
                    Request Submitted
                  </Button>
                ) : (
                  <>
                    <Textarea
                      placeholder="Write a message to the owner..."
                      value={swapMessage}
                      onChange={(e) => setSwapMessage(e.target.value)}
                    />
                    <Button
                      onClick={handleSwapRequest}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Send Swap Request
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="h-5 w-5 text-green-600" />
                  <span>Redeem with Points</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Cost: {item.points} points</p>
                <Button
                  onClick={handlePointsRedeem}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Redeem Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
