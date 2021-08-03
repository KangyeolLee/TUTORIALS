import axios from 'axios';

const APIENDPOINT = `http://localhost:3000/api/payments`;

export const getPayments = async () =>
  await axios.get(`${APIENDPOINT}`, { withCredentials: true });

export const createPayment = async (type: string) =>
  await axios.post(
    `${APIENDPOINT}`,
    {
      type,
    },
    { withCredentials: true }
  );

export const deletePayment = async (categoryId: number) =>
  await axios.delete(`${APIENDPOINT}/${categoryId}`, { withCredentials: true });
