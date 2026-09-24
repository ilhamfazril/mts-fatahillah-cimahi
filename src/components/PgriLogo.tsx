import React from 'react';
import { SchoolLogo } from './SchoolLogo';

interface PgriLogoProps {
  className?: string;
  size?: number;
  showBadgeBorder?: boolean;
}

/**
 * School Logo Component (MTs Fatahillah Cimahi)
 * Maintains backwards compatibility for existing imports while rendering
 * the official MTs Fatahillah Cimahi emblem without outer black background.
 */
export const PgriLogo: React.FC<PgriLogoProps> = ({ 
  className = '', 
  size = 48,
  showBadgeBorder = false
}) => {
  return (
    <SchoolLogo
      className={className}
      size={size}
      showBadgeBorder={showBadgeBorder}
    />
  );
};

export default PgriLogo;
