import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { client } from './api-Client';
import { message } from 'antd';
import useDebounce from '../hooks/useDebounce';

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

export async function createHotel(data: any) {
  const response = await client(`hotel/add`, {
    method: 'POST',
    data,
  });
  return response;
}
export async function deleteHotelImage(data: any) {
  const response = await client(`hotel/hotels/photo/delete`, {
    method: 'DELETE',
    data,
  });
  return response;
}
export async function updateHotel(data: any, id: string) {
  // console.log('id', id, data);

  const response = await client(`hotel/update/${id}`, {
    method: 'PUT',
    data,
  });
  return response;
}

export async function deleteHotel(id: string) {
  const response = await client(`hotel/delete/${id}`, {
    method: 'DELETE',
  });
  return response;
}

export async function getAllHotels(currPage: number, limit: number) {
  const response: any = await client(
    `hotel/getallhotels?page=${currPage}&limit=${limit}`
  );
  return response;
}
export async function getHotel(id: string) {
  const response: SingleHotel = await client(`hotel/gethotel/${id}`);
  return response;
}
export async function searchHotel(name: string) {
  const response: any = await client(`hotel/search_hotel?search=${name}`);
  return response;
}

export const useCreateHotel = () => {
  return useMutation({
    mutationFn: (formData: any) => createHotel(formData),
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
  const state = useQuery({
    queryKey: ['allHotels', currPage],
    queryFn: () => getAllHotels(currPage, limit),
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  return { ...state, error: errorMessage };
}

export function useGetHotel(id: string, isOpen: boolean) {
  const state = useQuery({
    queryKey: ['Hotel', id],
    enabled: isOpen,
    queryFn: () => getHotel(id),
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  return { ...state, error: errorMessage };
}

export function useSearchHotel(name: string) {
  const debouncedSearchTerm = useDebounce(name, 1000);
  const state = useQuery({
    queryKey: ['Search_Hotel', debouncedSearchTerm],
    enabled: !!debouncedSearchTerm,
    queryFn: () => searchHotel(debouncedSearchTerm),
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

  const mutation = useMutation({
    mutationFn: (id: string) => deleteHotel(id),
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
  return useMutation({
    mutationFn: ({ formData, id }: any) => updateHotel(formData, id),
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
  return useMutation({
    mutationFn: (data: any) => deleteHotelImage(data),
    onSuccess: () => {
      message.success('Image Removed', 2);
    },
    onError: (res: any) => {
      // console.log(res, 'res');
      message.error(res?.response?.data?.message || 'Image Removal Failed ', 2);
    },
  });
};
