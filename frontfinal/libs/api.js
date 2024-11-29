import axios from "axios";

/**
 * 웹서버 API 호출 라이브러리
 * ref: https://axios-http.com/kr/docs/intro
 * @type {axios.AxiosInstance}
 */
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

/**
 * API 서버 상태 체크
 * GET /
 * @type {Promise<axios.AxiosResponse<any>>}
 */
export const checkHealth = () => api
    .get('/')
    .then(res => res.data);

/**
 * 로그인
 * POST /auth/login
 * @param email
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const login = (email, password) => api
    .post('/auth/login', { email, password })
    .then(res => res.data);

/**
 * 회원가입
 * POST /auth/register
 * @param data {{email: string, password: string, dogName: string, dogBreed: string}}
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const register = (data) => api
    .post('/auth/register', data)
    .then(res => res.data);


/**
 * 추천 정보 조회
 * GET /recommendation
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getRecommendation = () => api
  .get('/recommendation')
  .then(res => res.data);
