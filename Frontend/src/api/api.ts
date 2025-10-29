import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5500', // backend host as you requested
  headers: { 'Content-Type': 'application/json' }
});
