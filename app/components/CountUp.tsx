import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CountUp({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = ''
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.round(easeOutQuart * end);

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      const timeoutId = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
      }, 100);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        clearTimeout(timeoutId);
      };
    }
  }, [isInView, end, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.8
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}