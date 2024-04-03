import Tintometric from './components/Tintometric';
import { Props } from './types';
import { LinkButton, MainContainer } from './styles';
import { useState } from 'react';

const TintometricColors = ({ item, index }: Props) => {
  const [showMore, setShowMore] = useState(true);

  const colorCodes = item.product.colorCodes;
  if (!colorCodes || colorCodes.length === 0) return null;

  const prevTotalQuantity = colorCodes.reduce((acc, color) => {
    return acc + color.quantity;
  }, 0);

  return (
    <MainContainer className={showMore ? 'showMore' : ''}>
      {colorCodes.map((colorCode, i) => {
        if (showMore && i > 4) return null;

        return (
          <Tintometric
            key={`${colorCode.code}-${i}`}
            colorCode={colorCode}
            itemIndex={index}
            prevTotalQuantity={prevTotalQuantity}
          />
        );
      })}

      {colorCodes.length > 5 && (
        <LinkButton onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Mostrar más' : 'Mostrar menos'}
        </LinkButton>
      )}
    </MainContainer>
  );
};

export default TintometricColors;
