import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { distinctUntilChanged, exhaustMap, finalize, fromEvent, map, switchMap, takeUntil, tap, timer } from 'rxjs';

const minmax = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value));

const DnDPage = () => {
  const [blockEl, setBlockEl] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [isLifted, setIsLifted] = useState(false);
  const [shadowPosition, setShadowPosition] = useState<typeof position>(position);

  const sendPosition = useCallback((position: { top: number; left: number }) => {
    return timer(50).pipe(tap(() => setShadowPosition(position)));
  }, []);

  useEffect(() => {
    if (!blockEl) return;

    const mouseDown$ = fromEvent<MouseEvent>(blockEl, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(window, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(window, 'mouseup');

    const subscription = mouseDown$
      .pipe(
        exhaustMap(event => {
          setIsLifted(true);

          const blockRect = blockEl.getBoundingClientRect();
          const parentRect = blockEl.parentElement!.getBoundingClientRect();

          const offset = {
            top: event.clientY - blockRect.top,
            left: event.clientX - blockRect.left,
          };

          return mouseMove$.pipe(
            takeUntil(mouseUp$),
            tap(event => event.preventDefault()),
            map(event => ({
              top: event.clientY - parentRect.top - offset.top,
              left: event.clientX - parentRect.left - offset.left,
            })),
            map(position => ({
              top: minmax(0, parentRect.height - blockRect.height, position.top),
              left: minmax(0, parentRect.width - blockRect.width, position.left),
            })),
            distinctUntilChanged((a, b) => a.top === b.top && a.left === b.left),
            tap(position => setPosition(position)),
            switchMap(position => sendPosition(position)),
            finalize(() => setIsLifted(false))
          );
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [blockEl, sendPosition]);

  return (
    <div className="h-screen w-screen p-6 flex bg-gray-100">
      <div className="row flex-auto">
        <div className="col col--grow">
          <div className="h-full w-full relative bg-white shadow-inner">
            <div className="-text-4 top-4 left-4 absolute z-10 pointer-events-none">SCREEN 1</div>
            <div
              className="h-16 w-16 absolute"
              style={{ transform: `translate(${position.left}px,${position.top}px)` }}
              ref={setBlockEl}
            >
              <div
                className={cn(
                  'h-full w-full bg-red-30 relative transition-transform',
                  isLifted && 'shadow-30 scale-125 -rotate-6'
                )}
              />
            </div>
          </div>
        </div>
        <div className="col col--grow">
          <div className="h-full w-full relative bg-white shadow-inner">
            <div className="-text-4 top-4 left-4 absolute z-10 pointer-events-none">SCREEN 2</div>
            <div
              className="h-16 w-16 bg-blue-40 absolute transition-transform"
              style={{ transform: `translate(${shadowPosition.left}px,${shadowPosition.top}px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DnDPage;
