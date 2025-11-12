import { useEffect, useRef } from 'react';

const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      // Jalankan fungsi HANYA jika komponen sudah pernah di-mount sebelumnya
      return fn(); 
    } else {
      // Set flag menjadi true setelah render pertama
      didMountRef.current = true;
    }
  }, inputs);
};

export default useDidUpdateEffect;