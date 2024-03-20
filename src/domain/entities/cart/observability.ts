export interface ObservabilityCart {
  eventName: string;
  data: {
    orderId: string;
    totalAmount: number;
  };
}
