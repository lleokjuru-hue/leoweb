import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

interface IllustrationFrameProps {
  src: string;
  alt: string;
  caption?: string;
  metricBadge?: string;
  aspectClass?: string;
  className?: string;
  priority?: boolean;
}

export const IllustrationFrame: React.FC<IllustrationFrameProps> = ({
  src,
  alt,
  caption,
  metricBadge,
  aspectClass = 'aspect-[16/9]',
  className = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl border border-agro-border bg-agro-surface ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-agro-elevated via-agro-surface to-agro-bg animate-pulse" />
          )}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#0F2419] via-[#0B1912] to-[#070D0A] flex flex-col items-center justify-center p-6 text-center">
          <Sprout className="w-10 h-10 text-agro-emerald/70 mb-3" />
          <span className="text-sm font-medium text-agro-cream/80 max-w-xs">{alt}</span>
        </div>
      )}

      {/* Subtle natural vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-agro-bg/85 via-agro-bg/15 to-transparent pointer-events-none" />

      {(caption || metricBadge) && (
        <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-4 z-10">
          {caption && (
            <span className="text-xs sm:text-sm font-medium text-agro-cream/90 leading-snug drop-shadow-sm">
              {caption}
            </span>
          )}
          {metricBadge && (
            <span className="font-mono tabular-nums text-xs font-semibold text-agro-gold bg-agro-bg/85 backdrop-blur-md border border-agro-border px-3 py-1.5 rounded-lg shrink-0">
              {metricBadge}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
