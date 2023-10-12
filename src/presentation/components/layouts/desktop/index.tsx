import { ReactNode } from 'react';
import useBreakpoints from '@hooks/useBreakpoints';

interface Props {
  children: ReactNode;
}

const Desktop: React.FC<Props> = ({ children }) => {
  const { isMd, isLg } = useBreakpoints();

  return isMd || isLg ? <>{children}</> : null;
};

export default Desktop;
