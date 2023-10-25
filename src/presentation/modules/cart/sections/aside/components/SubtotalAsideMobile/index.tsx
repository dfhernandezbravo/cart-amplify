import { StateCuponProps } from '../HaderAsideMobile/HeaderAsideMobile.types';
import CuponAsideMobile from '../CuponAsideMobile';
import { Container } from './styles';
import TotalCencopayPrice from '@components/molecules/TotalCencopayPrice';
import TotalPriceCencosud from '@components/molecules/TotalPriceCencosud';
import TotalPrice from '@components/molecules/TotalPrice';

const SubtotalAsideMobile = ({
  openDetails,
  isCuponContainerOpen,
  setIsCuponContainerOpen,
}: StateCuponProps) => {
  return (
    <Container>
      <TotalCencopayPrice />
      <TotalPriceCencosud />
      <TotalPrice />
      <CuponAsideMobile
        openDetails={openDetails}
        isCuponContainerOpen={isCuponContainerOpen}
        setIsCuponContainerOpen={setIsCuponContainerOpen}
      />
    </Container>
  );
};

export default SubtotalAsideMobile;
