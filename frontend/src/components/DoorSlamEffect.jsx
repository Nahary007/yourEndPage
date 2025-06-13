import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function DoorSlamEffect({ trigger }) {
  const controls = useAnimation();

  useEffect(() => {
    if (trigger) {
      controls.start({
        rotateY: [0, -15, 0, -25, 0, -90],
        x: [0, -20, 0, -40, 0, -500],
        opacity: [1, 1, 1, 1, 1, 0.95],
        transition: { 
          duration: 1.5,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: "easeInOut"
        }
      });
    } else {
      controls.stop();
    }
  }, [trigger, controls]);

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
      <motion.div
        className="w-96 h-128 bg-gradient-to-r from-black to-blue-900 origin-right shadow-2xl border-4 border-black"
        animate={controls}
        initial={{ rotateY: 0, opacity: 1 }}
        style={{
          boxShadow: "0 0 30px rgba(0, 0, 254, 0.5)",
          backgroundColor: "rgba(0, 0, 139, 0.9)",
          filter: "blur(2px)"
        }}
      >
        <div className="absolute right-4 top-1/2 w-6 h-16 bg-blue-200 rounded-full -translate-y-1/2 shadow-inner border border-blue-100"></div>
        <div className="absolute inset-0 bg-black bg-opacity-0"></div>
      </motion.div>
    </div>
  );
}