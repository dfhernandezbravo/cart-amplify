import { Container, Color, ColorContainer } from './styles';

const Tintometric = () => {
  // example of data that will be received from the API
  const tintometric = [
    {
      refId: '1061522', //skuVariant easy
      code: 'M120-1',
      hexColor: '#F1E0E8',
    },
    {
      refId: '1061523', //skuVariant easy
      code: 'M120-2',
      hexColor: '#cc4b88',
    },
  ];

  return (
    <Container>
      {tintometric.length
        ? tintometric.map((item) => (
            <ColorContainer key={item.refId}>
              <Color color={item.hexColor}></Color>
            </ColorContainer>
          ))
        : null}
    </Container>
  );
};

export default Tintometric;
