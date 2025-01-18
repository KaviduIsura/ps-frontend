import axios from "axios";

// Base URL for the backend
const API = axios.create({ baseURL: "http://localhost:5003/api" });

// Example API calls

// Get control states
export const getControlStates1 = () => API.get("/control1");
export const updateControlStates1 = (data: any) => API.post("/control1", data);
export const resetControlStates1 = (data: any) =>
  API.post("/control/reset", data);

export const getControlStates2 = () => API.get("/control2");
export const updateControlStates2 = (data) => API.post("/control2", data);

export const getSensorData = () => API.get("/sensor1");
export const getLatestSensorData = () => API.get("/sensor1/latest");
export const saveSensorData = (data) => API.post("/sensor1", data);

export const getSensorData2 = () => API.get("/sensor2");
export const saveSensorData2 = (data) => API.post("/sensor2", data);

export const createUser = (userData) => API.post("/users", userData);
// export const userLogin = (credentials) => API.post("/user/login", credentials);

export default API;
