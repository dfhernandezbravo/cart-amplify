import axios from 'axios';

export const bffWebInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_WEB_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY_BFF_WEB,
  },
});
