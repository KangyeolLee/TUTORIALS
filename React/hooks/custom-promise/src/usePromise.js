import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  const [resolved, setResolved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const process = async () => {
    setLoading(true);
    try {
      const result = await promiseCreator();
      setResolved(result);
    } catch(e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    process();
  }, deps);
  // deps -> 언제 Promise 를 새로 만들지에 대한 조건을 위한 deps 배열 (기본값은 빈 배열)

  return [loading, resolved, error];
}