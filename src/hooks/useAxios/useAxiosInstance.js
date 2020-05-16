import { useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxiosInstance = () => {
  const token = useSelector((state) => state.auth.token);
  return useMemo(
    () =>
      axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    [token]
  );
};

export default useAxiosInstance;
