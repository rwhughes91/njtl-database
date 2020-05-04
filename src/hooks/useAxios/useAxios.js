import { useState } from 'react';
import axios from '../../axios-liens';

const useAxios = () => {
  const [requestData, setRequestData] = useState({
    data: null,
    lastQueryName: null,
    error: false,
    lastVariables: null,
  });
  const clearState = () => {
    setRequestData({
      data: null,
      lastQueryName: null,
      error: false,
      lastVariables: null,
    });
  };
  const runAxios = async (query, queryName, url = '/graphql') => {
    const { variables } = query;
    try {
      const response = await axios.post(url, query);
      setRequestData({
        data: response.data.data[queryName],
        lastQueryName: queryName,
        lastVariables: variables,
        error: false,
      });
    } catch (err) {
      setRequestData({
        data: null,
        lastQueryName: null,
        lastVariables: variables,
        error: err.message,
      });
    }
  };
  return [requestData, runAxios, clearState];
};

export default useAxios;
