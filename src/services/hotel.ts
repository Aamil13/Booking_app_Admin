import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { client } from './api-Client';
import { message } from 'antd';
import useDebounce from '../hooks/useDebounce';
import useCookie from '../hooks/useCookie';

type SingleHotel = {
  title: string;
  name: string;
  cheapestPrice: number;
  city: string;
  desc: string;
  distance: string;
  type: string;
  _id: string;
  featured: boolean;
  address: string;
  rooms: string[];
  rating: number;
  photos: string[];
  photoPublicIds: string[];
};

export async function createHotel(data: any, token: string) {
  const response = await client(`hotel/add`, {
    method: 'POST',
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}
export async function deleteHotelImage(data: any, token: string) {
  const response = await client(`hotel/hotels/photo/delete`, {
    method: 'DELETE',
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}
export async function updateHotel(data: any, id: string, token: string) {
  // console.log('id', id, data);

  const response = await client(`hotel/update/${id}`, {
    method: 'PUT',
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}

export async function deleteHotel(id: string, token: string) {
  const response = await client(`hotel/delete/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}

export async function getAllHotels(
  currPage: number,
  limit: number,
  token: string
) {
  const response: any = await client(
    `hotel/getallhotels?page=${currPage}&limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
}
export async function getHotel(id: string, token: string) {
  const response: SingleHotel = await client(`hotel/gethotel/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}
export async function searchHotel(name: string, token: string) {
  const response: any = await client(`hotel/search_hotel?search=${name}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}

export const useCreateHotel = () => {
  const [token] = useCookie('access_token');
  return useMutation({
    mutationFn: (formData: any) => createHotel(formData, token),
    onSuccess: () => {
      message.success('Hotel Created', 2);
    },
    onError: (res: any) => {
      // console.log(res, 'res');
      message.error(
        res?.response?.data?.message || 'Hotel Creation Failed ',
        2
      );
    },
  });
};

export function useGetHotels(currPage: number, limit: number) {
  const [token] = useCookie('access_token');
  const state = useQuery({
    queryKey: ['allHotels', currPage],
    queryFn: () => getAllHotels(currPage, limit, token),
    enabled: !!token,
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  return { ...state, error: errorMessage };
}

export function useGetHotel(id: string, isOpen: boolean) {
  const [token] = useCookie('access_token');
  const state = useQuery({
    queryKey: ['Hotel', id],
    enabled: isOpen && !!token,
    queryFn: () => getHotel(id, token),
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  return { ...state, error: errorMessage };
}

export function useSearchHotel(name: string) {
  const [token] = useCookie('access_token');
  const debouncedSearchTerm = useDebounce(name, 1000);
  const state = useQuery({
    queryKey: ['Search_Hotel', debouncedSearchTerm],
    enabled: !!debouncedSearchTerm,
    queryFn: () => searchHotel(debouncedSearchTerm, token),
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  return { ...state, error: errorMessage };
}

export const useDeleteHotel = (currentPage: number) => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [token] = useCookie('access_token');
  const mutation = useMutation({
    mutationFn: (id: string) => deleteHotel(id, token),
    onMutate: () => {
      const key = 'deleteHotel';
      messageApi.open({
        key,
        type: 'loading',
        content: 'Deleting hotel...',
        duration: 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allHotels', currentPage] });
      const key = 'deleteHotel';
      messageApi.open({
        key,
        type: 'success',
        content: 'Hotel deleted successfully!',
        duration: 2,
      });
    },
    onError: (error) => {
      const key = 'deleteHotel';
      messageApi.open({
        key,
        type: 'error',
        content: 'Failed to delete hotel',
        duration: 2,
      });
      console.error(error);
    },
  });

  return { ...mutation, contextHolder };
};

export const useUpdateHotel = () => {
  const [token] = useCookie('access_token');
  return useMutation({
    mutationFn: ({ formData, id }: any) => updateHotel(formData, id, token),
    onSuccess: () => {
      message.success('Hotel Updated', 2);
    },
    onError: (res: any) => {
      message.error(
        res?.response?.data?.message || 'Hotel Failed to Update',
        2
      );
    },
  });
};

export const useDeleteHotelPhoto = () => {
  const [token] = useCookie('access_token');
  return useMutation({
    mutationFn: (data: any) => deleteHotelImage(data, token),
    onSuccess: () => {
      message.success('Image Removed', 2);
    },
    onError: (res: any) => {
      // console.log(res, 'res');
      message.error(res?.response?.data?.message || 'Image Removal Failed ', 2);
    },
  });
};
