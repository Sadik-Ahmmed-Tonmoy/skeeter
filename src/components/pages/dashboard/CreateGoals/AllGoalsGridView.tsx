/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteGoalMutation,
  useGetAllGoalsQuery,
} from "@/redux/features/Goal/goalApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Pagination } from "antd";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllGoalsGridView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
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

  const { data, isLoading, isFetching } = useGetAllGoalsQuery(objectQuery, {
    skip: !objectQuery.length,
  });
  const [deleteGoalMutation] = useDeleteGoalMutation();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await handleAsyncWithToast(async () => {
        return deleteGoalMutation(id);
      }, "Deleting goal...");

      if (response?.data?.success) {
        setPage(1);
        Swal.fire("Deleted!", "Your goal has been deleted.", "success");
      }
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="h-full min-h-[calc(100vh-280px)] flex justify-center items-center">
        <p>Loading goals...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Goals Grid */}
      {data?.result?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-8">
          {data?.result?.data?.map((goal: any) => (
            <div
              key={goal.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Image
                  src={goal?.goalImage}
                  alt={goal.title}
                  width={200}
                  height={200}
                  className="w-full h-44 object-fill"
                  // unoptimized
                  blurDataURL={goal?.goalImage}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Link href={`/dashboard/goals/${goal.id}`}>
                    <button className="p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <Edit className="h-3 w-3 text-gray-600" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                  {goal.title}
                </h3>
                <p className="text-xs text-gray-500">{goal.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">No goals found</div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.result?.meta?.total || 0}
          onChange={handlePaginationChange}
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default AllGoalsGridView;
