import Image from 'next/image';
import { StateCuponProps } from '../HaderAsideMobile/HeaderAsideMobile.types';
import CuponAsideMobile from '../CuponAsideMobile';
import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';

import { SubtotalContainer } from './styles';
import TotalCencopayPrice from '@components/molecules/TotalCencopayPrice';
import { Skeleton } from '@components/molecules/TotalPriceCencosud/styles';

const SubtotalAsideMobile = ({
  openDetails,
  isCuponContainerOpen,
  setIsCuponContainerOpen,
}: StateCuponProps) => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  return (
    <div className="subtotal-wrapper">
      <TotalCencopayPrice />
      <SubtotalContainer>
        <div>
          <p>Total con tarjeta Cencosud </p>
          <Image
            src="/icons/cart/tc-cencosud.svg"
            alt="tarjeta cencosud"
            width={40}
            height={20}
          />
        </div>
        {loading ? (
          <Skeleton />
        ) : (
          <span>{formattedCLP(cartBFF?.totals?.totalCardPrice || 0)}</span>
        )}
      </SubtotalContainer>

      <SubtotalContainer>
        <p>Total con otros medios de pago</p>

        {loading ? (
          <Skeleton />
        ) : (
          <span>{formattedCLP(cartBFF?.totals?.totalPrice || 0)}</span>
        )}
      </SubtotalContainer>
      <CuponAsideMobile
        openDetails={openDetails}
        isCuponContainerOpen={isCuponContainerOpen}
        setIsCuponContainerOpen={setIsCuponContainerOpen}
      />
    </div>
  );
};

export default SubtotalAsideMobile;
