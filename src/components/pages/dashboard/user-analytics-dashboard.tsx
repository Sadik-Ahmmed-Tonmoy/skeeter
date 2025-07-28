"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { ChevronDown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetAllDashboardDataQuery } from "@/redux/features/dashboardAndUser/dashboardAndUserApi"


export function UserAnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"monthly" | "yearly">("monthly")
  const [objectQuery, setObjectQuery] = useState<{ name: string; value: string }[]>([])

  // Initialize query
  useEffect(() => {
    setObjectQuery([
      { name: "type", value: selectedPeriod },
    ])
  }, [selectedPeriod])

  const { data, isLoading, isFetching } = useGetAllDashboardDataQuery(objectQuery, {
    skip: !objectQuery.length,
  })

  // Calculate growth percentage based on data
  const calculateGrowthPercentage = () => {
    if (!data?.result?.userData?.length) return 0
    
    const userData = data.result.userData
    if (userData.length < 2) return 0
    
    const currentPeriod = userData[userData.length - 1].users
    const previousPeriod = userData[userData.length - 2].users
    
    if (previousPeriod === 0) return currentPeriod > 0 ? 100 : 0
    
    return ((currentPeriod - previousPeriod) / previousPeriod) * 100
  }

  const growthPercentage = calculateGrowthPercentage()
  const totalUsers = data?.result?.totalUserCount || 0

  // Get the correct data key based on period
  const dataKey = selectedPeriod === "monthly" ? "day" : "month"

  // Calculate max value for YAxis domain
  interface UserDataItem {
    day?: string
    month?: string
    users: number
  }





  const maxValue: number = data?.result?.userData 
    ? Math.max(...data.result.userData.map((item: UserDataItem) => item.users)) * 1.2 
    : 10

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
          <div className="space-y-1 w-40">
            <p className="text-sm text-gray-600">Total User</p>
            {isLoading || isFetching ? (
              // <Skeleton className="h-8 w-20" />
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded" />
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</span>
                {growthPercentage !== 0 && (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    growthPercentage >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {growthPercentage >= 0 ? '↑' : '↓'}{Math.abs(growthPercentage).toFixed(2)}%
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Chart Card */}
      <Card>
        <CardHeader className="border-b ">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium text-gray-900">User Analytics</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {selectedPeriod === "monthly" ? "Monthly" : "Yearly"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={() => setSelectedPeriod("monthly")}>Monthly</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("yearly")}>Yearly</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Stats Summary */}
            {isLoading || isFetching ? (
              // <Skeleton className="h-8 w-40" />
              <div className="h-8 w-40 bg-gray-200 animate-pulse rounded" />
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</span>
                {growthPercentage !== 0 && (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    growthPercentage >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {growthPercentage >= 0 ? '↑' : '↓'}{Math.abs(growthPercentage).toFixed(2)}%
                  </span>
                )}
              </div>
            )}

            {/* Chart */}
            <div className="h-80">
              {isLoading || isFetching ? (
                // <Skeleton className="h-full w-full" />
                <div className="h-full w-full bg-gray-200 animate-pulse rounded" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={data?.result?.userData} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey={dataKey} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: "#666" }} 
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                      domain={[0, maxValue]}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#374151"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5, fill: "#374151" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}