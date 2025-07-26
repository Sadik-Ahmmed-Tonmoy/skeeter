/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const goalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGoals: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/admin/get-all-goal`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["goal"],
    }),

    getSingleGoal: builder.query({
      query: (id) => ({
        url: `/admin/get-sinlge-goal/${id}`,
        method: "GET",
      }),
      providesTags: ["goal"],
    }),

    createGoal: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/create-goal",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["goal"],
    }),

    updateGoal: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/update-single-goal/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
      invalidatesTags: ["goal"],
    }),
    deleteGoal: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/delete-single-goal/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["goal"],
    }),
  }),
});

export const {
  useGetAllGoalsQuery,
  useGetSingleGoalQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
} = goalApi;
