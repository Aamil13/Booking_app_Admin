import { useState, useEffect, useCallback } from 'react';

const useCookie = (
  cookieName: string
): [string, (value: string, expirationDate: string) => void, () => void] => {
  const [cookieValue, setCookieValue] = useState<string>('');

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));

    setCookieValue(cookie ? cookie.split('=')[1] : '');
  }, [cookieName]);

  const setCookie = useCallback(
    (value: string, expirationDate: string): void => {
      document.cookie = `${cookieName}=${value}; expires=${new Date(expirationDate).toUTCString()}; path=/`;
      setCookieValue(value);
    },
    [cookieName]
  );

  const deleteCookie = useCallback((): void => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    setCookieValue('');
  }, [cookieName]);

  return [cookieValue, setCookie, deleteCookie];
};

export default useCookie;
