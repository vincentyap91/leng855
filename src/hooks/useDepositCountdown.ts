import { useState, useEffect } from "react";

export function useDepositCountdown() {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const storedEndTime = localStorage.getItem("depositCountdownEnd");
    if (storedEndTime) {
      const remaining = Math.max(0, Math.floor((parseInt(storedEndTime, 10) - Date.now()) / 1000));
      setTimeLeft(remaining);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          localStorage.removeItem("depositCountdownEnd");
          clearInterval(timer);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const startTimer = (minutes: number = 10) => {
    const endTime = Date.now() + minutes * 60 * 1000;
    localStorage.setItem("depositCountdownEnd", endTime.toString());
    setTimeLeft(minutes * 60);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")} minutes ${seconds.toString().padStart(2, "0")} second(s)`;
  };

  return { timeLeft, startTimer, formatTime };
}
