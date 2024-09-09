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

      // Load the initial body chart image
      fabric.Image.fromURL('https://st5.depositphotos.com/6464944/64924/v/1600/depositphotos_649242858-stock-illustration-human-male-body-anatomy-featuring.jpg', (img) => {
        img.scaleToWidth(300);
        img.scaleToHeight(400);
        fabricCanvasRef.current?.setBackgroundImage(img, fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current));
      });

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
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.getObjects().forEach((obj) => {
        if (obj !== fabricCanvasRef.current?.backgroundImage) {
          fabricCanvasRef.current?.remove(obj);
        }
      });
      fabricCanvasRef.current.renderAll();
    }
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