"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Recycle,
  Users,
  Leaf,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Business from "../public/business-suit.jpeg";
import Business2 from "../public/Business2.jpg";
import shoes from "../public/shoes.webp";
import winter from "../public/winter.jpg";
import luxury from "../public/luxury.jpg";
import denim from "../public/denim.jpeg";
import blouse from "../public/blouse.jpeg";
import shoes2 from "../public/Shoes2.webp";
import wool from "../public/wool.webp";

const featuredItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Good",
    points: 25,
    image: denim,
    uploader: "Sarah M.",
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    category: "Tops",
    condition: "Excellent",
    points: 35,
    image: blouse,
    uploader: "Emma K.",
  },
  {
    id: 3,
    title: "Athletic Running Shoes",
    category: "Footwear",
    condition: "Like New",
    points: 40,
    image: shoes2,
    uploader: "Mike R.",
  },
  {
    id: 4,
    title: "Wool Winter Coat",
    category: "Outerwear",
    condition: "Good",
    points: 50,
    image: wool,
    uploader: "Lisa T.",
  },
];

const carouselImages = [
  {
    id: 1,
    image: Business,
    title: "Executive Suits",
    category: "Professional Wear",
    featured: true,
  },
  {
    id: 2,
    image: Business2,
    title: "Designer Dresses",
    category: "Formal Wear",
    featured: false,
  },
  {
    id: 3,
    image: luxury,
    title: "Luxury Accessories",
    category: "Accessories",
    featured: true,
  },

  //   id: 4,
  //   image: winter,
  //   title: "Business Casual",
  //   category: "Smart Casual",
  //   featured: false,
  // },
  {
    id: 4,
    image: shoes,
    title: "Premium Footwear",
    category: "Shoes",
    featured: true,
  },
  {
    id: 5,
    image: winter,
    title: "Winter Collection",
    category: "Outerwear",
    featured: false,
  },
];

const mainHeadlines = [
  "Professional Fashion Exchange",
  "Executive Wardrobe Network",
  "Premium Clothing Marketplace",
  "Corporate Style Exchange",
  "Business Fashion Hub",
  "Professional Closet Network",
  "Executive Style Trading",
  "Corporate Wardrobe Solutions",
  "Professional Fashion Circle",
  "Business Attire Exchange",
  "Executive Clothing Network",
  "Corporate Style Marketplace",
];

const subTaglines = [
  "Sustainable Wardrobe Solutions",
  "Quality Pre-Owned Fashion",
  "Circular Fashion Marketplace",
  "Eco-Conscious Style Hub",
  "Premium Clothing Exchange",
  "Sustainable Fashion Network",
  "Professional Style Trading",
  "Quality Fashion Reimagined",
  "Conscious Clothing Community",
  "Sustainable Style Exchange",
  "Professional Fashion Circle",
  "Executive Sustainability Hub",
];

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMainHeadline, setCurrentMainHeadline] = useState(0);
  const [currentSubTagline, setCurrentSubTagline] = useState(0);
  const [mainHeadlineVisible, setMainHeadlineVisible] = useState(true);
  const [subTaglineVisible, setSubTaglineVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Main headline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setMainHeadlineVisible(false);
      setTimeout(() => {
        setCurrentMainHeadline((prev) => (prev + 1) % mainHeadlines.length);
        setMainHeadlineVisible(true);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Sub tagline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSubTaglineVisible(false);
      setTimeout(() => {
        setCurrentSubTagline((prev) => (prev + 1) % subTaglines.length);
        setSubTaglineVisible(true);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Carousel auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="p-2 bg-emerald-600 rounded-lg transition-transform duration-300 group-hover:rotate-12">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-emerald-600">
              ReWear
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/browse"
              className="text-slate-600 hover:text-emerald-600 transition-all duration-300 font-medium relative group text-sm lg:text-base"
            >
              Browse Items
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/how-it-works"
              className="text-slate-600 hover:text-emerald-600 transition-all duration-300 font-medium relative group text-sm lg:text-base"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-emerald-600 transition-all duration-300 font-medium relative group text-sm lg:text-base"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="transition-all duration-300 hover:bg-slate-100 text-slate-700 font-medium text-sm sm:text-base px-3 sm:px-4"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-lg text-white font-medium text-sm sm:text-base px-3 sm:px-4"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Responsive Layout */}
      <section className="py-6 sm:py-8 lg:py-12 px-4 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23059669' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 pl-5 mb-[100px]">
              <div className="space-y-2 sm:space-y-4 mb-{200}">
                <div className="h-16 sm:h-20 md:h-24 lg:h-32 flex items-center">
                  <h1
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 transition-all duration-600 leading-tight ${
                      mainHeadlineVisible && isVisible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                    }`}
                  >
                    {mainHeadlines[currentMainHeadline]
                      .split(" ")
                      .map((word, index) => (
                        <span
                          key={index}
                          className={
                            index ===
                            mainHeadlines[currentMainHeadline].split(" ")
                              .length -
                              1
                              ? "block text-emerald-600 mt-1 sm:mt-2"
                              : ""
                          }
                        >
                          {word}
                          {index <
                          mainHeadlines[currentMainHeadline].split(" ").length -
                            1
                            ? " "
                            : ""}
                        </span>
                      ))}
                  </h1>
                </div>

                {/* Animated Sub Taglines */}
                <div className="h-6 sm:h-8 flex items-center">
                  <p
                    className={`text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-600 transition-all duration-500 ${
                      subTaglineVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {subTaglines[currentSubTagline]}
                  </p>
                </div>
              </div>

              <p
                className={`text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Connect with professionals who value quality fashion. Exchange
                premium clothing items, build sustainable wardrobes, and join a
                community committed to reducing fashion waste through
                intelligent consumption.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl text-white font-medium"
                  >
                    Start Trading
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link href="/browse" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105 font-medium bg-transparent"
                  >
                    Browse Collection
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Responsive Image Carousel */}
            <div className="relative order-1 lg:order-2">
              {/* Main Carousel Container */}
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100">
                {/* Main Image Display */}
                <div className="relative h-full">
                  {carouselImages.map((item, index) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentImageIndex
                          ? "opacity-100 scale-100 translate-x-0"
                          : index < currentImageIndex
                          ? "opacity-0 scale-95 -translate-x-full"
                          : "opacity-0 scale-95 translate-x-full"
                      }`}
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      {/* Overlay with item info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 text-white">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm sm:text-base lg:text-lg opacity-90">
                            {item.category}
                          </p>
                          {item.featured && (
                            <Badge className="mt-1 sm:mt-2 bg-emerald-600 text-white border-0 text-xs sm:text-sm">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center mt-3 sm:mt-4 lg:mt-6 space-x-2 sm:space-x-3">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-emerald-600 scale-125"
                        : "bg-slate-300 hover:bg-slate-400 hover:scale-110"
                    }`}
                  />
                ))}
              </div>

              {/* Side Thumbnails - Hidden on mobile and tablet */}
              {/* <div className="absolute -right-16 xl:-right-20 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col space-y-3 lg:space-y-4">
                {carouselImages.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => goToImage(index)}
                    className={`w-12 h-15 lg:w-16 lg:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentImageIndex
                        ? "ring-2 ring-emerald-600 scale-110"
                        : "opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={64}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div> */}

              {/* Progress Bar */}
              {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{
                    width: `${
                      ((currentImageIndex + 1) / carouselImages.length) * 100
                    }%`,
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Why Choose ReWear
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Professional-grade platform designed for quality-conscious
              individuals
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div className="text-center group transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-emerald-700 group-hover:scale-110 shadow-lg">
                <Recycle className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-emerald-600">
                Sustainable Impact
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Reduce environmental impact through intelligent clothing
                circulation. Every exchange contributes to a more sustainable
                fashion ecosystem.
              </p>
            </div>
            <div className="text-center group transition-all duration-500 hover:scale-105 delay-100">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-slate-800 group-hover:scale-110 shadow-lg">
                <Users className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-slate-700">
                Professional Network
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Connect with like-minded professionals who appreciate quality
                fashion and sustainable practices in their lifestyle choices.
              </p>
            </div>
            <div className="text-center group transition-all duration-500 hover:scale-105 delay-200 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-emerald-700 group-hover:scale-110 shadow-lg">
                <Leaf className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-emerald-600">
                Quality Assurance
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Curated marketplace ensuring high-quality items. Our point
                system rewards quality contributions and maintains platform
                standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">
                Featured Collection
              </h2>
              <p className="text-lg sm:text-xl text-slate-600">
                Discover quality pieces from our community
              </p>
            </div>
            <Link href="/browse">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105 font-medium bg-transparent"
              >
                View All Items
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group bg-white border-0 shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-emerald-600 text-white border-0 transition-all duration-300 group-hover:scale-110 font-medium text-xs sm:text-sm">
                    {item.points} pts
                  </Badge>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-emerald-600">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 mb-2 sm:mb-3 font-medium text-sm sm:text-base">
                    {item.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-slate-300 text-slate-700 transition-all duration-300 group-hover:border-emerald-600 group-hover:text-emerald-600 font-medium text-xs sm:text-sm"
                    >
                      {item.condition}
                    </Badge>
                    <span className="text-xs sm:text-sm text-slate-500 font-medium">
                      by {item.uploader}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Platform Impact
            </h2>
            <p className="text-lg sm:text-xl text-slate-300">
              Making a difference in sustainable fashion
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="transition-all duration-500 hover:scale-110 group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-emerald-400 transition-all duration-700 group-hover:text-4xl sm:group-hover:text-5xl lg:group-hover:text-6xl">
                2,500+
              </div>
              <div className="text-slate-300 text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 group-hover:text-white">
                Items Exchanged
              </div>
            </div>
            <div className="transition-all duration-500 hover:scale-110 group delay-100">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-emerald-400 transition-all duration-700 group-hover:text-4xl sm:group-hover:text-5xl lg:group-hover:text-6xl">
                1,200+
              </div>
              <div className="text-slate-300 text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 group-hover:text-white">
                Active Members
              </div>
            </div>
            <div className="transition-all duration-500 hover:scale-110 group delay-200">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-emerald-400 transition-all duration-700 group-hover:text-4xl sm:group-hover:text-5xl lg:group-hover:text-6xl">
                850kg
              </div>
              <div className="text-slate-300 text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 group-hover:text-white">
                Waste Prevented
              </div>
            </div>
            <div className="transition-all duration-500 hover:scale-110 group delay-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-emerald-400 transition-all duration-700 group-hover:text-4xl sm:group-hover:text-5xl lg:group-hover:text-6xl">
                4.8
              </div>
              <div className="text-slate-300 text-sm sm:text-base lg:text-lg font-medium flex items-center justify-center transition-colors duration-300 group-hover:text-white">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-1 sm:mr-2 fill-current text-emerald-400" />
                Platform Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Ready to Transform Your Wardrobe?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed">
              Join thousands of professionals making conscious fashion choices.
              Start building a sustainable wardrobe that reflects your values
              and style.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 transition-all duration-300 hover:scale-110 hover:shadow-2xl text-white font-medium"
              >
                Join ReWear Today
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="group sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="p-2 bg-emerald-600 rounded-lg transition-transform duration-300 group-hover:rotate-12">
                  <Recycle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white">
                  ReWear
                </span>
              </div>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                Professional fashion exchange platform committed to sustainable
                style and quality.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">
                Platform
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-slate-400">
                <li>
                  <Link
                    href="/browse"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link
                    href="/add-item"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    List an Item
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">
                Support
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-slate-400">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">
                Legal
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-slate-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-slate-400">
            <p className="text-sm sm:text-base lg:text-lg">
              &copy; 2024 ReWear. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
