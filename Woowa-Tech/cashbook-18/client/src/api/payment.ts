import axios from 'axios';

const APIENDPOINT = process.env.CLIENT_API_BASE + `/payments`;

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
