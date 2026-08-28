import ApiError from "../errors/ApiError";

export default async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message, data.fieldErrors);
  }

  return data;
}
