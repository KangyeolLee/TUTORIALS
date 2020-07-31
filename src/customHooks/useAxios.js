import defaultAxios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const useAxios = (options, axiosInstance = defaultAxios, ) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  })
  const [trigger, setTrigger] = useState(0);
  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now());
  }

  useEffect(() => {
    if(!options.url) return;
    
    axiosInstance(options).then(data => {
      setState({
        ...state,
        loading: false,
        data,
      });
    }).catch(error => {
      setState({
        ...state,
        loading: false,
        error,
      })
    })
  }, [trigger]);

  return { ...state, refetch };
}

export default useAxios;