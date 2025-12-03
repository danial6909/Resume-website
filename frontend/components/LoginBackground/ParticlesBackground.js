// components/ui/ParticlesBackground.js
'use client';

import { useRef } from 'react';
import useParticles from '@/hooks/useParticles';
import styles from './ParticlesBackground.module.css';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.overlay} />
    </>
  );
}