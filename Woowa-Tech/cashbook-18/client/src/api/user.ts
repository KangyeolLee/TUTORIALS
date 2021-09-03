import axios from 'axios';

const APIENDPOINT = process.env.CLIENT_API_BASE;

export const getUserInfo = async () =>
  await axios.post(`${APIENDPOINT}/user`, null, {
    withCredentials: true,
  });
