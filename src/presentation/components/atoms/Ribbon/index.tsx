import dynamic from 'next/dynamic';

const Ribbon = dynamic(
  () =>
    import('@ccom-easy-design-system/atoms.ribbon').then(
      (module) => module.Ribbon,
    ),
  { ssr: false },
);

export default Ribbon;
