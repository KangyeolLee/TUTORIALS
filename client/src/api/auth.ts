import axios from 'axios';

const APIENDPOINT = process.env.CLIENT_API_BASE;

export const apiLogout = async () =>
  await axios.post(`${APIENDPOINT}/user/logout`, null, {
    withCredentials: true,
  });
