import axios from 'axios';

export const signIn = async (body) =>
  await axios.post('/api/users/signin', body);

export const signUp = async (body) =>
  await axios.post('/api/users/signup', body);
