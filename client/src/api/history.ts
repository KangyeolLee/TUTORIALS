import axios from 'axios';

const APIENDPOINT = `http://localhost:3000/api/histories`;

export const getHistories = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}) =>
  axios.get(`${APIENDPOINT}?year=${year}&month=${month}`, {
    withCredentials: true,
  });
