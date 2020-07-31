import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup';

const CountUpMemo = ({end}) => {
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = end;
  });

  return <CountUp 
    duration={3} 
    start={prevCountRef.current} 
    end={end} 
    prefix={" $ "} 
    decimals={1} 
    separator={","}
  />
}

export default CountUpMemo;
