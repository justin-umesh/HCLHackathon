import type { CustomJsonObject } from "../constants";
import { userMutation, userQuery } from "./user";

export interface CustomEndPoint {
    getUrl: (params : any) => string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    transformResponse: (response: any) => any;
    transformErrorResponse?: (response: any) => any;
    invalidatesTags?: string[];
    providesTags?: string[];
}

export const mutations : CustomJsonObject<CustomEndPoint> = {
  ...userMutation,
};

export const queries = {
  ...userQuery,
};
