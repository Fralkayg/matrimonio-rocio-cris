import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  /** Retardo en segundos, para escalonar varios elementos de una misma fila. */
  delay?: number;
  /** Desplazamiento inicial en píxeles. */
  y?: number;
  className?: string;
};

/**
 * Aparición suave al entrar en pantalla. Se anula por completo si el sistema
 * pide menos movimiento.
 */
export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const quieto = useReducedMotion();

  if (quieto) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
