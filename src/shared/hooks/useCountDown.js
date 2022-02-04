import { useState, useEffect, useRef } from 'react';

export const calculateRemainingTime = (difference) => {
  let remainingTime = {};

  if (difference > 0) {
    remainingTime = {
      seconds: Math.floor((difference / 1000) % 60),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    };
  } else {
    remainingTime = { seconds: 0, minutes: 0, hours: 0, days: 0 };
  }

  return remainingTime;
};

const useCountdown = (deadLine) => {
  const difference = +new Date(deadLine) - +new Date();
  const [timeLeft, setTimeLeft] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });
  const previousDeadline = useRef(deadLine);

  useEffect(() => {
    if (previousDeadline.current !== deadLine) {
      setTimeLeft({ seconds: 0, minutes: 0, hours: 0, days: 0 });
      previousDeadline.current = deadLine;
    }

    if (difference < 0) {
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(calculateRemainingTime(difference));
    }, 1000);

    return () => clearTimeout(timer);
  }, [deadLine, difference]);
  return { ...timeLeft };
};

export default useCountdown;
