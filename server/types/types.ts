export type HistoryType = {
  id?: number;
  category: string;
  payment: string;
  price: number;
  content: string;
  type: number;
  createAt: Date;
  userId: number;
};

export type ResultRawType = {
  raw: { insertId: number };
};

export type PaymentType = {
  userId: number;
  type: string;
};

export type UserPaymentType = {
  userId: number;
  paymentId: number;
};

export type UserPaymentForRemoval = {
  userId: number;
  id: number;
};
