import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { client } from './api-Client';
import { message } from 'antd';

export async function getDashBoardData() {
  const response: any = await client(`user/admin`);
  return response;
}

export async function getAllHotelsCount() {
  const response: any = await client(`hotel/gethotelType`);
  return response;
}
export function useDashBoardData() {
  const state = useQuery({
    queryKey: ['dashboardData'],

    queryFn: () => getDashBoardData(),
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
