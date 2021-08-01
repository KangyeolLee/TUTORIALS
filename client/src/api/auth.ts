import axios from 'axios';

export const apiLogout = async () =>
  await axios.post(`http://localhost:3000/api/user/logout`);

export const getCategories = async () =>
  await axios.get('http://localhost:3000/api/categories');
