import React from 'react';

/**
 * Brasão de Armas do Estado do Tocantins Oficial (Vetor SVG Nítido em Alta Definição)
 */
export const BrasaoTocantinsVector: React.FC<{ size?: number; className?: string }> = ({ 
  size = 58, 
  className = '' 
}) => {
  return (
    <svg 
      viewBox="0 0 400 540" 
      style={{ height: `${size}px`, width: 'auto' }}
      className={`inline-block flex-shrink-0 object-contain ${className}`}
      aria-label="Brasão do Estado do Tocantins"
    >
      <defs>
        <linearGradient id="tocantinsSunGoldGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF9900" />
          <stop offset="100%" stopColor="#FFEA00" />
        </linearGradient>
        <path id="tocantinsTopRibbonArc" d="M 90 76 Q 200 40 310 76" fill="none" />
        <path id="tocantinsBotRibbonArc" d="M 30 468 Q 200 515 370 468" fill="none" />
        <clipPath id="tocantinsShieldClip">
          <ellipse cx="200" cy="275" rx="100" ry="138" />
        </clipPath>
      </defs>

      {/* Ramos de Louro Verde */}
      <g fill="#008A3B" stroke="#005A26" strokeWidth="0.75" strokeLinejoin="round">
        <path d="M 195 490 C 130 480 75 420 50 340 C 35 290 32 230 45 170 C 52 140 68 115 88 95 C 80 120 70 155 68 190 C 65 245 78 300 105 345 C 130 388 170 425 200 445 Z" />
        <path d="M 52 165 C 38 180 32 205 30 230 C 42 225 56 215 62 200 Z" />
        <path d="M 40 220 C 26 240 22 270 24 300 C 38 290 52 275 58 255 Z" />
        <path d="M 28 290 C 18 315 16 345 22 375 C 36 360 52 342 62 320 Z" />
        <path d="M 28 360 C 22 385 25 415 38 440 C 50 420 68 400 82 380 Z" />
        <path d="M 45 425 C 42 445 52 470 70 488 C 80 465 100 442 118 425 Z" />

        <path d="M 80 125 C 75 145 75 170 82 190 C 92 175 100 155 102 135 Z" />
        <path d="M 72 185 C 70 210 75 235 85 255 C 95 235 102 215 102 195 Z" />
        <path d="M 72 250 C 75 275 82 300 95 320 C 105 300 112 278 112 258 Z" />
        <path d="M 80 315 C 88 340 100 360 118 378 C 125 355 130 332 128 310 Z" />

        <path d="M 205 490 C 270 480 325 420 350 340 C 365 290 368 230 355 170 C 348 140 332 115 312 95 C 320 120 330 155 332 190 C 335 245 322 300 295 345 C 270 388 230 425 200 445 Z" />
        <path d="M 348 165 C 362 180 368 205 370 230 C 358 225 344 215 338 200 Z" />
        <path d="M 360 220 C 374 240 378 270 376 300 C 362 290 348 275 342 255 Z" />
        <path d="M 372 290 C 382 315 384 345 378 375 C 364 360 348 342 338 320 Z" />
        <path d="M 372 360 C 378 385 375 415 362 440 C 350 420 332 400 318 380 Z" />
        <path d="M 355 425 C 358 445 348 470 330 488 C 320 465 300 442 282 425 Z" />

        <path d="M 320 125 C 325 145 325 170 318 190 C 308 175 300 155 298 135 Z" />
        <path d="M 328 185 C 330 210 325 235 315 255 C 305 235 298 215 298 195 Z" />
        <path d="M 328 250 C 325 275 318 300 305 320 C 295 300 288 278 288 258 Z" />
        <path d="M 320 315 C 312 340 300 360 282 378 C 275 355 270 332 272 310 Z" />

        <path d="M 160 515 C 190 495 210 495 240 515 C 220 535 180 535 160 515 Z" fill="#007030" />
        <path d="M 195 490 C 185 520 165 538 140 540 C 170 532 190 515 200 495 C 210 515 230 532 260 540 C 235 538 215 520 205 490 Z" />
      </g>

      {/* Escudo Central Oval */}
      <ellipse cx="200" cy="275" rx="104" ry="142" fill="#FFFFFF" stroke="#1B1564" strokeWidth="6" />

      {/* Fundo Azul e Elementos Internos do Escudo */}
      <g clipPath="url(#tocantinsShieldClip)">
        <rect x="80" y="120" width="240" height="300" fill="#1B1564" />

        <g fill="#FFC700" stroke="#FFC700" strokeLinecap="round">
          <polygon points="200,165 196,250 204,250" />
          <polygon points="225,172 201,250 208,247" />
          <polygon points="175,172 192,247 199,250" />
          <polygon points="248,190 204,252 211,246" />
          <polygon points="152,190 189,246 196,252" />
          <polygon points="265,216 205,255 212,248" />
          <polygon points="135,216 188,248 195,255" />
          <polygon points="275,248 206,257 212,251" />
          <polygon points="125,248 188,251 194,257" />
        </g>

        <circle cx="200" cy="255" r="42" fill="url(#tocantinsSunGoldGrad)" stroke="#FFA000" strokeWidth="1.5" />
        <polygon points="200,248 70,335 70,370 200,283 330,370 330,335" fill="#FFFFFF" />
        <polygon points="200,265 95,355 95,395 200,325 305,395 305,355" fill="#1B1564" />
        <polygon points="200,312 115,415 285,415" fill="#FFC700" stroke="#E5A800" strokeWidth="2" />
      </g>

      {/* Faixas Laterais 1º JAN / 1989 */}
      <g>
        <path d="M 28 375 L 110 365 L 105 398 L 32 408 L 45 392 Z" fill="#1B1564" stroke="#120E45" strokeWidth="1" />
        <polygon points="110,365 118,375 105,398" fill="#120E45" />
        <text x="68" y="394" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="16.5" textAnchor="middle" letterSpacing="0.5">1º JAN</text>
      </g>

      <g>
        <path d="M 372 375 L 290 365 L 295 398 L 368 408 L 355 392 Z" fill="#1B1564" stroke="#120E45" strokeWidth="1" />
        <polygon points="290,365 282,375 295,398" fill="#120E45" />
        <text x="332" y="394" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="16.5" textAnchor="middle" letterSpacing="0.5">1989</text>
      </g>

      {/* Faixa Superior: CO YVY ORE RETAMA */}
      <g>
        <path d="M 72 82 Q 200 44 328 82 L 348 62 L 332 50 Q 200 16 68 50 L 52 62 Z" fill="#1B1564" />
        <polygon points="52,62 35,76 60,86 68,76" fill="#120E45" />
        <polygon points="348,62 365,76 340,86 332,76" fill="#120E45" />
        <text fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="2">
          <textPath href="#tocantinsTopRibbonArc" startOffset="50%" textAnchor="middle">
            CO YVY ORE RETAMA
          </textPath>
        </text>
      </g>

      {/* Estrela Amarela */}
      <polygon 
        points="200,38 208,58 230,58 212,71 219,92 200,79 181,92 188,71 170,58 192,58" 
        fill="#FFD200" 
        stroke="#1B1564" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
      />

      {/* Faixa Inferior: ESTADO DO TOCANTINS */}
      <g>
        <path d="M 18 450 Q 200 495 382 450 L 388 478 Q 200 528 12 478 Z" fill="#1B1564" />
        <polygon points="12,478 0,460 22,446 25,462" fill="#120E45" />
        <polygon points="388,478 400,460 378,446 375,462" fill="#120E45" />
        <text fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="21" letterSpacing="3.2">
          <textPath href="#tocantinsBotRibbonArc" startOffset="50%" textAnchor="middle">
            ESTADO DO TOCANTINS
          </textPath>
        </text>
      </g>
    </svg>
  );
};

/**
 * Emblema em Vetor SVG do SERVIR (100% Nítido e Auto-Contido)
 */
export const EmblemaServirVector: React.FC<{ size?: number; className?: string }> = ({ 
  size = 52, 
  className = '' 
}) => {
  return (
    <svg 
      viewBox="0 0 210 240" 
      style={{ height: `${size}px`, width: 'auto' }}
      className={`inline-block flex-shrink-0 object-contain ${className}`}
      aria-label="Emblema Servir"
    >
      <defs>
        <linearGradient id="emblemServirBlueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#004D8C" />
          <stop offset="60%" stopColor="#02639E" />
          <stop offset="100%" stopColor="#0A7E9F" />
        </linearGradient>
        <linearGradient id="emblemServirGreenYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8DB82A" />
          <stop offset="50%" stopColor="#C2CE27" />
          <stop offset="100%" stopColor="#FFD400" />
        </linearGradient>
        <clipPath id="emblemCircleClipUnique">
          <circle cx="105" cy="120" r="82" />
        </clipPath>
      </defs>

      <g clipPath="url(#emblemCircleClipUnique)">
        <rect x="15" y="30" width="180" height="180" fill="url(#emblemServirGreenYellowGrad)" />
        <path d="M 15 30 L 195 30 L 195 105 L 35 158 Z" fill="url(#emblemServirBlueGrad)" />
        <polygon points="10,166 180,98 195,116 25,184" fill="#FFFFFF" />

        <polygon points="45,95 145,55 149,63 49,103" fill="#FFFFFF" />
        <polygon points="75,82 170,44 174,52 79,90" fill="#FFFFFF" />
        <polygon points="20,135 100,103 104,111 24,143" fill="#FFFFFF" />

        <polygon points="50,188 135,154 139,162 54,196" fill="#FFFFFF" />
        <polygon points="80,195 158,164 162,172 84,203" fill="#FFFFFF" />
      </g>
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
  size = 56, 
  className = '',
  fontSizeTitle = 'text-[13px] sm:text-[14px]',
  fontSizeSubtitle = 'text-[15px] sm:text-[18px]'
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrasaoTocantinsVector size={size} />
      <div className="flex flex-col justify-center leading-tight">
        <span className={`${fontSizeTitle} text-slate-900 font-normal font-sans tracking-tight`}>
          Secretaria da administração
        </span>
        <span className={`${fontSizeSubtitle} text-slate-900 font-black font-sans uppercase tracking-wider`}>
          GOVERNO DO TOCANTINS
        </span>
      </div>
    </div>
  );
};

/**
 * Bloco Direito: Logo Oficial SERVIR Completa (Emblema S + Servir + Tagline) 100% Vetorial
 */
export const LogoServir: React.FC<{ 
  size?: number; 
  className?: string;
}> = ({ 
  size = 48, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        viewBox="0 0 680 240" 
        style={{ height: `${size}px`, width: 'auto' }}
        className="object-contain"
        aria-label="Servir - Saúde para quem cuida do Tocantins"
      >
        <defs>
          <linearGradient id="logoServirBlueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#004D8C" />
            <stop offset="60%" stopColor="#02639E" />
            <stop offset="100%" stopColor="#0A7E9F" />
          </linearGradient>
          <linearGradient id="logoServirGreenYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8DB82A" />
            <stop offset="50%" stopColor="#C2CE27" />
            <stop offset="100%" stopColor="#FFD400" />
          </linearGradient>
          <clipPath id="logoEmblemCircleClip">
            <circle cx="105" cy="120" r="82" />
          </clipPath>
        </defs>

        <g clipPath="url(#logoEmblemCircleClip)">
          <rect x="15" y="30" width="180" height="180" fill="url(#logoServirGreenYellowGrad)" />
          <path d="M 15 30 L 195 30 L 195 105 L 35 158 Z" fill="url(#logoServirBlueGrad)" />
          <polygon points="10,166 180,98 195,116 25,184" fill="#FFFFFF" />

          <polygon points="45,95 145,55 149,63 49,103" fill="#FFFFFF" />
          <polygon points="75,82 170,44 174,52 79,90" fill="#FFFFFF" />
          <polygon points="20,135 100,103 104,111 24,143" fill="#FFFFFF" />

          <polygon points="50,188 135,154 139,162 54,196" fill="#FFFFFF" />
          <polygon points="80,195 158,164 162,172 84,203" fill="#FFFFFF" />
        </g>

        <text 
          x="215" 
          y="142" 
          fill="#004785" 
          fontFamily="sans-serif" 
          fontWeight="900" 
          fontSize="112" 
          letterSpacing="-2.5"
        >
          Servir
        </text>

        <text 
          x="218" 
          y="180" 
          fill="#111827" 
          fontFamily="sans-serif" 
          fontWeight="900" 
          fontSize="19.5" 
          letterSpacing="-0.3"
        >
          SAÚDE PARA QUEM CUIDA DO TOCANTINS
        </text>
      </svg>
    </div>
  );
};

/**
 * Cabeçalho Oficial Integrado (Idêntico à imagem oficial do Estado do Tocantins / SERVIR)
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
        size={compact ? 44 : 58} 
        fontSizeTitle={compact ? 'text-[11px] sm:text-[12px]' : 'text-[13px] sm:text-[14px]'}
        fontSizeSubtitle={compact ? 'text-[13px] sm:text-[15px]' : 'text-[16px] sm:text-[18px]'}
      />

      {/* Lado Direito: Servir */}
      <LogoServir 
        size={compact ? 40 : 50} 
      />
    </div>
  );
};

// Aliases para compatibilidade reversa
export const BrasaoTocantins = BrasaoTocantinsVector;

/**
 * Renderizador de Alta Resolução em Canvas do Cabeçalho Oficial do SERVIR (380+ DPI)
 * Produz um PNG Base64 cristalino para inclusão direta no jsPDF
 */
export function getServirHeaderCanvasDataUrl(): string {
  if (typeof document === 'undefined') return '';

  try {
    const canvas = document.createElement('canvas');
    // Escala super-amostrada 15x (2910 x 210 px) para nitidez absoluta no PDF A4 (194mm x 14mm)
    canvas.width = 2910;
    canvas.height = 210;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Fundo branco limpo
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ativar anti-aliasing de alta qualidade
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // ----------------------------------------------------
    // 1. BRASÃO DO ESTADO DO TOCANTINS (LADO ESQUERDO)
    // ----------------------------------------------------
    const bX = 95;
    const bY = 105;

    ctx.save();
    ctx.translate(bX, bY);
    const bScale = 1.08;
    ctx.scale(bScale, bScale);

    // Ramos de Louro Verde (Esquerda e Direita)
    ctx.fillStyle = '#008A3B';
    ctx.beginPath();
    // Esquerda
    ctx.ellipse(-45, -5, 12, 6, -0.6, 0, Math.PI * 2);
    ctx.ellipse(-52, 15, 13, 6, -0.3, 0, Math.PI * 2);
    ctx.ellipse(-54, 35, 13, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(-48, 55, 13, 6, 0.4, 0, Math.PI * 2);
    ctx.ellipse(-32, 70, 13, 6, 0.8, 0, Math.PI * 2);
    // Direita
    ctx.ellipse(45, -5, 12, 6, 0.6, 0, Math.PI * 2);
    ctx.ellipse(52, 15, 13, 6, 0.3, 0, Math.PI * 2);
    ctx.ellipse(54, 35, 13, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(48, 55, 13, 6, -0.4, 0, Math.PI * 2);
    ctx.ellipse(32, 70, 13, 6, -0.8, 0, Math.PI * 2);
    ctx.fill();

    // Laço verde inferior
    ctx.fillStyle = '#007030';
    ctx.beginPath();
    ctx.ellipse(0, 75, 15, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Escudo Oval com borda azul escura
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#1B1564';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 25, 42, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Interior Azul do Escudo
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, 25, 39, 45, 0, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = '#1B1564';
    ctx.fillRect(-50, -30, 100, 110);

    // Sol Nascente Dourado com Raios Nítidos
    const sunGrad = ctx.createLinearGradient(0, 40, 0, 0);
    sunGrad.addColorStop(0, '#FF9900');
    sunGrad.addColorStop(1, '#FFEA00');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(0, 20, 14, 0, Math.PI * 2);
    ctx.fill();

    // Raios do Sol
    ctx.fillStyle = '#FFC700';
    ctx.strokeStyle = '#FFC700';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 2); ctx.lineTo(0, -10);
    ctx.moveTo(14, 6); ctx.lineTo(24, -2);
    ctx.moveTo(-14, 6); ctx.lineTo(-24, -2);
    ctx.moveTo(20, 18); ctx.lineTo(30, 15);
    ctx.moveTo(-20, 18); ctx.lineTo(-30, 15);
    ctx.stroke();

    // Faixa Branca Central Chevron
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(0, 14);
    ctx.lineTo(-45, 48);
    ctx.lineTo(-45, 60);
    ctx.lineTo(0, 26);
    ctx.lineTo(45, 60);
    ctx.lineTo(45, 48);
    ctx.closePath();
    ctx.fill();

    // Montanha Triangular / Chevron Azul
    ctx.fillStyle = '#1B1564';
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(-38, 56);
    ctx.lineTo(-38, 68);
    ctx.lineTo(0, 36);
    ctx.lineTo(38, 68);
    ctx.lineTo(38, 56);
    ctx.closePath();
    ctx.fill();

    // Triângulo Amarelo Interno na Base
    ctx.fillStyle = '#FFC700';
    ctx.beginPath();
    ctx.moveTo(0, 32);
    ctx.lineTo(-26, 68);
    ctx.lineTo(26, 68);
    ctx.closePath();
    ctx.fill();

    ctx.restore(); // Fim do clip do escudo

    // Faixa Superior: CO YVY ORE RETAMA
    ctx.fillStyle = '#1B1564';
    ctx.beginPath();
    ctx.rect(-46, -42, 92, 14);
    ctx.fill();

    // Estrela de 5 Pontas Superior
    ctx.fillStyle = '#FFD200';
    ctx.strokeStyle = '#1B1564';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = 0 + 10 * Math.cos(angle);
      const y = -22 + 10 * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 8.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CO YVY ORE RETAMA', 0, -32);

    // Faixas Laterais com Datas
    ctx.fillStyle = '#1B1564';
    ctx.fillRect(-62, 45, 30, 12);
    ctx.fillRect(32, 45, 30, 12);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('1º JAN', -47, 54);
    ctx.fillText('1989', 47, 54);

    // Faixa Inferior: ESTADO DO TOCANTINS
    ctx.fillStyle = '#1B1564';
    ctx.beginPath();
    ctx.roundRect(-64, 68, 128, 16, 4);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 9.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('ESTADO DO TOCANTINS', 0, 80);

    ctx.restore(); // Fim da transformação do brasão

    // ----------------------------------------------------
    // 2. TEXTO: Secretaria da administração / GOVERNO DO TOCANTINS
    // ----------------------------------------------------
    ctx.textAlign = 'left';
    ctx.fillStyle = '#111827';
    ctx.font = 'normal 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.fillText('Secretaria da administração', 195, 84);

    ctx.font = '900 55px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.letterSpacing = '1.2px';
    ctx.fillText('GOVERNO DO TOCANTINS', 195, 146);

    // ----------------------------------------------------
    // 3. LOGO SERVIR (LADO DIREITO - 100% NÍTIDA)
    // ----------------------------------------------------
    const sX = 2170;
    const sY = 105;
    const sR = 72;

    ctx.save();
    ctx.beginPath();
    ctx.arc(sX, sY, sR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Gradiente Verde-Amarelo Base
    const gradGreen = ctx.createLinearGradient(sX - sR, sY - sR, sX + sR, sY + sR);
    gradGreen.addColorStop(0, '#8DB82A');
    gradGreen.addColorStop(0.5, '#C2CE27');
    gradGreen.addColorStop(1, '#FFD400');
    ctx.fillStyle = gradGreen;
    ctx.fillRect(sX - sR, sY - sR, sR * 2, sR * 2);

    // Gradiente Azul Superior
    const gradBlue = ctx.createLinearGradient(sX - sR, sY + sR, sX + sR, sY - sR);
    gradBlue.addColorStop(0, '#004D8C');
    gradBlue.addColorStop(0.6, '#02639E');
    gradBlue.addColorStop(1, '#0A7E9F');
    ctx.fillStyle = gradBlue;

    ctx.beginPath();
    ctx.moveTo(sX - sR, sY - sR);
    ctx.lineTo(sX + sR, sY - sR);
    ctx.lineTo(sX + sR, sY - 14);
    ctx.lineTo(sX + 28, sY - 6);
    ctx.lineTo(sX + 20, sY - 20);
    ctx.lineTo(sX - 6, sY - 12);
    ctx.lineTo(sX - 4, sY + 6);
    ctx.lineTo(sX - 35, sY + 12);
    ctx.lineTo(sX - sR, sY + 18);
    ctx.closePath();
    ctx.fill();

    // Linha Divisória Branca Central (Espinha do S)
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(sX - sR - 10, sY + 22);
    ctx.lineTo(sX - 35, sY + 15);
    ctx.lineTo(sX - 6, sY + 8);
    ctx.lineTo(sX - 8, sY - 10);
    ctx.lineTo(sX + 18, sY - 18);
    ctx.lineTo(sX + 26, sY - 5);
    ctx.lineTo(sX + sR + 10, sY - 16);
    ctx.stroke();

    // Recortes brancos diagonais no azul
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(sX - 32, sY - 30, 26, 7);
    ctx.fillRect(sX + 8, sY + 22, 26, 7);

    ctx.restore(); // Fim do clip do emblema S

    // Texto: "Servir"
    ctx.textAlign = 'left';
    ctx.fillStyle = '#004785';
    ctx.font = '900 105px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.letterSpacing = '-2px';
    ctx.fillText('Servir', 2268, 114);

    // Texto: "SAÚDE PARA QUEM CUIDA DO TOCANTINS"
    ctx.fillStyle = '#111827';
    ctx.font = '900 24.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.letterSpacing = '-0.4px';
    ctx.fillText('SAÚDE PARA QUEM CUIDA DO TOCANTINS', 2272, 155);

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Erro ao renderizar cabeçalho canvas do Servir:', err);
    return '';
  }
}

/**
 * Logotipo Vetorial do Hospital Palmas Medical (Kora Saúde)
 */
export const LogoHospitalPalmasMedical: React.FC<{
  size?: number;
  compact?: boolean;
  className?: string;
}> = ({
  size = 46,
  compact = false,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Emblema Cruz Hospitalar Teal */}
      <div 
        style={{ width: `${size}px`, height: `${size}px` }} 
        className="rounded-xl bg-[#1D787A] flex items-center justify-center text-white shadow-2xs flex-shrink-0"
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          style={{ width: `${size * 0.62}px`, height: `${size * 0.62}px` }}
        >
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>

      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span className={`${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-2xl'} font-extrabold tracking-tight text-[#9E1B4F]`}>
            Medical
          </span>
          <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-bold bg-[#EBF5F5] text-[#1D787A] border border-[#C8E4E3]">
            HPM
          </span>
        </div>
        <div className="flex items-center gap-1 -mt-0.5">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-800 tracking-tight">
            HOSPITAL PALMAS MEDICAL
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-600">
            Kora<span className="font-normal text-slate-400">Saúde</span>
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Emblema Estrela da Vida / Central de Remoções (Vetor SVG)
 */
export const LogoCentralRemocoes: React.FC<{
  size?: number;
  compact?: boolean;
  className?: string;
}> = ({
  size = 44,
  compact = false,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex flex-col items-end justify-center leading-tight text-right">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider bg-rose-50 text-[#9E1B4F] border border-rose-200">
            24 HORAS
          </span>
          <span className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} font-black tracking-tight text-slate-900 uppercase`}>
            Central de Remoções
          </span>
        </div>
        <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#1D787A] tracking-tight">
          REGULAÇÃO E TRANSPORTE INTER-HOSPITALAR
        </span>
      </div>

      {/* Ícone Estrela da Vida / Ambulância em SVG */}
      <div 
        style={{ width: `${size}px`, height: `${size}px` }} 
        className="rounded-xl bg-[#0F4C5C] text-white flex items-center justify-center shadow-2xs flex-shrink-0"
      >
        <svg 
          viewBox="0 0 100 100" 
          style={{ width: `${size * 0.72}px`, height: `${size * 0.72}px` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Estrela da Vida de 6 pontas */}
          <path 
            d="M44 8 H56 V32 L77 20 L83 30 L62 42 L83 54 L77 64 L56 52 V76 H44 V52 L23 64 L17 54 L38 42 L17 30 L23 20 L44 32 Z" 
            fill="#FFFFFF" 
          />
          {/* Bastão de Asclépio Central */}
          <line x1="50" y1="24" x2="50" y2="70" stroke="#0F4C5C" strokeWidth="4.5" strokeLinecap="round" />
          <path 
            d="M45 62 C43 55 57 52 50 44 C43 36 57 32 49 26" 
            stroke="#FFD700" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            fill="none" 
          />
        </svg>
      </div>
    </div>
  );
};

/**
 * Cabeçalho Completo Padrão Hospitalar (Frente e Verso)
 */
export const CabecalhoHospitalarPadrao: React.FC<{
  compact?: boolean;
  plano?: string;
  className?: string;
}> = ({
  compact = false,
  plano = '',
  className = ''
}) => {
  return (
    <div className={`w-full flex items-center justify-between gap-3 py-1.5 ${className}`}>
      {/* Lado Esquerdo: Marca Oficial Hospital Palmas Medical */}
      <LogoHospitalPalmasMedical size={compact ? 36 : 46} compact={compact} />

      {/* Centro: Título do Documento */}
      <div className="flex flex-col items-center justify-center text-center px-2">
        <h1 className={`${compact ? 'text-[11px] sm:text-[12px]' : 'text-[12px] sm:text-[13px]'} font-black text-slate-900 uppercase tracking-wide leading-tight`}>
          FORMULÁRIO DE SOLICITAÇÃO DE REMOÇÃO
        </h1>
        <span className="text-[9.5px] sm:text-[10.5px] font-semibold text-slate-600">
          Transporte Inter-Hospitalar e Atendimento Especializado
        </span>
        {plano && (
          <span className="text-[9px] font-bold text-[#1D787A] mt-0.5">
            CONVÊNIO / PLANO: <span className="uppercase text-slate-800">{plano}</span>
          </span>
        )}
      </div>

      {/* Lado Direito: Central de Remoções */}
      <LogoCentralRemocoes size={compact ? 36 : 44} compact={compact} />
    </div>
  );
};

/**
 * Renderizador Canvas de Alta Resolução do Cabeçalho Padrão Hospitalar (380+ DPI)
 * Produz um PNG Base64 cristalino para inclusão direta no jsPDF
 */
export function getHospitalarPadraoHeaderCanvasDataUrl(plano: string = ''): string {
  if (typeof document === 'undefined') return '';

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 2910;
    canvas.height = 210;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Fundo branco limpo
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // ----------------------------------------------------
    // 1. LADO ESQUERDO: HOSPITAL PALMAS MEDICAL
    // ----------------------------------------------------
    // Emblema quadrado arredondado teal
    const mX = 35;
    const mY = 35;
    const mW = 140;
    const mH = 140;
    const mR = 24;

    ctx.fillStyle = '#1D787A';
    ctx.beginPath();
    ctx.moveTo(mX + mR, mY);
    ctx.lineTo(mX + mW - mR, mY);
    ctx.quadraticCurveTo(mX + mW, mY, mX + mW, mY + mR);
    ctx.lineTo(mX + mW, mY + mH - mR);
    ctx.quadraticCurveTo(mX + mW, mY + mH, mX + mW - mR, mY + mH);
    ctx.lineTo(mX + mR, mY + mH);
    ctx.quadraticCurveTo(mX, mY + mH, mX, mY + mH - mR);
    ctx.lineTo(mX, mY + mR);
    ctx.quadraticCurveTo(mX, mY, mX + mR, mY);
    ctx.closePath();
    ctx.fill();

    // Cruz médica branca central
    ctx.fillStyle = '#FFFFFF';
    // Barra horizontal
    ctx.fillRect(mX + 28, mY + 54, 84, 32);
    // Barra vertical
    ctx.fillRect(mX + 54, mY + 28, 32, 84);

    // Tipografia: Medical
    ctx.textAlign = 'left';
    ctx.fillStyle = '#9E1B4F';
    ctx.font = '900 86px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.letterSpacing = '-1.5px';
    ctx.fillText('Medical', 205, 112);

    // Badge HPM
    const bW = 110;
    const bH = 50;
    const bX = 540;
    const bY = 62;
    ctx.fillStyle = '#EBF5F5';
    ctx.strokeStyle = '#C8E4E3';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(bX, bY, bW, bH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#1D787A';
    ctx.font = '900 32px sans-serif';
    ctx.letterSpacing = '0.5px';
    ctx.fillText('HPM', bX + 18, bY + 36);

    // Subtítulo: Hospital Palmas Medical • Kora Saúde
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 30px sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('HOSPITAL PALMAS MEDICAL', 208, 155);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 28px sans-serif';
    ctx.fillText('  •  Kora Saúde', 710, 155);

    // ----------------------------------------------------
    // 2. CENTRO: TÍTULO DO FORMULÁRIO DE REMOÇÃO
    // ----------------------------------------------------
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.letterSpacing = '0.5px';
    ctx.fillText('FORMULÁRIO DE SOLICITAÇÃO DE REMOÇÃO', 1455, 84);

    ctx.fillStyle = '#475569';
    ctx.font = '600 28px sans-serif';
    ctx.fillText('Transporte Inter-Hospitalar e Atendimento Especializado', 1455, 124);

    if (plano) {
      ctx.fillStyle = '#1D787A';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(`CONVÊNIO / PLANO: ${plano.toUpperCase()}`, 1455, 160);
    }

    // ----------------------------------------------------
    // 3. LADO DIREITO: CENTRAL DE REMOÇÕES & ESTRELA DA VIDA
    // ----------------------------------------------------
    ctx.textAlign = 'right';

    // Badge "24 HORAS"
    const tagW = 145;
    const tagH = 42;
    const tagX = 2670 - tagW;
    const tagY = 46;
    ctx.fillStyle = '#FFF1F2';
    ctx.strokeStyle = '#FECDD3';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(tagX, tagY, tagW, tagH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#9E1B4F';
    ctx.font = '900 24px sans-serif';
    ctx.fillText('24 HORAS', 2652, 76);

    // Título "Central de Remoções"
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.letterSpacing = '-0.5px';
    ctx.fillText('CENTRAL DE REMOÇÕES', tagX - 16, 80);

    // Subtítulo
    ctx.fillStyle = '#1D787A';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('REGULAÇÃO E TRANSPORTE INTER-HOSPITALAR', 2670, 126);

    // Emblema Estrela da Vida no canto direito
    const rX = 2735;
    const rY = 35;
    const rW = 140;
    const rH = 140;
    const rR = 24;

    ctx.fillStyle = '#0F4C5C';
    ctx.beginPath();
    ctx.roundRect(rX, rY, rW, rH, rR);
    ctx.fill();

    // Estrela de 6 pontas (Star of Life)
    ctx.save();
    ctx.translate(rX + 70, rY + 70);
    const starScale = 1.05;
    ctx.scale(starScale, starScale);

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    // 6 pontas com cruzamento
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 3);
      ctx.fillRect(-10, -48, 20, 96);
      ctx.restore();
    }

    // Bastão central
    ctx.fillStyle = '#0F4C5C';
    ctx.fillRect(-4, -34, 8, 68);

    // Serpente dourada
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-8, 22);
    ctx.quadraticCurveTo(-14, 10, 0, 0);
    ctx.quadraticCurveTo(14, -10, 0, -20);
    ctx.quadraticCurveTo(-12, -26, -4, -30);
    ctx.stroke();

    ctx.restore();

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Erro ao renderizar cabeçalho canvas hospitalar padrão:', err);
    return '';
  }
}

