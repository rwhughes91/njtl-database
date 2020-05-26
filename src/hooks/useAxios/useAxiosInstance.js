import { useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxiosInstance = () => {
  const token = useSelector((state) => state.auth.token);
  return useMemo(
    () =>
      axios.create({
        baseURL: 'https://new-jersey-database-server.herokuapp.com/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    [token]
  );
};

export default useAxiosInstance;
