import { Option } from '@entities/cart/cart.entity';

export type ProductServiceProps = {
  option: Option;
  index: number;
};

export type ProductServiceDeviceProps = {
  checked: boolean;
  description: string;
  isModalOpen: boolean;
  price: number;
  serviceType: {
    icon: string;
    title: string;
  };
  handleChange: (arg: any) => void;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
};
