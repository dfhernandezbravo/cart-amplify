import useMediaQuery from '@hooks/useMediaQuery';

export type Device = 'Desktop' | 'Tablet' | 'Phone';

type Breakpoints = {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  device: Device;
};

export default function useBreakpoints(): Breakpoints {
  const breakpoints: Breakpoints = {
    isXs: useMediaQuery('(max-width: 640px)'),
    isSm: useMediaQuery('(min-width: 641px) and (max-width: 768px)'),
    isMd: useMediaQuery('(min-width: 769px) and (max-width: 1024px)'),
    isLg: useMediaQuery('(min-width: 1025px)'),
    device: 'Desktop',
  };

  if (breakpoints.isXs) breakpoints.device = 'Phone';
  if (breakpoints.isSm) breakpoints.device = 'Tablet';
  if (breakpoints.isMd) breakpoints.device = 'Tablet';
  if (breakpoints.isLg) breakpoints.device = 'Desktop';

  return breakpoints;
}
