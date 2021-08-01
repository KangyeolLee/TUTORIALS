import axios from 'axios';

const APIENDPOINT = `http://localhost:3000/api/payments`;

export const getPayments = async () => await axios.get(`${APIENDPOINT}`);

export const createPayments = async (type: string) =>
  await axios.post(`${APIENDPOINT}`, {
    type,
  });

export const deletePayments = async (categoryId: number) =>
  await axios.delete(`${APIENDPOINT}/${categoryId}`);
