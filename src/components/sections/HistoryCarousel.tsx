import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

import type { HistoryPhoto } from '../../data/history';

const AUTOPLAY_MS = 3000;
const SWIPE_THRESHOLD = 40;
const VISIBLE_RANGE = 2;
const EASE = [0.22, 1, 0.36, 1] as const;

// Shortest signed distance between two indexes on a looping track.
function relativeOffset(index: number, active: number, count: number) {
  let rel = index - active;
  const half = Math.floor(count / 2);
  if (rel > half) rel -= count;
  if (rel < -half) rel += count;
  return rel;
}

export function HistoryCarousel({ photos }: { photos: HistoryPhoto[] }) {
  const count = photos.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const reducedMotion = useReducedMotion();

  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false);

  const goTo = useCallback((index: number) => setActive(((index % count) + count) % count), [count]);

  const isPlaying = !reducedMotion && count > 1;

  useEffect(() => {
    if (!isPlaying || !inView || interacting) return;
    const id = window.setInterval(() => setActive((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPlaying, inView, interacting, count]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragStartX.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? active + 1 : active - 1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Fotos de la historia de G&S"
      className="flex flex-1 flex-col"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStartX.current = null)}
        aria-live={isPlaying ? 'off' : 'polite'}
        className="relative flex-1 touch-pan-y select-none overflow-hidden [perspective:1200px] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary"
      >
        {photos.map((photo, index) => {
          const rel = relativeOffset(index, active, count);
          const abs = Math.abs(rel);
          const isActive = rel === 0;
          const hidden = abs > VISIBLE_RANGE;

          const animate = reducedMotion
            ? { opacity: isActive ? 1 : 0 }
            : {
                x: `${rel * 46}%`,
                z: -abs * 140,
                rotateY: rel * -18,
                scale: isActive ? 1 : 0.88,
                opacity: hidden ? 0 : 1 - abs * 0.3,
                filter: `blur(${isActive ? 0 : 6}px)`,
              };

          return (
            <motion.figure
              key={photo.src}
              role="group"
              aria-roledescription="foto"
              aria-label={`${index + 1} de ${count}`}
              aria-hidden={!isActive}
              initial={false}
              animate={animate}
              transition={{ duration: reducedMotion ? 0.3 : 0.8, ease: EASE }}
              style={{ zIndex: count - abs }}
              className={cn(
                'absolute inset-x-[16%] inset-y-4 m-0 overflow-hidden rounded-lg bg-primary shadow-2xl [transform-style:preserve-3d] md:inset-y-5',
                !isActive && 'pointer-events-none'
              )}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover object-center"
              />
            </motion.figure>
          );
        })}
      </div>

      <div className="flex items-center gap-4 px-5 pb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80 md:px-6 md:pb-5">
        <span aria-hidden="true" className="tabular-nums">
          {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>

        <div className="flex flex-1 items-center gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ver foto ${index + 1} de ${count}`}
              aria-current={index === active ? 'true' : undefined}
              className="group flex h-6 cursor-pointer items-center focus-visible:outline-none"
            >
              <span
                className={cn(
                  'block h-1 rounded-full transition-[width,background-color] duration-500 group-focus-visible:ring-2 group-focus-visible:ring-primary',
                  index === active ? 'w-6 bg-primary' : 'w-2 bg-primary/30 group-hover:bg-primary/55'
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
