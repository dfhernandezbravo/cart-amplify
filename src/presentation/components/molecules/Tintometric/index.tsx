import { Fragment } from 'react';
import { Container, Color, ColorContainer } from './styles';
import { TintometricProps } from './types';

const Tintometric = ({ item }: TintometricProps) => {
  const colorCodes = item.product.colorCodes;
  if (!colorCodes || colorCodes.length === 0) return null;

  return (
    <Container>
      {colorCodes.map((item, i) => (
        <Fragment key={`${item.code}-${i}`}>
          {Array.from({ length: item.quantity }).map((_, index) => (
            <ColorContainer key={`${item.code}-${i}-${index}`}>
              <Color color={item.hexColor}></Color>
            </ColorContainer>
          ))}
        </Fragment>
      ))}
    </Container>
  );
};

export default Tintometric;
