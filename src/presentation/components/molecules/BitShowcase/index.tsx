import dynamic from 'next/dynamic';

const Showcase = dynamic(
  () =>
    import('@ccom-easy-design-system/modules.product-carousel-module').then(
      (module) => module.ProductCarouselModule,
    ),
  { ssr: false },
);

export default Showcase;
