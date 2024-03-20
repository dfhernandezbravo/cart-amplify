import Tintometric from './components/Tintometric';
import { Props } from './types';
import { MainContainer } from './styles';
import { useState } from 'react';

const TintometricColors = ({ item, index }: Props) => {
  const [showAll, setShowAll] = useState(true);

  const colorCodes = item.product.colorCodes;
  if (!colorCodes || colorCodes.length === 0) return null;

  const prevTotalQuantity = colorCodes.reduce((acc, color) => {
    return acc + color.quantity;
  }, 0);

  return (
    <MainContainer className={showAll ? 'showAll' : ''}>
      {colorCodes.map((colorCode, i) => {
        if (showAll && i > 4) return null;

        return (
          <Tintometric
            key={`${colorCode.code}-${i}`}
            colorCode={colorCode}
            itemIndex={index}
            prevTotalQuantity={prevTotalQuantity}
          />
        );
      })}

      {colorCodes.length > 4 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Mostrar más' : 'Mostrar menos'}
        </button>
      )}
    </MainContainer>
  );
};

export default TintometricColors;
