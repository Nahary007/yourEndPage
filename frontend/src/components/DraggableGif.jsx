import React, { useState, useRef, useEffect } from 'react';

const DraggableGif = ({
  src,
  position,
  onPositionChange,
  containerRef
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const gifRef = useRef(null);

  const handleMouseDown = (e) => {
    if (gifRef.current) {
      const rect = gifRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleTouchStart = (e) => {
    if (gifRef.current && e.touches[0]) {
      const rect = gifRef.current.getBoundingClientRect();
      setOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left - offset.x;
        const y = e.clientY - containerRect.top - offset.y;

        const maxX = containerRect.width - (gifRef.current?.offsetWidth || 100);
        const maxY = containerRect.height - (gifRef.current?.offsetHeight || 100);

        const boundedX = Math.min(Math.max(0, x), maxX);
        const boundedY = Math.min(Math.max(0, y), maxY);

        onPositionChange({ x: boundedX, y: boundedY });
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging && containerRef.current && e.touches[0]) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - containerRect.left - offset.x;
        const y = e.touches[0].clientY - containerRect.top - offset.y;

        const maxX = containerRect.width - (gifRef.current?.offsetWidth || 100);
        const maxY = containerRect.height - (gifRef.current?.offsetHeight || 100);

        const boundedX = Math.min(Math.max(0, x), maxX);
        const boundedY = Math.min(Math.max(0, y), maxY);

        onPositionChange({ x: boundedX, y: boundedY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, offset, containerRef, onPositionChange]);

  return (
    <div
      ref={gifRef}
      className={`absolute cursor-move ${isDragging ? 'z-30 opacity-80' : 'z-20'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.1s ease'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img 
        src={src} 
        alt="GIF draggable" 
        className="max-w-[150px] max-h-[150px] rounded-md shadow-md"
        draggable="false"
      />
    </div>
  );
};

export default DraggableGif;
