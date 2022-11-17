'use client';

import { useEffect, useState } from 'react';

type DeviceWidth = 's' | 'm' | 'l' | 'xl';

type UseDeviceWidthReturn = {
  deviceWidth: DeviceWidth | null;
};

export type DeviceBreakpoints = {
  s: 640;
  m: 768;
  l: 992;
  xl: 1280;
};

const deviceBreakpoints: DeviceBreakpoints = {
  s: 640,
  m: 768,
  l: 992,
  xl: 1280,
};

const useDeviceWidth = (): UseDeviceWidthReturn => {
  const [deviceWidth, setDeviceWidth] = useState<DeviceWidth | null>(null);

  const getBreakpoint = (width: number): DeviceWidth | null => {
    if (width < deviceBreakpoints.s) {
      return 's';
    }

    if (width >= deviceBreakpoints.s && width < deviceBreakpoints.m) {
      return 'm';
    }

    if (width >= deviceBreakpoints.m && width < deviceBreakpoints.l) {
      return 'l';
    }

    return 'xl';
  };

  useEffect(() => {
    const handleSizeChange = (): void => {
      const breakpoint = getBreakpoint(window.innerWidth);
      setDeviceWidth(breakpoint);
    };

    handleSizeChange();
    window.addEventListener('resize', handleSizeChange);

    return (): void => window.removeEventListener('resize', handleSizeChange);
  }, []);

  return {
    deviceWidth,
  };
};

export default useDeviceWidth;
