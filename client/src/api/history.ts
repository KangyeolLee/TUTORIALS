import { amountType } from '@/Model/HistoryModel';
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

export const getSumByMonth = async (
  year: number,
  category: string,
  type: amountType
) =>
  axios.post(
    `${APIENDPOINT}/stat/`,
    { year, categoryType: category, type },
    {
      withCredentials: true,
    }
  );
