import dynamic from 'next/dynamic';
import React from 'react';

const ThemeProviderBit = dynamic(
  () =>
    import('@ccom-easy-design-system/theme.theme-provider').then(
      (module) => module.EasyThemeProvider,
    ),
  { ssr: false },
);

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  return <ThemeProviderBit>{children}</ThemeProviderBit>;
};

export default ThemeProvider;
