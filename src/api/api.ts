import axios from 'axios';

// Base URL for the backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Example API calls

// Get control states
export const getControlStates1 = () => API.get('/control');
export const updateControlStates1 = (data:any) => API.post('/control', data);

export const getControlStates2 = () => API.get('/control2');
export const updateControlStates2 = (data) => API.post('/control2', data);

export const getSensorData = () => API.get('/sensor');
export const saveSensorData = (data) => API.post('/sensor', data);

export const getSensorData2 = () => API.get('/sensor2');
export const saveSensorData2 = (data) => API.post('/sensor2', data);

export const createUser = (userData) => API.post('/users', userData);
export const userLogin = (credentials) => API.post('/user/login', credentials);

export default API;
