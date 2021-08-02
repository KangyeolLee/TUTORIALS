import axios from 'axios';

export const getUserInfo = async () =>
  await axios.post(`http://localhost:3000/api/user`, null, {
    withCredentials: true,
  });
