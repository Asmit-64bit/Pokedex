import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', width: '100%' }}>
      <motion.div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '5px solid var(--glass-border)',
          borderTop: '5px solid var(--primary-color)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;
