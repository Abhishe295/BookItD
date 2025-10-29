import axios from "axios";
const isLocal = window.location.hostname === 'localhost';

export const api = axios.create({
  baseURL: isLocal
    ? 'http://localhost:5500'
    : 'https://bookitd.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});