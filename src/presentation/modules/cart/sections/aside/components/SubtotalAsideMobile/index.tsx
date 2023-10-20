import Image from 'next/image';
import { StateCuponProps } from '../HaderAsideMobile/HeaderAsideMobile.types';
import CuponAsideMobile from '../CuponAsideMobile';
import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';

import { SubtotalContainer } from './styles';

const SubtotalAsideMobile = ({
  openDetails,
  isCuponContainerOpen,
  setIsCuponContainerOpen,
}: StateCuponProps) => {
  const { cartBFF } = useAppSelector((state) => state.cart);

  return (
    <div className="subtotal-wrapper">
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
        <span>{formattedCLP(cartBFF?.totals?.totalCardPrice || 0)}</span>
      </SubtotalContainer>

      <SubtotalContainer>
        <p>Total con otros medios de pago</p>
        <span>{formattedCLP(cartBFF?.totals?.totalCardPrice || 0)}</span>
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
