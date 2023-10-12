export type StatePropValue = {
  openDetails: boolean;
};

export type StateProps = StatePropValue & {
  setOpenDetails: (value: boolean) => void;
};

export type StateCuponProps = StatePropValue & {
  isCuponContainerOpen: boolean;
  setIsCuponContainerOpen: (value: boolean) => void;
};
