import { IResponse } from "@/app/interfaces/interfaces";
import { buildUrl } from "./baseUrl";
import axios from "axios";

export const api = axios.create({
  baseURL: buildUrl("api"),
  withCredentials: true,
});

/**
 * Normalized application error thrown by every shared Axios helper.
 *
 * The API convention returns HTTP 200 with the real outcome embedded in the
 * response body's `status` field. The helpers below treat any embedded body
 * `status >= 400` — and any genuine HTTP/network error — as a failure and
 * throw this class, so a resolved Promise always means a real success.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function toApiError(error: unknown, fallback: string): ApiError {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as
      | { message?: string; error?: string }
      | undefined;
    const status = error.response?.status ?? 0;
    const message = body?.message ?? body?.error ?? error.message ?? fallback;
    return new ApiError(message, status, body);
  }
  if (error instanceof Error) return new ApiError(error.message, 0);
  return new ApiError(fallback, 0);
}

function unwrap<T>(data: IResponse<T>): IResponse<T> {
  if (data && typeof data.status === "number" && data.status >= 400) {
    throw new ApiError(
      data.message ?? "Request failed",
      data.status,
      data.data,
    );
  }
  return data;
}

export function allowStatuses<T>(
  error: unknown,
  ...statuses: number[]
): IResponse<T> {
  if (error instanceof ApiError && statuses.includes(error.status)) {
    return { status: error.status, message: error.message };
  }
  throw error;
}

export const axiosGet = async <T>(path: string): Promise<IResponse<T>> => {
  let response;
  try {
    response = await api.get(path);
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while fetching data");
  }
  return unwrap(response.data as IResponse<T>);
};

export const axiosPost = async <TRequest, TResponse>(
  path: string,
  dto: TRequest,
): Promise<IResponse<TResponse>> => {
  let response;
  try {
    response = await api.post(path, dto);
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while posting data");
  }
  return unwrap(response?.data as IResponse<TResponse>);
};

export const axiosPut = async <TRequest, TResponse>(
  path: string,
  dto?: TRequest,
): Promise<IResponse<TResponse>> => {
  let response;
  try {
    response = await api.put(path, dto);
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while updating data");
  }
  return unwrap(response?.data as IResponse<TResponse>);
};

export const axiosDelete = async <T>(path: string): Promise<IResponse<T>> => {
  let response;
  try {
    response = await api.delete(path);
  } catch (error) {
    throw toApiError(
      error,
      "An unknown error occurred while deleting the resource",
    );
  }
  return unwrap(response?.data as IResponse<T>);
};