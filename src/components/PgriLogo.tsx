import React from 'react';

interface PgriLogoProps {
  className?: string;
  size?: number;
  showBadgeBorder?: boolean;
}

/**
 * Official PGRI (PPLP Dasar & Menengah) Circular Emblem Logo
 * Crafted with mathematical vector precision matching the official logo photo:
 * - 5-Ray Red Pancasila Flame
 * - 4-Ribbed Golden Yellow Torch Cup (Cawan Suluh)
 * - Tapering Golden Handle (Tangkai Suluh)
 * - Green Circular Center Field with White Stepped Gateway/Building
 * - Golden Yellow Rice Leaves / Wings (Sayap Daun Padi Emas)
 * - Yellow Banner: "PGRI"
 * - White Bottom Ribbon with Swallowtails: "PPLP DASAR & MENENGAH"
 * - Perfectly round (bulat sempurna) circular badge container
 */
export const PgriLogo: React.FC<PgriLogoProps> = ({ 
  className = '', 
  size = 48,
  showBadgeBorder = true
}) => {
  return (
    <div
      className={`relative rounded-full aspect-square overflow-hidden flex-shrink-0 select-none flex items-center justify-center bg-white ${
        showBadgeBorder ? 'ring-2 ring-emerald-700/80 shadow-md' : ''
      } ${className}`}
      style={{ width: size, height: size }}
      title="Logo Resmi PGRI - PPLP Dasar & Menengah - SMP PGRI 5 Cimahi"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <defs>
          {/* Subtle Outer Bevel Gradient */}
          <linearGradient id="pgriGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="pgriGreenRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>

          {/* Torch Gold Gradient for Lustrous Look */}
          <linearGradient id="torchGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#FFDE00" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* 1. Base Circular White Medallion (Bulat Sempurna) */}
        <circle cx="250" cy="250" r="248" fill="#FFFFFF" />
        
        {/* Outer Emerald Protective Seal Ring */}
        <circle cx="250" cy="250" r="244" fill="none" stroke="url(#pgriGreenRim)" strokeWidth="6" />
        {/* Inner Golden Precision Trim */}
        <circle cx="250" cy="250" r="237" fill="none" stroke="url(#pgriGoldRing)" strokeWidth="2.5" />
        <circle cx="250" cy="250" r="233" fill="none" stroke="#E2E8F0" strokeWidth="1" />

        {/* 2. Official PGRI Emblem Group - Scaled & Positioned Optically in the Center */}
        <g id="official-pgri-emblem" transform="translate(250, 248) scale(0.72) translate(-250, -250)">
          
          {/* --- A. Sayap Daun Padi Emas (Kiri) --- */}
          {/* Leaf 1 (Top Left) */}
          <path
            d="M 230,310 C 180,290 140,220 160,130 C 180,95 200,80 205,75 C 200,105 180,145 200,205 C 215,245 230,280 230,310 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Leaf 2 (Upper Left) */}
          <path
            d="M 220,320 C 160,300 110,240 120,180 C 122,160 135,140 140,135 C 135,160 130,200 165,240 C 190,270 215,300 220,320 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Leaf 3 (Mid Left) */}
          <path
            d="M 215,335 C 145,315 95,270 102,230 C 104,215 115,200 120,195 C 115,220 118,250 155,278 C 180,298 205,320 215,335 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Leaf 4 (Lower Left) */}
          <path
            d="M 210,350 C 140,335 90,305 95,280 C 97,270 106,260 110,255 C 106,275 115,300 155,318 C 180,330 200,342 210,350 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Inner Overlapping Blades Left */}
          <path
            d="M 228,315 C 195,290 170,240 185,170 C 195,145 205,130 208,125 C 200,150 190,190 210,240 C 220,265 228,295 228,315 Z"
            fill="#FFDE00"
            stroke="#1E293B"
            strokeWidth="3"
          />
          <path
            d="M 220,330 C 180,305 148,265 158,215 C 165,195 174,180 176,175 C 170,198 165,230 195,268 C 210,288 220,315 220,330 Z"
            fill="#FFDE00"
            stroke="#1E293B"
            strokeWidth="3"
          />

          {/* --- B. Sayap Daun Padi Emas (Kanan - Symmetrical Mirror) --- */}
          {/* Leaf 1 (Top Right) */}
          <path
            d="M 270,310 C 320,290 360,220 340,130 C 320,95 300,80 295,75 C 300,105 320,145 300,205 C 285,245 270,280 270,310 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Leaf 2 (Upper Right) */}
          <path
            d="M 280,320 C 340,300 390,240 380,180 C 378,160 365,140 360,135 C 365,160 370,200 335,240 C 310,270 285,300 280,320 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Leaf 3 (Mid Right) */}
          <path
            d="M 285,335 C 355,315 405,270 398,230 C 396,215 385,200 380,195 C 385,220 382,250 345,278 C 320,298 295,320 285,335 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Leaf 4 (Lower Right) */}
          <path
            d="M 290,350 C 360,335 410,305 405,280 C 403,270 394,260 390,255 C 394,275 385,300 345,318 C 320,330 300,342 290,350 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Inner Overlapping Blades Right */}
          <path
            d="M 272,315 C 305,290 330,240 315,170 C 305,145 295,130 292,125 C 300,150 310,190 290,240 C 280,265 272,295 272,315 Z"
            fill="#FFDE00"
            stroke="#1E293B"
            strokeWidth="3"
          />
          <path
            d="M 280,330 C 320,305 352,265 342,215 C 335,195 326,180 324,175 C 330,198 335,230 305,268 C 290,288 280,315 280,330 Z"
            fill="#FFDE00"
            stroke="#1E293B"
            strokeWidth="3"
          />

          {/* --- C. Lingkaran Hijau Pusat (Center Green Field) --- */}
          <circle
            cx="250"
            cy="245"
            r="115"
            fill="#0FA83F"
            stroke="#1E293B"
            strokeWidth="4.5"
          />

          {/* --- D. Gedung Putih Berundak (White Stepped Gateway/Building Silhouette) --- */}
          <g fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="miter">
            {/* Left Wing Stepped Silhouette */}
            <path d="M 160,305 L 160,205 L 178,205 L 178,230 L 195,230 L 195,200 L 212,200 L 212,305 Z" />
            {/* Left Brick Divider Lines */}
            <line x1="160" y1="230" x2="178" y2="230" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="160" y1="255" x2="212" y2="255" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="160" y1="280" x2="212" y2="280" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="185" y1="255" x2="185" y2="280" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="195" y1="280" x2="195" y2="305" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="172" y1="280" x2="172" y2="305" stroke="#1E293B" strokeWidth="3.5" />

            {/* Right Wing Stepped Silhouette */}
            <path d="M 340,305 L 340,205 L 322,205 L 322,230 L 305,230 L 305,200 L 288,200 L 288,305 Z" />
            {/* Right Brick Divider Lines */}
            <line x1="322" y1="230" x2="340" y2="230" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="288" y1="255" x2="340" y2="255" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="288" y1="280" x2="340" y2="280" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="315" y1="255" x2="315" y2="280" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="305" y1="280" x2="305" y2="305" stroke="#1E293B" strokeWidth="3.5" />
            <line x1="328" y1="280" x2="328" y2="305" stroke="#1E293B" strokeWidth="3.5" />
          </g>

          {/* --- E. Tangkai Suluh Kuning Emas (Tapering Conical Torch Handle) --- */}
          <polygon
            points="233,188 267,188 250,378"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <line x1="250" y1="188" x2="250" y2="376" stroke="#D97706" strokeWidth="2.5" />

          {/* --- F. Cawan Suluh / Wadah Api (4-Ribbed Golden Torch Bowl) --- */}
          <g stroke="#1E293B" strokeWidth="3.5" strokeLinejoin="round">
            {/* Tier 4 (bottom collar) */}
            <path d="M 230,172 C 230,172 238,188 250,188 C 262,188 270,172 270,172 Z" fill="#FFDE00" />
            {/* Tier 3 */}
            <path d="M 224,158 C 224,158 234,173 250,173 C 266,173 276,158 276,158 Z" fill="#FFDE00" />
            {/* Tier 2 */}
            <path d="M 218,144 C 218,144 230,159 250,159 C 270,159 282,144 282,144 Z" fill="#FFDE00" />
            {/* Tier 1 (top rim) */}
            <path d="M 212,130 C 212,130 226,145 250,145 C 274,145 288,130 288,130 Z" fill="#FFDE00" />
          </g>

          {/* --- G. Nyala Api Merah Berkelopak Lima (5-Ray Pancasila Flame) --- */}
          <path
            d="M 250,22
               C 238,55 240,78 226,72
               C 216,68 214,54 205,58
               C 192,64 195,95 208,108
               C 195,102 188,96 182,102
               C 172,112 178,138 212,130
               C 232,142 268,142 288,130
               C 322,138 328,112 318,102
               C 312,96 305,102 292,108
               C 305,95 308,64 295,58
               C 286,54 284,68 274,72
               C 260,78 262,55 250,22 Z"
            fill="#E52320"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Flame Depth & Inner Highlights */}
          <path
            d="M 250,42 C 244,70 242,90 236,98 C 242,95 246,85 250,75 C 254,85 258,95 264,98 C 258,90 256,70 250,42 Z"
            fill="#DC2626"
            opacity="0.9"
          />

          {/* --- H. Pita Kuning Emas "PGRI" (Curved Yellow Banner) --- */}
          <path
            d="M 125,358
               C 170,395 330,395 375,358
               C 390,398 375,418 360,424
               C 320,442 180,442 140,424
               C 125,418 110,398 125,358 Z"
            fill="url(#torchGold)"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Bold Black Lettering "PGRI" */}
          <text
            x="250"
            y="414"
            fontFamily="Arial, system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="44"
            fill="#000000"
            textAnchor="middle"
            letterSpacing="4"
          >
            PGRI
          </text>

          {/* --- I. Pita Putih Bawah "PPLP DASAR & MENENGAH" (White Ribbon) --- */}
          {/* Left Swallowtail Ribbon Fold */}
          <path
            d="M 75,444 L 28,422 L 68,452 L 25,482 L 95,475 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Left Ribbon Shadow Fold */}
          <polygon points="75,444 95,475 95,444" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />

          {/* Right Swallowtail Ribbon Fold */}
          <path
            d="M 425,444 L 472,422 L 432,452 L 475,482 L 405,475 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Right Ribbon Shadow Fold */}
          <polygon points="425,444 405,475 405,444" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />

          {/* Center White Ribbon Banner Body */}
          <path
            d="M 85,440
               C 140,455 360,455 415,440
               L 415,485
               C 360,498 140,498 85,485
               Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Bold Black Lettering "PPLP DASAR & MENENGAH" */}
          <text
            x="250"
            y="473"
            fontFamily="Arial, system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="20.5"
            fill="#000000"
            textAnchor="middle"
            letterSpacing="1.2"
          >
            PPLP DASAR &amp; MENENGAH
          </text>

        </g>
      </svg>
    </div>
  );
};
