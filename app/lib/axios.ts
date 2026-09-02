import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

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

export const axiosGet = async <T>(path: string): Promise<T> => {
  try {
    const response = await api.get(path);
    return response.data as T;
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while fetching data");
  }
};

export const axiosPost = async <TRequest, TResponse>(
  path: string,
  dto: TRequest,
): Promise<TResponse> => {
  try {
    const response = await api.post(path, dto);
    return response.data as TResponse;
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while posting data");
  }
};

export const axiosPut = async <TRequest, TResponse>(
  path: string,
  dto?: TRequest,
): Promise<TResponse> => {
  try {
    const response = await api.put(path, dto);
    return response.data as TResponse;
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while updating data");
  }
};

export const axiosDelete = async <T>(path: string): Promise<T> => {
  try {
    const response = await api.delete(path);
    return response.data as T;
  } catch (error) {
    throw toApiError(
      error,
      "An unknown error occurred while deleting the resource",
    );
  }
};