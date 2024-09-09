import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

interface BodyChartProps {
  onChange: (dataUrl: string) => void;
  initialData?: string;
}

const BodyChart: React.FC<BodyChartProps> = ({ onChange, initialData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 300,
        height: 400,
      });

      fabricCanvasRef.current.freeDrawingBrush.color = 'red';
      fabricCanvasRef.current.freeDrawingBrush.width = 2;

      if (initialData) {
        fabric.Image.fromURL(initialData, (img) => {
          fabricCanvasRef.current?.clear();
          fabricCanvasRef.current?.add(img);
        });
      }

      fabricCanvasRef.current.on('path:created', () => {
        onChange(fabricCanvasRef.current?.toDataURL() || '');
      });
    }

    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, [onChange, initialData]);

  const clearCanvas = () => {
    fabricCanvasRef.current?.clear();
    onChange('');
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={clearCanvas}>ล้างรูปวาด</button>
    </div>
  );
};

export default BodyChart;