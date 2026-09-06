import { useEffect, useRef } from 'react';

interface RadarChartProps {
  values: number[]; // Array of 5 numbers between 0 and 1
  size?: number;
}

export const RadarChart = ({ values, size = 300 }: RadarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const labels = ['Precisão', 'Coerência TRI', 'Agilidade', 'Retenção', 'Imunidade'];
    const numAxes = 5;
    const angleStep = (Math.PI * 2) / numAxes;

    // Draw background webs
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      const r = radius * (i / 5);
      ctx.beginPath();
      for (let j = 0; j < numAxes; j++) {
        const angle = j * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw axes and labels
    for (let j = 0; j < numAxes; j++) {
      const angle = j * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const labelRadius = radius + (j === 0 ? 15 : 20); // Adjust top label to not clip
      ctx.fillText(
        labels[j],
        centerX + Math.cos(angle) * labelRadius,
        centerY + Math.sin(angle) * labelRadius
      );
    }

    // Draw values polygon
    ctx.beginPath();
    for (let j = 0; j < numAxes; j++) {
      const angle = j * angleStep - Math.PI / 2;
      const r = radius * Math.max(0, Math.min(1, values[j] || 0));
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)'; // cyan-400 with opacity
    ctx.fill();
    ctx.strokeStyle = '#38bdf8'; // cyan-400
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw value points
    for (let j = 0; j < numAxes; j++) {
      const angle = j * angleStep - Math.PI / 2;
      const r = radius * Math.max(0, Math.min(1, values[j] || 0));
      ctx.beginPath();
      ctx.arc(
        centerX + Math.cos(angle) * r,
        centerY + Math.sin(angle) * r,
        4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = '#0ea5e9'; // sky-500
      ctx.fill();
    }
  }, [values, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="mx-auto bg-slate-900/50 rounded-full"
    />
  );
};
