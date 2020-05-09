import { useState, useCallback } from 'react';
import axios from '../../axios-liens';
import Axios from 'axios';

const useAxios = () => {
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
    async (query, queryName, cancelToken = {}, url = '/graphql') => {
      const { variables } = query;
      try {
        const response = await axios.post(url, query, cancelToken);
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
    []
  );
  return [requestData, runAxios, clearState];
};

export default useAxios;
