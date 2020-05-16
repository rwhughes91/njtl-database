import { useState, useCallback } from 'react';
import Axios from 'axios';
import useAxiosInstance from './useAxiosInstance';

const useAxios = () => {
  const axiosInstance = useAxiosInstance();
  const [requestData, setRequestData] = useState({
    data: null,
    lastQueryName: null,
    error: false,
    lastVariables: null,
  });
  const clearState = useCallback(() => {
    setRequestData({
      data: null,
      lastQueryName: null,
      error: false,
      lastVariables: null,
    });
  }, []);
  const runAxios = useCallback(
    async (query, queryName, config = {}, url = '/graphql') => {
      const { variables } = query;
      try {
        const response = await axiosInstance.post(url, query, config);
        setRequestData({
          data: response.data.data[queryName],
          lastQueryName: queryName,
          lastVariables: variables,
          error: false,
        });
      } catch (err) {
        if (!Axios.isCancel(err)) {
          setRequestData({
            data: null,
            lastQueryName: null,
            lastVariables: variables,
            error: err.message,
          });
        }
      }
    },
    [axiosInstance]
  );
  return [requestData, runAxios, clearState];
};

export default useAxios;
