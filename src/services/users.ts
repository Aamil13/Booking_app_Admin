import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { client } from './api-Client';
import { message } from 'antd';

export async function getAllUser(currPage: number, limit: number) {
  const response: any = await client(
    `user/getallusers/?page=${currPage}&limit=${limit}`
  );
  return response;
}

export function useGetAllUsers(currPage: number, limit: number) {
  const state = useQuery({
    queryKey: ['getallusers', currPage],

    queryFn: () => getAllUser(currPage, limit),
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  if (
    state?.data?.status?.toString().startsWith('4') ||
    errorMessage?.status?.toString().startsWith('4')
  ) {
    message.error(
      state?.data?.message || errorMessage?.message || 'An error occurred',
      2
    );
  }

  return { ...state, error: errorMessage };
}
