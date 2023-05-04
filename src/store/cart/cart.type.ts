type RatingModel = { rate: number, count: number };

export interface CartItemModel {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: RatingModel;
  title: string;
  quantity?: number;
};