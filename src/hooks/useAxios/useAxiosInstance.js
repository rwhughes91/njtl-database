import { useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxiosInstance = () => {
  const token = useSelector((state) => state.auth.token);
  return useMemo(
    () =>
      axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    [token]
  );
};

export default useAxiosInstance;
