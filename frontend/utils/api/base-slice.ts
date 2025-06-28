import { createApi } from "@reduxjs/toolkit/query/react";
import { mutations, queries } from "./api-details";
import customFetchBase from "./base-query";
import { transformErrorResponse } from "./handle-errors";
import { TagTypes, type CustomJsonObject } from "./constants";

export const baseSliceAPI = createApi({
  reducerPath: "baseSlice",
  baseQuery: customFetchBase,
  tagTypes: TagTypes,
  endpoints: (build: any) => {
    const endPoints: CustomJsonObject<any> = {};

    Object.keys(mutations).forEach((key: string) => {
      const apiDetails = mutations[key];

      endPoints[key] = build.mutation({
        query: (params: any) => {
          return {
            url: apiDetails.getUrl(params),
            method: apiDetails.method,
            body: params,
          };
        },
        transformResponse: (response: any) => apiDetails.transformResponse(response),
        transformErrorResponse: (response: any) =>
          apiDetails.transformErrorResponse
            ? apiDetails.transformErrorResponse(response)
            : transformErrorResponse(response),
        invalidatesTags: apiDetails?.invalidatesTags || [],
      });
    });

    Object.keys(queries).forEach((key) => {
      const apiDetails = queries[key];

      endPoints[key] = build.query({
        query: (body: any) => ({
          url: apiDetails.getUrl(body),
          method: apiDetails.method,
        }),
        transformResponse: (response: any) => apiDetails.transformResponse(response),
        transformErrorResponse: (response: any) => transformErrorResponse(response),
        providesTags: apiDetails?.providesTags || [],
      });
    });

    return endPoints;
  },
});

export const {
  useGetUsersQuery,
} = baseSliceAPI;
