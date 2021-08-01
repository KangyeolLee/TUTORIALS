import axios from 'axios';

const APIENDPOINT = `http://localhost:3000/api/categories`;

export const getCategories = async () => await axios.get(`${APIENDPOINT}`);

export const createCategory = async ({
  type,
  color,
}: {
  type: string;
  color: string;
}) =>
  await axios.post(`${APIENDPOINT}`, {
    type,
    color,
  });

export const deleteCategory = async (categoryId: number) =>
  await axios.delete(`${APIENDPOINT}/${categoryId}`);

//ByeBYE~!
