import { ReactNode } from 'react';
import useBreakpoints from '@hooks/useBreakpoints';

interface Props {
  children: ReactNode;
}

const Mobile: React.FC<Props> = ({ children }) => {
  const { isXs, isSm } = useBreakpoints();

  return isXs || isSm ? <>{children}</> : null;
};

export default Mobile;
