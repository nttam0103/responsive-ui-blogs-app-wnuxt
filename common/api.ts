import { $fetch } from "ofetch";

const API_URL = "https://mock-api.nals.vn/api/v2";

const getList = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T> => {
  return await $fetch<T>(`${API_URL}/${endpoint.replace(/^\//, "")}`, {
    method: "GET",
    params,
  });
};

const getById = async <T>(endpoint: string): Promise<T> => {
  return await $fetch<T>(`${API_URL}/${endpoint.replace(/^\//, "")}`, {
    method: "GET",
  });
};

const post = async <T>(
  endpoint: string,
  data: any,
  p0?: { headers: { "Content-Type": string } }
): Promise<T> => {
  return await $fetch<T>(`${API_URL}/${endpoint.replace(/^\//, "")}`, {
    method: "POST",
    body: data,
  });
};

const put = async <T>(
  endpoint: string,
  id: string | number,
  data: any
): Promise<T> => {
  return await $fetch<T>(`${API_URL}/${endpoint.replace(/^\//, "")}/${id}`, {
    method: "PUT",
    body: data,
  });
};

const patch = async <T>(
  endpoint: string,
  id: string | number,
  data: any
): Promise<T> => {
  return await $fetch<T>(`${API_URL}/${endpoint.replace(/^\//, "")}/${id}`, {
    method: "PATCH",
    body: data,
  });
};

const deleteById = async <T>(endpoint: string): Promise<T> => {
  return await $fetch<T>(`${API_URL}/${endpoint.replace(/^\//, "")}`, {
    method: "DELETE",
  });
};

const Api = {
  getList,
  getById,
  post,
  put,
  patch,
  delete: deleteById,
};

export default Api;
