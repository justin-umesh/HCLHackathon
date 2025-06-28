import type { baseSliceAPI } from "./base-slice";

export const TagTypes = ["USERS"];

export type TagType = (typeof TagTypes)[number];

export const TAGS: Record<TagType, TagType> = {
  USERS: "USERS",
};

export interface CustomJsonObject<T> {
  [key: string]: T;
}

export const API_END_POINT =
  import.meta?.env?.VITE_API_END_POINT || "http://localhost:3000/";
export const accessToken = "accessToken";
export const refreshToken = "refreshToken";
export const firebaseToken = "firebaseToken";
export const STATE_CODES = {
  UNAUTHORIZED: 401,
};

export type BaseSliceApiKeys = keyof typeof baseSliceAPI;