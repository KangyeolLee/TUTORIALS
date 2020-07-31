import React from 'react';
import usePromise from './usePromise';

const wait = () => {
  // 3초 후에 끝나는 프로미스 반환
  return new Promise(resolve => 
    setTimeout(() => resolve("Hello hoooks!"), 3000)
  );
};

const UsePromiseSample = () => {
  const [loading, resolved, error] = usePromise(wait, []);

  if(loading) return <div>loading...</div>
  if(error) return <div>error..!</div>
  if(!resolved) return null;

  return <div>{resolved}</div>;
}

export default UsePromiseSample;