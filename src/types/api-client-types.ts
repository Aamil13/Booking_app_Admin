export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ClientRequest<T> {
  data?: T | T[];
  token?: string;
  headers?: { [key: string]: string };
  method?: MethodType;
  id?: string | number;
  customBaseUrl?: boolean;
}

export interface ServerData<T> {
  items: T[];
}

export interface SuccessResponse {
  success: true;
}

export type ServerResponse<T> = T & T[] & ServerData<T> & SuccessResponse;
