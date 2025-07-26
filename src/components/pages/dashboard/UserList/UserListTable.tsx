/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllUserQuery } from "@/redux/features/dashboardAndUser/dashboardAndUserApi";
import { formatName } from "@/utils/formatName";
import { ConfigProvider, Pagination } from "antd";
import { useEffect, useState } from "react";

export default function UserListTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: string | number }[]
  >([]);

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // Initialize query
  useEffect(() => {
    setObjectQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ]);
  }, [page, pageSize]);
  const { data, isLoading, isFetching } = useGetAllUserQuery(objectQuery, {
      skip: !objectQuery.length,
  });

  if (isLoading || isFetching) {
    return (
      <div className="h-full min-h-[calc(100vh-280px)] flex justify-center items-center">
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="md:p-4 bg-[#F9F9FB] my-4 md:border border-[#D9D9D9] rounded h-full overflow-hidden overflow-y-auto">
      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">All User List</h2>
        </div>

        {/* Table */}
        <div className="overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Service Branch
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.result?.data.map((user: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatName(user?.Profile?.branch) || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-6">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00473E", // Custom primary color
              colorBgContainer: "white", // Custom background color
            },
          }}
        >
          <div className="flex justify-center mt-6">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={data?.result?.meta?.total || 0}
              onChange={handlePaginationChange}
              className="custom-pagination"
            />
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
}
