import React from 'react';

interface PgriLogoProps {
  className?: string;
  size?: number;
}

export const PgriLogo: React.FC<PgriLogoProps> = ({ className = '', size = 48 }) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-amber-400/90 bg-white select-none ${className}`}
      style={{ width: size, height: size }}
      title="Logo Resmi PGRI - SMP PGRI 5 Cimahi"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full rounded-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Red Ring */}
        <circle cx="100" cy="100" r="98" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />

        {/* Circular text paths */}
        <defs>
          {/* Top text arc */}
          <path
            id="textArcTop"
            d="M 22,100 A 78,78 0 1,1 178,100"
            fill="none"
          />
          {/* Bottom text arc */}
          <path
            id="textArcBottom"
            d="M 178,100 A 78,78 0 0,1 22,100"
            fill="none"
          />
        </defs>

        {/* White ring for typography */}
        <circle cx="100" cy="100" r="88" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />

        {/* Text in the white ring */}
        <text
          fontSize="11"
          fontWeight="900"
          fill="#991B1B"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          <textPath href="#textArcTop" startOffset="50%">
            SMP PGRI 5 CIMAHI
          </textPath>
        </text>

        <text
          fontSize="8.5"
          fontWeight="800"
          fill="#1E293B"
          letterSpacing="1"
          textAnchor="middle"
        >
          <textPath href="#textArcBottom" startOffset="50%">
            • YPLP PGRI KOTA CIMAHI •
          </textPath>
        </text>

        {/* Inner Green Central Field */}
        <circle cx="100" cy="100" r="66" fill="#15803D" stroke="#CA8A04" strokeWidth="3" />

        {/* 4 Open White Books Flanking the Torch */}
        {/* Left Book Upper */}
        <path
          d="M 52,94 L 78,92 L 78,108 L 52,108 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <line x1="56" y1="98" x2="74" y2="98" stroke="#94A3B8" strokeWidth="1" />
        <line x1="56" y1="102" x2="74" y2="102" stroke="#94A3B8" strokeWidth="1" />

        {/* Left Book Lower / Slanted */}
        <path
          d="M 54,112 L 78,110 L 78,124 L 54,124 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <line x1="58" y1="116" x2="74" y2="116" stroke="#94A3B8" strokeWidth="1" />
        <line x1="58" y1="120" x2="74" y2="120" stroke="#94A3B8" strokeWidth="1" />

        {/* Right Book Upper */}
        <path
          d="M 122,92 L 148,94 L 148,108 L 122,108 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <line x1="126" y1="98" x2="144" y2="98" stroke="#94A3B8" strokeWidth="1" />
        <line x1="126" y1="102" x2="144" y2="102" stroke="#94A3B8" strokeWidth="1" />

        {/* Right Book Lower */}
        <path
          d="M 122,110 L 146,112 L 146,124 L 122,124 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <line x1="126" y1="116" x2="142" y2="116" stroke="#94A3B8" strokeWidth="1" />
        <line x1="126" y1="120" x2="142" y2="120" stroke="#94A3B8" strokeWidth="1" />

        {/* Torch / Suluh Body (Standing Upright) */}
        <rect
          x="92"
          y="84"
          width="16"
          height="54"
          rx="3"
          fill="#FBBF24"
          stroke="#78350F"
          strokeWidth="1.8"
        />
        {/* 4 Lines on Torch */}
        <line x1="96" y1="88" x2="96" y2="134" stroke="#D97706" strokeWidth="1.5" />
        <line x1="104" y1="88" x2="104" y2="134" stroke="#D97706" strokeWidth="1.5" />
        <line x1="92" y1="98" x2="108" y2="98" stroke="#78350F" strokeWidth="1.5" />
        <line x1="92" y1="118" x2="108" y2="118" stroke="#78350F" strokeWidth="1.5" />

        {/* Torch Holder Base */}
        <polygon
          points="88,138 112,138 106,146 94,146"
          fill="#D97706"
          stroke="#78350F"
          strokeWidth="1.5"
        />

        {/* 5-Ray Flame of Pancasila (Nyala Api Berwarna Merah & Kuning) */}
        {/* Central main flame ray */}
        <path
          d="M 100,44 C 92,60 92,72 100,82 C 108,72 108,60 100,44 Z"
          fill="#EF4444"
          stroke="#B91C1C"
          strokeWidth="1.2"
        />
        {/* Inner flame core */}
        <path
          d="M 100,54 C 96,64 96,72 100,78 C 104,72 104,64 100,54 Z"
          fill="#FDE047"
        />

        {/* Left ray 1 */}
        <path
          d="M 94,52 C 85,62 86,74 94,80 C 93,72 90,62 94,52 Z"
          fill="#DC2626"
        />
        {/* Left ray 2 */}
        <path
          d="M 86,60 C 76,70 80,82 90,83 C 86,76 83,68 86,60 Z"
          fill="#EA580C"
        />

        {/* Right ray 1 */}
        <path
          d="M 106,52 C 115,62 114,74 106,80 C 107,72 110,62 106,52 Z"
          fill="#DC2626"
        />
        {/* Right ray 2 */}
        <path
          d="M 114,60 C 124,70 120,82 110,83 C 114,76 117,68 114,60 Z"
          fill="#EA580C"
        />

        {/* Gold Star at very bottom */}
        <polygon
          points="100,154 102,159 107,159 103,162 105,167 100,164 95,167 97,162 93,159 98,159"
          fill="#FDE047"
          stroke="#CA8A04"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
};
