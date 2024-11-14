import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { client } from './api-Client';
import { message } from 'antd';

export async function createRoom(data: any, id: string) {
  const response = await client(`rooms/${id}`, {
    method: 'POST',
    data,
  });
  return response;
}

export async function getAllRooms(currPage: number, limit: number) {
  const response: any = await client(`rooms?page=${currPage}&limit=${limit}`);
  return response;
}
export async function getRoom(roomId: string) {
  const response: any = await client(`rooms/${roomId}`);
  return response;
}

export async function deleteRoom(id: string, hotelid: string) {
  const response = await client(`rooms/${id}/${hotelid}`, {
    method: 'DELETE',
  });
  return response;
}
export async function updateRoom(id: string, data: string) {
  const response = await client(`rooms/${id}`, {
    method: 'PUT',
    data: data,
  });
  return response;
}

export const useCreateRoom = (id: string) => {
  return useMutation({
    mutationFn: (formData: any) => createRoom(formData, id),
    onSuccess: (response: any) => {
      if (response?.status?.toString().startsWith('2')) {
        message.success('Room Created', 2);
      } else {
        message.error(response.message || 'An error occurred', 2);
      }
    },
    onError: (res: any) => {
      console.log(res, 'res');
      message.error(res.message, 2);
    },
  });
};

export function useGetRooms(currPage: number, limit: number) {
  const state = useQuery({
    queryKey: ['Rooms', currPage],
    queryFn: () => getAllRooms(currPage, limit),
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  return { ...state, error: errorMessage };
}

export function useGetRoom(roomId: string) {
  const state = useQuery({
    queryKey: ['Room', roomId],
    enabled: !!roomId,
    queryFn: () => getRoom(roomId),
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  return { ...state, error: errorMessage };
}

export const useDeleteRoom = () => {
  return useMutation({
    mutationFn: ({ roomId, hotelID }: any) => deleteRoom(roomId, hotelID),
    onSuccess: (response: any) => {
      if (response?.status?.toString().startsWith('2')) {
        message.success('Room Deleted', 2);
      } else {
        message.error(response.message || 'An error occurred', 2);
      }
    },
    onError: (res: any) => {
      console.log(res, 'res');
      message.error(res.message, 2);
    },
  });
};

export const useUpdateRoom = () => {
  return useMutation({
    mutationFn: ({ roomId, data }: any) => updateRoom(roomId, data),
    onSuccess: (response: any) => {
      if (response?.status?.toString().startsWith('2')) {
        message.success('Room Updated', 2);
      } else {
        message.error(response.message || 'An error occurred', 2);
      }
    },
    onError: (res: any) => {
      // console.log(res, 'res');
      // message.error(res.message, 2);
      message.error(res?.response?.data?.message || 'Room Update Failed ', 2);
    },
  });
};
