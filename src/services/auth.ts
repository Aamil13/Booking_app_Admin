import { useMutation } from '@tanstack/react-query';
import { client } from './api-Client';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMainStore } from '../store/store';
import useCookie from '../hooks/useCookie';
export async function Login(data: any) {
  const response: any = await client(`auth/login`, {
    method: 'POST',
    data,
  });
  return response;
}
export async function Register(data: any) {
  const response = await client(`auth/register`, {
    method: 'POST',
    data,
  });
  return response;
}

export const useLogin = () => {
  const setUserName = useMainStore((state) => state.setUserName);
  const navigate = useNavigate();
  const [_, setCookie] = useCookie('access_token');
  return useMutation({
    mutationFn: (data: any) => Login(data),
    onSuccess: (response: any) => {
      // console.log('res', response);

      setUserName(response?.otherDetails?.username);
      setCookie(
        response?.tokenWithExpireDate?.accessToken,
        response?.tokenWithExpireDate?.expires
      );
      message.success('Logged in', 2);
      navigate('/');
    },
    onError: (res: any) => {
      // console.log(res.response.data.message, 'res');
      message.error(res.response.data.message, 2);
    },
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: any) => Register(data),
    onSuccess: () => {
      // console.log(response);
      message.success('Registered in', 2);
    },
    onError: (res: any) => {
      // console.log(res.response.data.message, 'res');
      message.error(res.response.data.message, 2);
    },
  });
};
