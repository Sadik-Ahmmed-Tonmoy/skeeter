"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChevronDown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample data that matches the pattern in the image
const userData = [
  { day: 1, users: 2800 },
  { day: 2, users: 3200 },
  { day: 3, users: 3800 },
  { day: 4, users: 4200 },
  { day: 5, users: 5800 },
  { day: 6, users: 6200 },
  { day: 7, users: 6800 },
  { day: 8, users: 5200 },
  { day: 9, users: 4800 },
  { day: 10, users: 4200 },
  { day: 11, users: 4600 },
  { day: 12, users: 5200 },
  { day: 13, users: 5800 },
  { day: 14, users: 6400 },
  { day: 15, users: 7200 },
  { day: 16, users: 7800 },
  { day: 17, users: 8400 },
  { day: 18, users: 8800 },
  { day: 19, users: 9200 },
  { day: 20, users: 9800 },
  { day: 21, users: 10200 },
  { day: 22, users: 9800 },
  { day: 23, users: 9400 },
  { day: 24, users: 9000 },
  { day: 25, users: 8600 },
  { day: 26, users: 8200 },
  { day: 27, users: 7800 },
  { day: 28, users: 8200 },
  { day: 29, users: 8600 },
  { day: 30, users: 9200 },
  { day: 31, users: 10800 },
]

export function UserAnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Month")

  const totalUsers = 5670
  const growthPercentage = 1.32

  return (
    <div className="border border-[#747474] rounded space-y-6 m-4 p-4">
      {/* Summary Card */}
      <Card className="w-fit">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Total User</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ↑{growthPercentage}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chart Card */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium text-gray-900">Total User</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {selectedPeriod}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedPeriod("Week")}>Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Month")}>Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Quarter")}>Quarter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Year")}>Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ↑{growthPercentage}%
              </span>
            </div>

            {/* Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                    domain={[0, 20000]}
                    ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000]}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#374151"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#374151" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
