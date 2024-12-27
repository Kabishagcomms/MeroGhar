import axios from 'axios';
import { api } from '../api';

const Api= axios.create({
  baseURL: `${api}`
});


export default Api;