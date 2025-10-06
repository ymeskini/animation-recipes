import type { CSSProperties } from "react";
import { useState } from "react";
import styles from "./oscillate.module.css";

export default function Oscillate() {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleToggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const ballStyle = (amount: string): CSSProperties => ({
    "--amount": amount,
    animationPlayState: isPlaying ? 'running' : 'paused'
  } as CSSProperties);

  return (
    <div className={styles.container}>
      <div className={styles.ball} style={ballStyle("8px")}></div>
      <div className={styles.ball} style={ballStyle("16px")}></div>
      <div className={styles.ball} style={ballStyle("32px")}></div>
      <button className={styles.button} onClick={handleToggleAnimation}>
        {isPlaying ? 'Pause' : 'Play'} animation
      </button>
    </div>
  );
}
