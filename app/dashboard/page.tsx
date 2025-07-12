"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Package,
  ArrowUpDown,
  Plus,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mockUser = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  points: 125,
  totalSwaps: 18,
  rating: 4.8,
  joinDate: "March 2024",
};

const mockSwaps = [
  {
    id: 1,
    type: "outgoing",
    item: "Vintage Denim Jacket",
    partner: "Emma Wilson",
    status: "pending",
    date: "2024-01-15",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    type: "incoming",
    item: "Wool Winter Coat",
    partner: "Mike Chen",
    status: "completed",
    date: "2024-01-10",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    type: "outgoing",
    item: "Summer Dress",
    partner: "Lisa Park",
    status: "in_progress",
    date: "2024-01-12",
    image: "/placeholder.svg?height=60&width=60",
  },
];

export default function DashboardPage() {
  const [items, setItems] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [swaps, setSwaps] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userItems") || "[]");
    if (stored.length > 0) {
      setItems(stored);
    }
  }, []);
  useEffect(() => {
    const storedSwaps = JSON.parse(
      localStorage.getItem("swapRequests") || "[]"
    );
    setSwaps(storedSwaps);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <ArrowUpDown className="h-4 w-4 text-blue-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "swapped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <Link href="/browse">
              <Button variant="ghost">Browse</Button>
            </Link>
            <Link href="/add-item">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </Link>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20 transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-2xl bg-green-100 text-green-600">
                SJ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold  text-green-600 transition-colors duration-300 hover:text-gray-900">
                {mockUser.name}
              </h1>
              <p className="text-gray-600 transition-colors duration-300 hover:text-gray-800">
                {mockUser.email}
              </p>
              <p className="text-sm text-gray-500 transition-colors duration-300 hover:text-gray-700">
                Member since {mockUser.joinDate}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="group transition-all duration-300 hover:scale-110">
                <div className="text-2xl font-bold text-green-600 transition-all duration-300 group-hover:text-3xl">
                  {mockUser.points}
                </div>
                <div className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                  Points
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-110">
                <div className="text-2xl font-bold text-blue-600 transition-all duration-300 group-hover:text-3xl">
                  {mockUser.totalSwaps}
                </div>
                <div className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                  Total Swaps
                </div>
              </div>
              <div className="group transition-all duration-300 hover:scale-110">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-2xl font-bold transition-all duration-300 group-hover:text-3xl">
                    {mockUser.rating}
                  </span>
                </div>
                <div className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium transition-colors duration-300 group-hover:text-green-600">
                    Active Items
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-green-600 group-hover:scale-110" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold transition-all duration-300 group-hover:text-3xl">
                    3
                  </div>
                  <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-gray-600">
                    +1 from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium transition-colors duration-300 group-hover:text-yellow-600">
                    Pending Swaps
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-yellow-600 group-hover:scale-110" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold transition-all duration-300 group-hover:text-3xl">
                    2
                  </div>
                  <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-gray-600">
                    Awaiting response
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600">
                    Total Views
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold transition-all duration-300 group-hover:text-3xl">
                    81
                  </div>
                  <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-gray-600">
                    Across all items
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium transition-colors duration-300 group-hover:text-purple-600">
                    Points Balance
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-purple-600 group-hover:scale-110" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold transition-all duration-300 group-hover:text-3xl">
                    {mockUser.points}
                  </div>
                  <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-gray-600">
                    Ready to spend
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest swaps and item updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSwaps.slice(0, 3).map((swap) => (
                    <div key={swap.id} className="flex items-center space-x-4">
                      <Image
                        src={swap.image || "/placeholder.svg"}
                        alt={swap.item}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {swap.type === "outgoing"
                            ? "Swap request sent"
                            : "Swap received"}{" "}
                          for {swap.item}
                        </p>
                        <p className="text-xs text-gray-500">
                          with {swap.partner}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(swap.status)}
                        <span className="text-xs text-gray-500">
                          {swap.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Items</h2>
              <Link href="/add-item">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>
            <div className="grid gap-6">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-600">
                          {item.category} • {item.condition}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {item.views} views
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {item.points} points
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-2xl font-bold">Swap History</h2>
            <div className="grid gap-6">
              {swaps.map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={swap.image || "/placeholder.svg"}
                        alt={swap.item}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{swap.item}</h3>
                        <p className="text-gray-600">
                          {swap.type === "outgoing"
                            ? "Swapping with"
                            : "Receiving from"}{" "}
                          {swap.partner}
                        </p>
                        <p className="text-sm text-gray-500">{swap.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(swap.status)}
                        <Badge variant="outline">{swap.status}</Badge>
                      </div>
                      <Link href={`/item/[id]${swap.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
