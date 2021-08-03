import { IHistory } from '@/utils/types';
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

export const insertHistory = async (history: IHistory) =>
  axios.post(
    `${APIENDPOINT}`,
    { history },
    {
      withCredentials: true,
    }
  );
