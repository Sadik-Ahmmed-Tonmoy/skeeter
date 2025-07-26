/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
} from "@/redux/features/article/articleApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Pagination } from "antd";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ArticleGridView = () => {
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

  const { data, isLoading, isFetching } = useGetAllArticlesQuery(objectQuery, {
    skip: !objectQuery.length,
  });
  const [deleteArticleMutation] = useDeleteArticleMutation();

  const handleDelete = async (id: string) => {
    console.log(id);
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
        return deleteArticleMutation(id);
      }, "Deleting article...");

      if (response?.data?.success) {
        setPage(1);
        Swal.fire("Deleted!", "Your article has been deleted.", "success");
      }
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="h-full min-h-[calc(100vh-280px)] flex justify-center items-center">
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Articles Grid */}
      {data?.result?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-8">
          {data?.result?.data?.map((article: any) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Image
                  src={article?.articleImage}
                  alt={article.title}
                  width={200}
                  height={200}
                  className="w-full h-44 object-fill"
                  // unoptimized
                  blurDataURL={article?.articleImage}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Link href={`/dashboard/article/${article.id}`}>
                    <button className="p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <Edit className="h-3 w-3 text-gray-600" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500">{article.time}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">No articles found</div>
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

export default ArticleGridView;
