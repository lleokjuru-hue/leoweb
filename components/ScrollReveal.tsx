import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';

export const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  amount?: number;
  immediate?: boolean;
}

export const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.7,
  yOffset = 28,
  amount = 0.12,
  immediate = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const initialY = prefersReducedMotion ? 0 : yOffset;
  const effectiveDuration = prefersReducedMotion ? 0.2 : duration;

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: initialY }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: effectiveDuration,
          delay: prefersReducedMotion ? 0 : delay,
          ease: PREMIUM_EASE,
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: effectiveDuration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: PREMIUM_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  amount?: number;
  immediate?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0.04,
  amount = 0.1,
  immediate = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : delayChildren,
      },
    },
  };

  if (immediate) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: '0px 0px -40px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
  yOffset = 24,
  duration = 0.65,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : duration,
        ease: PREMIUM_EASE,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
