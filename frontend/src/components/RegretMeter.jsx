import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function RegretMeter({ value, onChange }) {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['#ef4444', '#f59e0b', '#10b981']
  );

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold mb-3">Niveau de regrets</h3>
      <div className="relative h-12">
        <motion.div 
          className="absolute inset-0 rounded-full bg-gray-200"
          style={{ backgroundColor: background }}
        />
        <motion.div
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.1}
          onDrag={(_, info) => {
            x.set(info.point.x - info.point.xInitial);
            onChange(Math.round((info.point.x - info.point.xInitial + 100) / 2));
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg border-4 border-black cursor-grab"
          style={{ x }}
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xl"
          >
            {value < 30 ? '😊' : value > 70 ? '😭' : '😐'}
          </motion.div>
        </motion.div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span>0% - Tout va bien</span>
        <span>100% - Pleurs</span>
      </div>
    </div>
  );
}