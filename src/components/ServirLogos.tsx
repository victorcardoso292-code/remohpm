import React from 'react';

/**
 * Brasão de Armas do Estado do Tocantins (Vetor 100% SVG em alta resolução)
 */
export const BrasaoTocantinsVector: React.FC<{ size?: number; className?: string }> = ({ 
  size = 58, 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size * 1.06} 
      viewBox="0 0 160 170" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-label="Brasão do Estado do Tocantins"
    >
      <defs>
        <linearGradient id="tocantinsSun" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFA000" />
          <stop offset="100%" stopColor="#FFEE58" />
        </linearGradient>
      </defs>

      {/* Faixa Superior: CO YVY ORE RETAMA */}
      <path d="M 38 18 Q 80 10 122 18 L 126 12 Q 80 4 34 12 Z" fill="#1C1864" />
      <path d="M 34 12 L 28 17 L 38 18 Z" fill="#130F47" />
      <path d="M 126 12 L 132 17 L 122 18 Z" fill="#130F47" />
      <text 
        x="80" 
        y="15.5" 
        textAnchor="middle" 
        fill="#FFFFFF" 
        fontSize="5.8" 
        fontWeight="900" 
        fontFamily="sans-serif" 
        letterSpacing="1.2"
      >
        CO YVY ORE RETAMA
      </text>

      {/* Estrela Amarela Superior */}
      <polygon 
        points="80,19 83,27 92,27 85,32 88,40 80,35 72,40 75,32 68,27 77,27" 
        fill="#FFD200" 
        stroke="#B38600" 
        strokeWidth="0.8" 
      />

      {/* Ramos de Louro Verde (Esquerda e Direita) */}
      <g fill="#008837" stroke="#005A24" strokeWidth="0.4">
        {/* Ramo Esquerdo */}
        <path d="M 40 40 C 22 55 18 85 24 115 C 28 128 36 142 50 152 C 44 140 38 124 36 108 C 34 88 38 65 48 48 Z" />
        <ellipse cx="28" cy="58" rx="7.5" ry="3.8" transform="rotate(-35 28 58)" />
        <ellipse cx="22" cy="74" rx="8" ry="4" transform="rotate(-20 22 74)" />
        <ellipse cx="20" cy="92" rx="8.5" ry="4" transform="rotate(0 20 92)" />
        <ellipse cx="22" cy="110" rx="8.5" ry="4" transform="rotate(20 22 110)" />
        <ellipse cx="29" cy="128" rx="8" ry="4" transform="rotate(40 29 128)" />
        <ellipse cx="40" cy="144" rx="8" ry="4" transform="rotate(60 40 144)" />

        {/* Ramo Direito */}
        <path d="M 120 40 C 138 55 142 85 136 115 C 132 128 124 142 110 152 C 116 140 122 124 124 108 C 126 88 122 65 112 48 Z" />
        <ellipse cx="132" cy="58" rx="7.5" ry="3.8" transform="rotate(35 132 58)" />
        <ellipse cx="138" cy="74" rx="8" ry="4" transform="rotate(20 138 74)" />
        <ellipse cx="140" cy="92" rx="8.5" ry="4" transform="rotate(0 140 92)" />
        <ellipse cx="138" cy="110" rx="8.5" ry="4" transform="rotate(-20 138 110)" />
        <ellipse cx="131" cy="128" rx="8" ry="4" transform="rotate(-40 131 128)" />
        <ellipse cx="120" cy="144" rx="8" ry="4" transform="rotate(-60 120 144)" />
      </g>

      {/* Escudo Oval Central com Borda */}
      <ellipse cx="80" cy="88" rx="42" ry="48" fill="#FFFFFF" stroke="#1C1864" strokeWidth="2.5" />
      <path 
        d="M 40 85 C 40 55 58 43 80 43 C 102 43 120 55 120 85 C 120 115 102 131 80 131 C 58 131 40 115 40 85 Z" 
        fill="#1C1864" 
      />

      {/* Sol Nascente e Raios Dourados */}
      <circle cx="80" cy="85" r="14" fill="url(#tocantinsSun)" />
      <g stroke="#FFD200" strokeWidth="1.8" strokeLinecap="round">
        <line x1="80" y1="67" x2="80" y2="58" />
        <line x1="91" y1="71" x2="98" y2="64" />
        <line x1="97" y1="81" x2="106" y2="78" />
        <line x1="69" y1="71" x2="62" y2="64" />
        <line x1="63" y1="81" x2="54" y2="78" />
        <line x1="86" y1="69" x2="90" y2="61" strokeWidth="1.2" />
        <line x1="74" y1="69" x2="70" y2="61" strokeWidth="1.2" />
        <line x1="95" y1="76" x2="102" y2="71" strokeWidth="1.2" />
        <line x1="65" y1="76" x2="58" y2="71" strokeWidth="1.2" />
      </g>

      {/* Montanha Triangular Azul e Triângulo Dourado */}
      <polygon points="80,82 48,118 112,118" fill="#15114D" stroke="#FFFFFF" strokeWidth="1" />
      <polygon points="80,98 57,124 103,124" fill="#FFD200" />

      {/* Faixas Laterais com Datas */}
      <path d="M 12 118 L 48 114 L 46 126 L 14 128 Z" fill="#1C1864" />
      <polygon points="12,118 6,123 14,128" fill="#130F47" />
      <text x="28" y="123" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="bold" fontFamily="sans-serif">
        1º JAN
      </text>

      <path d="M 148 118 L 112 114 L 114 126 L 146 128 Z" fill="#1C1864" />
      <polygon points="148,118 154,123 146,128" fill="#130F47" />
      <text x="132" y="123" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="bold" fontFamily="sans-serif">
        1989
      </text>

      {/* Faixa Inferior: ESTADO DO TOCANTINS */}
      <path d="M 16 138 Q 80 162 144 138 L 148 150 Q 80 174 12 150 Z" fill="#1C1864" />
      <polygon points="12,150 4,142 16,138" fill="#130F47" />
      <polygon points="148,150 156,142 144,138" fill="#130F47" />
      <text 
        x="80" 
        y="152.5" 
        textAnchor="middle" 
        fill="#FFFFFF" 
        fontSize="8" 
        fontWeight="900" 
        fontFamily="sans-serif" 
        letterSpacing="1.4"
      >
        ESTADO DO TOCANTINS
      </text>
    </svg>
  );
};

/**
 * Emblema em Vetor SVG do SERVIR (S Estilizado com Gradientes e Linhas de Movimento)
 */
export const EmblemaServirVector: React.FC<{ size?: number; className?: string }> = ({ 
  size = 52, 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-label="Emblema Servir"
    >
      <defs>
        {/* Gradiente Azul-Ciano do Topo */}
        <linearGradient id="servirGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0077b6" />
          <stop offset="50%" stopColor="#005f9e" />
          <stop offset="100%" stopColor="#003f7a" />
        </linearGradient>
        {/* Gradiente Verde-Limão/Amarelo da Base */}
        <linearGradient id="servirGradBot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7cb342" />
          <stop offset="50%" stopColor="#c0ca33" />
          <stop offset="100%" stopColor="#fbc02d" />
        </linearGradient>
      </defs>

      {/* Arco Superior Azul */}
      <path 
        d="M 50 6 C 74.3 6 94 25.7 94 50 C 94 51.5 93.8 53 93.5 54.5 L 36 21 C 40.2 10.8 44.8 6 50 6 Z" 
        fill="url(#servirGradTop)" 
      />
      <path 
        d="M 50 6 C 36 6 24 12.5 16 22.5 L 43 38 L 48 29 L 26 16.5 C 33 10 41 6 50 6 Z" 
        fill="url(#servirGradTop)" 
      />
      {/* Linhas Brancas Diagonais no Topo */}
      <path d="M 28 32 L 72 57 L 68 60 L 24 35 Z" fill="#FFFFFF" opacity="0.95" />
      <path d="M 38 24 L 84 51 L 81 54 L 35 27 Z" fill="#FFFFFF" opacity="0.95" />

      {/* Arco Inferior Amarelo/Verde */}
      <path 
        d="M 50 94 C 25.7 94 6 74.3 6 50 C 6 48.5 6.2 47 6.5 45.5 L 64 79 C 59.8 89.2 55.2 94 50 94 Z" 
        fill="url(#servirGradBot)" 
      />
      <path 
        d="M 50 94 C 64 94 76 87.5 84 77.5 L 57 62 L 52 71 L 74 83.5 C 67 90 59 94 50 94 Z" 
        fill="url(#servirGradBot)" 
      />
      {/* Linhas Brancas Diagonais na Base */}
      <path d="M 72 68 L 28 43 L 32 40 L 76 65 Z" fill="#FFFFFF" opacity="0.95" />
      <path d="M 62 76 L 16 49 L 19 46 L 65 73 Z" fill="#FFFFFF" opacity="0.95" />
    </svg>
  );
};

/**
 * Bloco Esquerdo: Brasão + Secretaria da Administração / GOVERNO DO TOCANTINS
 */
export const LogoGovernoTocantins: React.FC<{ 
  size?: number; 
  className?: string;
  fontSizeTitle?: string;
  fontSizeSubtitle?: string;
}> = ({ 
  size = 54, 
  className = '',
  fontSizeTitle = 'text-[13px] sm:text-[14px]',
  fontSizeSubtitle = 'text-[15px] sm:text-[17px]'
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrasaoTocantinsVector size={size} />
      <div className="flex flex-col justify-center leading-tight">
        <span className={`${fontSizeTitle} text-black font-normal font-sans tracking-tight`}>
          Secretaria da administração
        </span>
        <span className={`${fontSizeSubtitle} text-black font-black font-sans uppercase tracking-wider`}>
          GOVERNO DO TOCANTINS
        </span>
      </div>
    </div>
  );
};

/**
 * Bloco Direito: Emblema S + "Servir" + "SAÚDE PARA QUEM CUIDA DO TOCANTINS"
 */
export const LogoServir: React.FC<{ 
  size?: number; 
  className?: string;
  fontSizeLogo?: string;
  fontSizeTagline?: string;
}> = ({ 
  size = 48, 
  className = '',
  fontSizeLogo = 'text-[32px] sm:text-[38px]',
  fontSizeTagline = 'text-[7.5px] sm:text-[8.5px]'
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <EmblemaServirVector size={size} />
      <div className="flex flex-col justify-center">
        <span className={`${fontSizeLogo} font-black tracking-tight leading-none text-[#004785] font-sans`}>
          Servir
        </span>
        <span className={`${fontSizeTagline} font-black uppercase tracking-tight text-black leading-tight mt-0.5 whitespace-nowrap`}>
          SAÚDE PARA QUEM CUIDA DO TOCANTINS
        </span>
      </div>
    </div>
  );
};

/**
 * Cabeçalho Oficial Integrado (Idêntico à imagem de referência do Tocantins / SERVIR)
 */
export const CabecalhoOficialServir: React.FC<{ 
  compact?: boolean;
  className?: string;
}> = ({ 
  compact = false,
  className = '' 
}) => {
  return (
    <div className={`w-full flex items-center justify-between gap-4 py-1.5 ${className}`}>
      {/* Lado Esquerdo: Governo do Tocantins */}
      <LogoGovernoTocantins 
        size={compact ? 44 : 56} 
        fontSizeTitle={compact ? 'text-[11px] sm:text-[12px]' : 'text-[13px] sm:text-[14px]'}
        fontSizeSubtitle={compact ? 'text-[13px] sm:text-[15px]' : 'text-[16px] sm:text-[18px]'}
      />

      {/* Lado Direito: Servir */}
      <LogoServir 
        size={compact ? 40 : 50} 
        fontSizeLogo={compact ? 'text-[26px] sm:text-[32px]' : 'text-[32px] sm:text-[38px]'}
        fontSizeTagline={compact ? 'text-[6.5px] sm:text-[7.5px]' : 'text-[7.5px] sm:text-[8.5px]'}
      />
    </div>
  );
};

// Aliases para compatibilidade reversa
export const BrasaoTocantins = BrasaoTocantinsVector;
