import { IHistory } from '@/utils/types';
import axios from 'axios';

const APIENDPOINT = process.env.CLIENT_API_BASE + `/histories`;

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

export const updateHistory = async (history: IHistory) =>
  axios.put(
    `${APIENDPOINT}/${history.id}`,
    { history },
    {
      withCredentials: true,
    }
  );

export const deleteHistory = async (historyId: number) =>
  axios.delete(`${APIENDPOINT}/${historyId}`, {
    withCredentials: true,
  });

export const getAverageByMonth = async (year: number, category: string) =>
  axios.get(`${APIENDPOINT}/stat/${year}/${category.replace('/', '%2F')}`, {
    withCredentials: true,
  });
