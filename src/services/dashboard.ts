import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { client } from './api-Client';
import { message } from 'antd';
import useCookie from '../hooks/useCookie';

export async function getDashBoardData(token: string) {
  const response: any = await client(`user/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}

export async function getAllHotelsCount() {
  const response: any = await client(`hotel/gethotelType`);
  return response;
}
export function useDashBoardData() {
  let finalCookie: any = null;

  if (typeof document !== 'undefined') {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='));
    finalCookie = cookieValue ? cookieValue.split('=')[1] : null;
  }
  const state = useQuery({
    queryKey: ['dashboardData'],

    queryFn: () => getDashBoardData(finalCookie),
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

export function useGetHotelsCount() {
  const state = useQuery({
    queryKey: ['allHotelsCount'],
    queryFn: () => getAllHotelsCount(),
  });

  let errorMessage = null;
  if (axios.isAxiosError(state.error) && state.error.response) {
    errorMessage = state.error.response.data;
  }

  return { ...state, error: errorMessage };
}
