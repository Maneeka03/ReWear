"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Search, Eye, Check, X, AlertTriangle, Users, Package, Flag, TrendingUp } from "lucide-react"
import Image from "next/image"

const mockPendingItems = [
  {
    id: 1,
    title: "Designer Handbag",
    category: "Accessories",
    uploader: "Jane Smith",
    dateSubmitted: "2024-01-15",
    status: "pending",
    flagged: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Vintage Band T-Shirt",
    category: "Tops",
    uploader: "Mike Johnson",
    dateSubmitted: "2024-01-14",
    status: "pending",
    flagged: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "Running Shoes",
    category: "Footwear",
    uploader: "Sarah Wilson",
    dateSubmitted: "2024-01-13",
    status: "pending",
    flagged: false,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const mockReportedItems = [
  {
    id: 4,
    title: "Fake Designer Jacket",
    category: "Outerwear",
    uploader: "Unknown User",
    reportReason: "Counterfeit item",
    reportCount: 3,
    dateReported: "2024-01-12",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    title: "Inappropriate Content",
    category: "Tops",
    uploader: "Spam Account",
    reportReason: "Inappropriate images",
    reportCount: 5,
    dateReported: "2024-01-11",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const mockStats = {
  totalUsers: 1247,
  activeItems: 3456,
  pendingReviews: 23,
  totalSwaps: 2891,
  flaggedItems: 12,
  monthlyGrowth: 15.3,
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleApproveItem = (itemId: number) => {
    console.log("Approving item:", itemId)
    // Handle approval logic
  }

  const handleRejectItem = (itemId: number) => {
    console.log("Rejecting item:", itemId)
    // Handle rejection logic
  }

  const handleRemoveItem = (itemId: number) => {
    console.log("Removing item:", itemId)
    // Handle removal logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">ReWear Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-red-600 border-red-600">
              Admin Panel
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending">Pending Items</TabsTrigger>
            <TabsTrigger value="reported">Reported Items</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{mockStats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.activeItems.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Items available for swap</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.pendingReviews}</div>
                  <p className="text-xs text-muted-foreground">Require admin approval</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalSwaps.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Successful exchanges</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest admin actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Item approved: "Vintage Denim Jacket"</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Item removed: "Counterfeit Bag"</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">User reported: Multiple spam listings</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Pending Item Reviews</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="flagged">Flagged Only</SelectItem>
                    <SelectItem value="normal">Normal Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6">
              {mockPendingItems.map((item) => (
                <Card key={item.id} className={item.flagged ? "border-red-200 bg-red-50" : ""}>
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
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          {item.flagged && (
                            <Badge variant="destructive" className="flex items-center space-x-1">
                              <Flag className="h-3 w-3" />
                              <span>Flagged</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{item.category}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Uploaded by: {item.uploader}</span>
                          <span>Date: {item.dateSubmitted}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveItem(item.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleRejectItem(item.id)}>
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reported" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Reported Items</h2>
              <Badge variant="destructive">{mockReportedItems.length} items need attention</Badge>
            </div>

            <div className="grid gap-6">
              {mockReportedItems.map((item) => (
                <Card key={item.id} className="border-red-200 bg-red-50">
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
                        <p className="text-gray-600">{item.category}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="text-gray-500">Uploaded by: {item.uploader}</span>
                          <Badge variant="destructive">{item.reportCount} reports</Badge>
                        </div>
                        <p className="text-sm text-red-600 mt-2">
                          <strong>Reason:</strong> {item.reportReason}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Reported: {item.dateReported}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.id)}>
                          <X className="h-4 w-4 mr-2" />
                          Remove Item
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex space-x-4">
                <Input placeholder="Search users..." className="w-64" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="new">New Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">1,247</div>
                    <div className="text-sm text-gray-600">Total Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">892</div>
                    <div className="text-sm text-gray-600">Active This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">23</div>
                    <div className="text-sm text-gray-600">New This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">5</div>
                    <div className="text-sm text-gray-600">Suspended</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-600">Listed 3 new items</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mike Chen</p>
                      <p className="text-sm text-gray-600">Completed 2 swaps</p>
                    </div>
                    <span className="text-sm text-gray-500">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Emma Wilson</p>
                      <p className="text-sm text-gray-600">Joined the platform</p>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
