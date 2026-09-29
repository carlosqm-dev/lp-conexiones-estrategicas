import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';
import type { Milestone } from '../../data/history';

interface HistoryTimelineProps {
  milestones: Milestone[];
}

const SPRING = { type: 'spring', stiffness: 300, damping: 50, mass: 1 } as const;

export function HistoryTimeline({ milestones }: HistoryTimelineProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const baseId = useId();

  return (
    <div className="history-track">
      {milestones.map((milestone, index) => {
        const isActive = index === active;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <article
            key={`${milestone.year}-${milestone.title}`}
            className="history-item relative border-b border-primary/20"
            onMouseEnter={() => setActive(index)}
          >
            {isActive && (
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
            )}
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={cn(
                  'w-full cursor-pointer py-5 pl-5 text-left font-heading text-lg font-semibold uppercase leading-tight transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:text-xl',
                  isActive ? 'opacity-100' : 'opacity-45 hover:opacity-70'
                )}
              >
                {milestone.year} — {milestone.title}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reducedMotion ? { duration: 0 } : SPRING}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] pb-6 pl-5 text-sm leading-relaxed text-secondary md:text-base">
                    {milestone.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
