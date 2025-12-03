// components/common/DotSpinner.js

"use client"; // این کامپوننت Client-side است

import React from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.spinnerContainer}>
      {/* سه نقطه متحرک */}
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}