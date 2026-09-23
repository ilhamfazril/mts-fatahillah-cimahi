import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number; // ms
  subText?: string;
}

/**
 * AnimatedCounter
 * Parses numbers and fast-animates the count-up with smooth ease-out curve.
 * Preserves suffixes like "+" or non-numeric badges like "Akreditasi B".
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className = '',
  duration = 900,
  subText,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Check if the value contains numbers
    const cleanStr = String(value || '').trim();
    // Extract the first continuous sequence of digits (including dots or commas)
    const match = cleanStr.match(/^([^\d]*)(\d+([.,]\d+)?)(.*)$/);

    if (!match) {
      // Non-numeric value (e.g. "Akreditasi B" or "Akreditasi A Unggul")
      setDisplayValue(cleanStr);
      return;
    }

    const prefix = match[1] || '';
    const rawNumberStr = match[2] || '0';
    const suffix = match[4] || '';

    // Handle thousand separators: 1.250 -> 1250 or 1,250 -> 1250
    const hasDot = rawNumberStr.includes('.');
    const hasComma = rawNumberStr.includes(',');
    const normalizedNumber = parseFloat(rawNumberStr.replace(/\./g, '').replace(/,/g, '.'));

    if (isNaN(normalizedNumber) || normalizedNumber === 0) {
      setDisplayValue(cleanStr);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Fast ease-out curve (quartic ease out: very fast start, smooth landing)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentNumber = Math.floor(normalizedNumber * easeOut);

      // Format back with separator if needed
      let formattedNumber: string;
      if (hasDot) {
        formattedNumber = currentNumber.toLocaleString('id-ID');
      } else if (hasComma) {
        formattedNumber = currentNumber.toLocaleString('en-US');
      } else {
        formattedNumber = String(currentNumber);
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Guarantee final exact match
        setDisplayValue(cleanStr);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration]);

  return (
    <span ref={containerRef} className={`inline-block transition-all ${className}`}>
      {displayValue}
      {subText && <span className="ml-1 text-xs font-normal opacity-80">{subText}</span>}
    </span>
  );
};
