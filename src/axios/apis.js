import axios from 'axios';
import {MAIN_API_URL, MAIN_AUTHORIZATION_KEY} from '@env';

// POS API Axios Instance
const instance = axios.create({
  baseURL: 'https://gharsetu.in',
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer 9AqZ5XJm4pHfD2WBYgC6eT8lIRhE3KVaPjbi1G0QxUsyL7nMwZt`,
  },
});

// Named exports
export default instance;
