import axios from 'axios';

const APIENDPOINT = process.env.CLIENT_API_BASE + '/categories';

export const getCategories = async () =>
  await axios.get(`${APIENDPOINT}`, { withCredentials: true });

export const createCategory = async ({
  type,
  color,
}: {
  type: string;
  color: string;
}) =>
  await axios.post(
    `${APIENDPOINT}`,
    {
      type,
      color,
    },
    { withCredentials: true }
  );

export const deleteCategory = async (categoryId: number) =>
  await axios.delete(`${APIENDPOINT}/${categoryId}`, { withCredentials: true });
