import axios from "axios";

axios.defaults.baseURL = "https://quiz-app-backend-pink.vercel.app"
axios.defaults.headers.common = {
  Accept: 'application/json',
}

export const setToken = (token: string) => {
  console.log('token', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


export default axios