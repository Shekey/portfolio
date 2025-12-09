import { useState, useEffect } from "react";

export const useControls = () => {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    reset: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setControls((c) => ({
        ...c,
        forward: key === "w" ? true : c.forward,
        backward: key === "s" ? true : c.backward,
        left: key === "a" ? true : c.left,
        right: key === "d" ? true : c.right,
        jump: key === " " ? true : c.jump,
        reset: key === "r" ? true : c.reset,
      }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setControls((c) => ({
        ...c,
        forward: key === "w" ? false : c.forward,
        backward: key === "s" ? false : c.backward,
        left: key === "a" ? false : c.left,
        right: key === "d" ? false : c.right,
        jump: key === " " ? false : c.jump,
        reset: key === "r" ? false : c.reset,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return controls;
};
