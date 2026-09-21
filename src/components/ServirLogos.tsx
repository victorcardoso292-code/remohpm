import React from 'react';

/**
 * Brasão de Armas do Estado do Tocantins Oficial (Vetor SVG Nítido em Alta Definição)
 */
export const BrasaoTocantinsVector: React.FC<{ size?: number; className?: string }> = ({ 
  size = 58, 
  className = '' 
}) => {
  return (
    <img 
      src="/logos/brasao-tocantins.svg" 
      alt="Brasão do Estado do Tocantins" 
      style={{ height: `${size}px`, width: 'auto' }}
      className={`inline-block flex-shrink-0 object-contain ${className}`}
      loading="eager"
    />
  );
};

/**
 * Emblema em Vetor SVG do SERVIR
 */
export const EmblemaServirVector: React.FC<{ size?: number; className?: string }> = ({ 
  size = 52, 
  className = '' 
}) => {
  return (
    <img 
      src="/logos/logo-servir.svg" 
      alt="Emblema Servir" 
      style={{ height: `${size}px`, width: 'auto' }}
      className={`inline-block flex-shrink-0 object-contain ${className}`}
      loading="eager"
    />
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
 * Bloco Direito: Logo Oficial SERVIR Completa (Emblema S + Servir + Tagline)
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
      <img 
        src="/logos/logo-servir.svg" 
        alt="Servir - Saúde para quem cuida do Tocantins" 
        style={{ height: `${size}px`, width: 'auto' }}
        className="object-contain"
        loading="eager"
      />
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

