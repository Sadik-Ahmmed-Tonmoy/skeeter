/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const groundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGround: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/admin/get-all-ground`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["ground"],
    }),

    getSingleGround: builder.query({
      query: (id) => ({
        url: `/admin/get-single-sound/${id}`,
        method: "GET",
      }),
      providesTags: ["ground"],
    }),

    createGround: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/create-ground-sound",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ground"],
    }),

    updateGround: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/update-single-ground-sound/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
      invalidatesTags: ["ground"],
    }),
    deleteGround: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/delete-single-ground/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ground"],
    }),
  }),
});

export const {
  useGetAllGroundQuery,
  useGetSingleGroundQuery,
  useCreateGroundMutation,
  useUpdateGroundMutation,
  useDeleteGroundMutation,
} = groundApi;
