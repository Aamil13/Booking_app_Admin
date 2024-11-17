import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { client } from './api-Client';
import { message } from 'antd';
import useCookie from '../hooks/useCookie';

export async function getAllReservation(
  currPage: number,
  limit: number,
  token: string
) {
  const response: any = await client(
    `reservation?page=${currPage}&limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
}

export function useGetAllReservation(currPage: number, limit: number) {
  const [token] = useCookie('access_token');
  const state = useQuery({
    queryKey: ['reservation', currPage],

    queryFn: () => getAllReservation(currPage, limit, token),
    enabled: !!token,
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
