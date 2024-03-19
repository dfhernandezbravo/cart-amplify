import Tintometric from './components/Tintometric';
import { Props } from './types';
import { MainContainer } from './styles';

const TintometricColors = ({ item, index }: Props) => {
  const colorCodes = item.product.colorCodes;
  if (!colorCodes || colorCodes.length === 0) return null;

  const prevTotalQuantity = colorCodes.reduce((acc, color) => {
    return acc + color.quantity;
  }, 0);

  return (
    <MainContainer>
      {colorCodes.map((colorCode, i) => (
        <Tintometric
          key={`${colorCode.code}-${i}`}
          colorCode={colorCode}
          quantity={item?.quantity}
          index={index}
          prevTotalQuantity={prevTotalQuantity}
        />
      ))}
    </MainContainer>
  );
};

export default TintometricColors;
