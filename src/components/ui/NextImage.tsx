import React from 'react';

export interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
}

/**
 * Next.js Image component compatible wrapper for React / Vite environments.
 * Supports `fill`, `priority`, responsive layouts, and object-fit.
 */
export const Image: React.FC<NextImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  loading,
  decoding,
  style,
  ...rest
}) => {
  const computedLoading = priority ? 'eager' : (loading || 'lazy');
  const computedDecoding = priority ? 'sync' : (decoding || 'async');

  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        loading={computedLoading}
        decoding={computedDecoding}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        style={{ ...style }}
        {...rest}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={computedLoading}
      decoding={computedDecoding}
      className={className}
      style={{ ...style }}
      {...rest}
    />
  );
};

export default Image;
