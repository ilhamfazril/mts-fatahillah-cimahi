import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: number;
  showBadgeBorder?: boolean;
}

/**
 * Official Emblem for MTs Fatahillah Cimahi
 * - 100% matched to the official Madrasah emblem shape (Perisai Cembung Segi Empat Bulat / Rounded Barrel-Shield)
 * - Zero black background (clean transparent outside the shield)
 * - High-definition crystal-clear typography:
 *     - "TSANAWIYAH" (arched along top)
 *     - "MADRASAH" (curved along left side from top to bottom)
 *     - "FATAHILLAH" (curved along right side from top to bottom)
 *     - "CIMAHI" (curved upright along bottom)
 * - Symmetrical Golden Wings (Sayap Api Kuning Emas), White Pen (Kalam),
 *   Open Qur'an (Kitab Suci), Crossed Stand (Silang Rehal), and Ribbon with "AN-NUR".
 */
export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 54,
  showBadgeBorder = false,
}) => {
  // Emblem bounding box is 1000 x 1000 with symmetrical padding
  const width = size;
  const height = size;

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none overflow-visible ${
        showBadgeBorder ? 'p-1 rounded-2xl bg-white/10 ring-1 ring-white/20 shadow-sm' : ''
      } ${className}`}
      style={{ width, height }}
      title="Logo Resmi MTs Fatahillah Cimahi"
    >
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="compShieldBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0060CA" />
            <stop offset="50%" stopColor="#0055B8" />
            <stop offset="100%" stopColor="#004AA4" />
          </linearGradient>

          <linearGradient id="compWingsYellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF018" />
            <stop offset="60%" stopColor="#FFDE00" />
            <stop offset="100%" stopColor="#EAA600" />
          </linearGradient>
        </defs>

        <g id="mts-fatahillah-official-emblem">
          {/* 1. Outer Royal Blue Barrel-Shield Contour (Perisai Cembung Segi Empat Bulat) */}
          <path
            d="M 500,95
               C 610,95 710,115 770,140
               C 815,160 840,185 845,230
               C 855,320 865,420 865,490
               C 865,560 855,660 845,750
               C 840,795 815,820 760,845
               C 700,870 600,885 500,885
               C 400,885 300,870 240,845
               C 185,820 160,795 155,750
               C 145,660 135,560 135,490
               C 135,420 145,320 155,230
               C 160,185 185,160 230,140
               C 290,115 390,95 500,95 Z"
            fill="url(#compShieldBlueGrad)"
            stroke="#003D88"
            strokeWidth="5"
          />

          {/* Thin Crisp White Outer Trim Accent */}
          <path
            d="M 500,103
               C 606,103 704,122 763,146
               C 807,166 831,189 836,233
               C 846,321 856,420 856,490
               C 856,559 846,658 836,747
               C 831,791 807,814 753,838
               C 695,862 597,877 500,877
               C 403,877 305,862 247,838
               C 193,814 169,791 164,747
               C 154,658 144,559 144,490
               C 144,420 154,321 164,233
               C 169,189 193,166 237,146
               C 296,122 394,103 500,103 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeOpacity="0.9"
          />

          {/* 2. Crisp, Bold Typography Around Rim */}
          {/* Top: "TSANAWIYAH" */}
          <g id="compTextTsanawiyah">
            <text x="275.0" y="168.0" transform="rotate(-13.0, 275.0, 168.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">T</text>
            <text x="325.0" y="156.4" transform="rotate(-10.1, 325.0, 156.4)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">S</text>
            <text x="375.0" y="146.1" transform="rotate(-7.2, 375.0, 146.1)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="425.0" y="138.6" transform="rotate(-4.3, 425.0, 138.6)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">N</text>
            <text x="475.0" y="134.5" transform="rotate(-1.4, 475.0, 134.5)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="525.0" y="134.5" transform="rotate(1.4, 525.0, 134.5)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">W</text>
            <text x="575.0" y="138.6" transform="rotate(4.3, 575.0, 138.6)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">I</text>
            <text x="625.0" y="146.1" transform="rotate(7.2, 625.0, 146.1)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">Y</text>
            <text x="675.0" y="156.4" transform="rotate(10.1, 675.0, 156.4)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="725.0" y="168.0" transform="rotate(13.0, 725.0, 168.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle" dominantBaseline="central">H</text>
          </g>

          {/* Left: "MADRASAH" (Top to Bottom Along Left Curve) */}
          <g id="compTextMadrasah">
            <text x="190.0" y="265.0" transform="rotate(-98.0, 190.0, 265.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="44" textAnchor="middle" dominantBaseline="central">M</text>
            <text x="177.0" y="329.3" transform="rotate(-95.7, 177.0, 329.3)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="44" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="166.5" y="393.6" transform="rotate(-93.4, 166.5, 393.6)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="44" textAnchor="middle" dominantBaseline="central">D</text>
            <text x="160.8" y="457.9" transform="rotate(-91.1, 160.8, 457.9)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="44" textAnchor="middle" dominantBaseline="central">R</text>
            <text x="160.8" y="522.1" transform="rotate(-88.9, 160.8, 522.1)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="44" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="166.5" y="586.4" transform="rotate(-86.6, 166.5, 586.4)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="44" textAnchor="middle" dominantBaseline="central">S</text>
            <text x="177.0" y="650.7" transform="rotate(-84.3, 177.0, 650.7)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="44" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="190.0" y="715.0" transform="rotate(-82.0, 190.0, 715.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="44" textAnchor="middle" dominantBaseline="central">H</text>
          </g>

          {/* Right: "FATAHILLAH" (Top to Bottom Along Right Curve) */}
          <g id="compTextFatahillah">
            <text x="810.0" y="250.0" transform="rotate(82.0, 810.0, 250.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">F</text>
            <text x="820.3" y="303.3" transform="rotate(83.8, 820.3, 303.3)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="829.3" y="356.7" transform="rotate(85.6, 829.3, 356.7)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">T</text>
            <text x="836.0" y="410.0" transform="rotate(87.3, 836.0, 410.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="839.5" y="463.3" transform="rotate(89.1, 839.5, 463.3)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">H</text>
            <text x="839.5" y="516.7" transform="rotate(90.9, 839.5, 516.7)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">I</text>
            <text x="836.0" y="570.0" transform="rotate(92.7, 836.0, 570.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">L</text>
            <text x="829.3" y="623.3" transform="rotate(94.4, 829.3, 623.3)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">L</text>
            <text x="820.3" y="676.7" transform="rotate(96.2, 820.3, 676.7)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="810.0" y="730.0" transform="rotate(98.0, 810.0, 730.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" dominantBaseline="central">H</text>
          </g>

          {/* Bottom: "C I M A H I" (Upright Curved) */}
          <g id="compTextCimahi">
            <text x="300.0" y="824.0" transform="rotate(9.0, 300.0, 824.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="56" textAnchor="middle" dominantBaseline="central">C</text>
            <text x="380.0" y="839.3" transform="rotate(5.4, 380.0, 839.3)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="56" textAnchor="middle" dominantBaseline="central">I</text>
            <text x="460.0" y="848.7" transform="rotate(1.8, 460.0, 848.7)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="56" textAnchor="middle" dominantBaseline="central">M</text>
            <text x="540.0" y="848.7" transform="rotate(-1.8, 540.0, 848.7)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="56" textAnchor="middle" dominantBaseline="central">A</text>
            <text x="620.0" y="839.3" transform="rotate(-5.4, 620.0, 839.3)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="56" textAnchor="middle" dominantBaseline="central">H</text>
            <text x="700.0" y="824.0" transform="rotate(-9.0, 700.0, 824.0)" fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="56" textAnchor="middle" dominantBaseline="central">I</text>
          </g>

          {/* 3. Inner White Border */}
          <path
            d="M 500,185
               C 585,185 665,202 715,225
               C 750,242 770,265 774,305
               C 782,380 788,445 788,490
               C 788,540 782,605 774,675
               C 770,715 750,740 705,765
               C 655,788 575,800 500,800
               C 425,800 345,788 295,765
               C 250,740 230,715 226,675
               C 218,605 212,540 212,490
               C 212,445 218,380 226,305
               C 230,265 250,242 285,225
               C 335,202 415,185 500,185 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinejoin="round"
          />

          {/* Inner Field Blue Fill */}
          <path
            d="M 500,189
               C 583,189 661,205 710,228
               C 744,244 763,267 767,305
               C 775,378 781,444 781,490
               C 781,538 775,603 767,671
               C 763,710 744,734 701,758
               C 653,780 574,792 500,792
               C 426,792 347,780 299,758
               C 256,734 237,710 233,671
               C 225,603 219,538 219,490
               C 219,444 225,378 233,305
               C 237,267 256,244 290,228
               C 339,205 417,189 500,189 Z"
            fill="url(#compShieldBlueGrad)"
          />

          {/* 4. Left Golden Wing */}
          <g id="compLeftWing">
            <path
              d="M 436,585
                 C 390,620 338,625 305,580
                 C 285,550 270,505 285,465
                 C 275,480 268,500 270,520
                 C 272,550 286,578 308,602
                 C 282,588 272,560 272,530
                 C 272,490 284,440 305,395
                 C 318,365 338,330 365,305
                 C 370,335 362,370 348,405
                 C 334,440 318,475 318,505
                 C 330,470 352,435 378,405
                 C 392,390 405,380 415,370
                 C 412,405 398,445 380,480
                 C 362,515 348,542 352,562
                 C 358,580 380,592 410,600
                 C 432,605 448,595 448,580
                 C 448,565 435,560 422,568
                 C 414,575 414,585 422,585
                 Z"
              fill="url(#compWingsYellowGrad)"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M 425,595 
                 C 390,605 365,622 368,648 
                 C 372,670 395,684 416,676 
                 C 432,668 440,650 435,632"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Right Golden Wing */}
          <g id="compRightWing">
            <path
              d="M 564,585
                 C 610,620 662,625 695,580
                 C 715,550 730,505 715,465
                 C 725,480 732,500 730,520
                 C 728,550 714,578 692,602
                 C 718,588 728,560 728,530
                 C 728,490 716,440 695,395
                 C 682,365 662,330 635,305
                 C 630,335 638,370 652,405
                 C 666,440 682,475 682,505
                 C 670,470 648,435 622,405
                 C 608,390 595,380 585,370
                 C 588,405 602,445 620,480
                 C 638,515 652,542 648,562
                 C 642,580 620,592 590,600
                 C 568,605 552,595 552,580
                 C 552,565 565,560 578,568
                 C 586,575 586,585 578,585
                 Z"
              fill="url(#compWingsYellowGrad)"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M 575,595 
                 C 610,605 635,622 632,648 
                 C 628,670 605,684 584,676 
                 C 568,668 560,650 565,632"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* 5. Center Top: Kalam Pen */}
          <g id="compPen">
            <path
              d="M 500,270 
                 L 485,320 
                 L 488,380 
                 L 512,380 
                 L 515,320 Z"
              fill="#FFFFFF"
              stroke="#003D88"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <line x1="500" y1="274" x2="500" y2="330" stroke="#003D88" strokeWidth="3" />
            <circle cx="500" cy="333" r="3.5" fill="#003D88" />
            <line x1="488" y1="360" x2="512" y2="360" stroke="#003D88" strokeWidth="3" />
          </g>

          {/* 6. Center: Open Al-Qur'an */}
          <g id="compQuran">
            <path
              d="M 500,378
                 C 475,368 445,368 424,378
                 L 418,460
                 C 442,450 475,450 500,462
                 C 525,450 558,450 582,460
                 L 576,378
                 C 555,368 525,368 500,378 Z"
              fill="#FFFFFF"
              stroke="#003D88"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <line x1="500" y1="378" x2="500" y2="462" stroke="#003D88" strokeWidth="3.5" />
            <line x1="435" y1="392" x2="488" y2="392" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
            <line x1="433" y1="405" x2="488" y2="405" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
            <line x1="431" y1="418" x2="488" y2="418" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
            <line x1="430" y1="431" x2="488" y2="431" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
            <line x1="432" y1="444" x2="488" y2="444" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />

            <line x1="512" y1="392" x2="565" y2="392" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
            <line x1="512" y1="405" x2="567" y2="405" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
            <line x1="512" y1="418" x2="569" y2="418" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
            <line x1="512" y1="431" x2="570" y2="431" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
            <line x1="512" y1="444" x2="568" y2="444" stroke="#003D88" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* 7. Center: Silang Rehal Stand (Crossed X-Shape) */}
          <g id="compRehal">
            <path
              d="M 436,458 
                 L 556,540 
                 L 542,558 
                 L 422,476 Z"
              fill="#FFFFFF"
              stroke="#003D88"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path
              d="M 564,458 
                 L 444,540 
                 L 458,558 
                 L 578,476 Z"
              fill="#FFFFFF"
              stroke="#003D88"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <rect x="492" y="491" width="16" height="16" transform="rotate(45 500 499)" fill="#FFFFFF" stroke="#003D88" strokeWidth="3" />
          </g>

          {/* 8. Bottom Center: White Ribbon "AN-NUR" */}
          <g id="compRibbon">
            <path
              d="M 405,620 
                 L 350,592 
                 L 368,628 
                 L 345,660 
                 L 405,652 Z"
              fill="#FFFFFF"
              stroke="#003D88"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path
              d="M 595,620 
                 L 650,592 
                 L 632,628 
                 L 655,660 
                 L 595,652 Z"
              fill="#FFFFFF"
              stroke="#003D88"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path
              d="M 390,615 
                 C 448,632 552,632 610,615 
                 C 620,648 616,672 604,688 
                 C 550,710 450,710 396,688 
                 C 384,672 380,648 390,615 Z"
              fill="#FFFFFF"
              stroke="#003D88"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <text
              x="500"
              y="668"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              fontWeight="900"
              fontSize="38"
              fill="#003D88"
              textAnchor="middle"
              letterSpacing="5"
            >
              AN-NUR
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export const FatahillahLogo = SchoolLogo;
