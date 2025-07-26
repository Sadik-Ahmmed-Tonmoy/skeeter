/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticles: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/admin/get-all-article`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["article"],
    }),

    getSingleArticle: builder.query({
      query: (id) => ({
        url: `/admin/get-single-article/${id}`,
        method: "GET",
      }),
      providesTags: ["article"],
    }),

    createArticle: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/create-article",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["article"],
    }),

    updateArticle: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/update-single-article/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
      invalidatesTags: ["article"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/delete-single-article/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["article"],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetSingleArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
