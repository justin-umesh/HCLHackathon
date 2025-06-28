import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import {
  API_END_POINT,
  accessToken,
  refreshToken,
  firebaseToken,
  STATE_CODES,
} from "./constants";

const baseUrl = `${API_END_POINT}`;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = Cookies.get(accessToken);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); 
    }

    return headers;
  },
});

const refreshQuery = fetchBaseQuery({
  baseUrl: baseUrl,
});

const customFetchBase = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === STATE_CODES.UNAUTHORIZED && api.endpoint !== "loginUser") {
    try {
      const token = Cookies.get(refreshToken);
      if (!token) {
        window.location.href = "/";
      }
      const refreshResult = await refreshQuery(
        {
          url: "auth/refresh",
          method: "post",
          body: { refreshToken: token },
        },
        api,
        extraOptions
      );
      if (refreshResult?.data) {
      
        result = await baseQuery(args, api, extraOptions);
      } else {
        Cookies.remove(firebaseToken);
        Cookies.remove(refreshToken);
      }
    } finally {
      // release must be called once the mutex should be released again.
      // release();
    }
  }

  return result;
};

export default customFetchBase;
