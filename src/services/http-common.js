// http-common.js
import axios from 'axios'

const HTTP = axios.create({
  baseURL: process.env.API,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default HTTP
