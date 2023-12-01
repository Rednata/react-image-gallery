// import { useState, CSSProperties } from 'react';
import BarLoader from 'react-spinners/BarLoader';

export const Loader = () => {
  console.log();
  return (
    <BarLoader
      color='#edcd51'
      // loading={loading}
      cssOverride={{
        margin: '100px auto',
      }}
      size={500}
      aria-label="Loading Spinner"
      width={300}
    />
  );
};
