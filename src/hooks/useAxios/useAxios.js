import { useState } from 'react';
import axios from '../../axios-liens';

const useAxios = () => {
  const [requestData, setRequestData] = useState({
    data: null,
    lastQueryName: null,
    error: false,
  });
  const runAxios = async (query, queryName, url = '/graphql') => {
    try {
      const response = await axios.post(url, query);
      setRequestData({
        data: response.data.data[queryName],
        lastQueryName: queryName,
        error: false,
      });
    } catch (err) {
      setRequestData({
        data: null,
        lastQueryName: null,
        error: err.message,
      });
    }
  };
  return [requestData, runAxios];
};

export default useAxios;
