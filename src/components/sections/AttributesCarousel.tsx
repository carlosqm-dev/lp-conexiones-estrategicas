import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../ui/carousel';

import type { Attribute } from '../../data/attributes';

export function AttributesCarousel({ attributes, headline }: { attributes: Attribute[]; headline: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setSelected(api.selectedScrollSnap());
    };

    sync();
    api.on('select', sync);
    api.on('reInit', sync);

    return () => {
      api.off('select', sync);
      api.off('reInit', sync);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ align: 'center', loop: true }} aria-label="Atributos de la marca">
      <div className="border-b border-primary/20 pb-8">
        <h2 className="display-title text-center text-6xl md:text-8xl lg:whitespace-nowrap lg:text-[clamp(4rem,6.4vw,6rem)]">{headline}</h2>
      </div>

      <CarouselContent className="-ml-3 items-center pb-6 pt-8 sm:-ml-5 md:-ml-6 md:py-14">
        {attributes.map((attr, index) => {
          const isActive = index === selected;

          return (
            <CarouselItem
              key={attr.title}
              aria-label={`${index + 1} de ${attributes.length}`}
              className="basis-[86%] pl-3 sm:basis-[68%] sm:pl-5 md:basis-[44%] md:pl-6 lg:basis-[36%] xl:basis-[32%]"
            >
              <button
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={
                  isActive
                    ? `${attr.title}. ${attr.description}. Atributo seleccionado`
                    : `Mostrar ${attr.title}`
                }
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'group block w-full origin-center cursor-pointer rounded-full text-center transition-[transform,opacity] duration-500 ease-out focus-visible:outline-none',
                  isActive
                    ? 'relative z-10 opacity-100 md:-translate-y-[8px]'
                    : 'opacity-40 hover:opacity-70 md:translate-y-[8px] md:scale-[0.94]'
                )}
              >
                <span
                  className={cn(
                    'flex h-[20rem] items-center justify-center overflow-hidden rounded-xl border px-7 py-10 transition-[background-color,border-color,color,box-shadow] duration-500 sm:h-[22rem] sm:px-10 md:h-[24rem] md:px-12',
                    isActive
                      ? 'border-primary bg-primary shadow-xl'
                      : 'border-primary/20 bg-background-alt text-primary group-hover:border-primary/40'
                  )}
                >
                  <span className="block w-full max-w-lg">
                    <span
                      className={cn(
                        'block font-heading text-3xl font-semibold uppercase leading-[0.92] transition-colors duration-500 md:text-4xl',
                        isActive ? 'text-accent' : 'text-primary'
                      )}
                    >
                      {attr.title}
                    </span>

                    <span
                      aria-hidden={!isActive}
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
                        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="mt-5 block text-base leading-relaxed text-primary-foreground md:text-lg">
                          {attr.description}
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <div className="flex items-center justify-center gap-2 border-t border-primary/20 pt-4">
        <CarouselPrevious className="static h-12 w-12 translate-y-0 rounded-full border-primary/20 bg-transparent shadow-none hover:bg-primary hover:text-background" />
        <CarouselNext className="static h-12 w-12 translate-y-0 rounded-full border-primary/20 bg-transparent shadow-none hover:bg-primary hover:text-background" />
      </div>
    </Carousel>
  );
}
