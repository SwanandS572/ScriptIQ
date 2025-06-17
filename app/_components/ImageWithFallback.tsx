'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc,
  width,
  height,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      width={width}
      height={height}
      priority
    />
  );
}
