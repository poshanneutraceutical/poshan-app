import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const SessionTimeout = ({
  timeout = DEFAULT_TIMEOUT,
  onTimeout
}) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (onTimeout) {
      onTimeout();
    }

    navigate("/login", { replace: true });
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(logout, timeout);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart"
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [timeout]);

  return null;
};

export default SessionTimeout;