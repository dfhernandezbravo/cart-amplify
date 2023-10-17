type TypesProps = 'info' | 'success' | 'warning' | 'error' | 'default';
type PositionType =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

type Messages = {
  title?: string;
  description?: string;
};

type ToastProps = {
  title?: string;
  description?: string;
  type?: TypesProps;
  position?: PositionType;
};
