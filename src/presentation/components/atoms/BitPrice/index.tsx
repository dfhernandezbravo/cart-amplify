import React from 'react';
import dynamic from 'next/dynamic';

const Price = dynamic(
  // @ts-ignore
  () =>
    import('@ccom-easy-design-system/atoms.price').then(
      (module) => module.Price,
    ),
  { ssr: false },
);

export default Price;
