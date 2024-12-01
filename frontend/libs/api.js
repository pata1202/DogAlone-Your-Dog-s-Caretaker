import axios from "axios";

/**
 * 웹서버 API 호출 라이브러리
 * ref: https://axios-http.com/kr/docs/intro
 * @type {axios.AxiosInstance}
 */
export const api = axios.create({
  baseURL: 'http://192.168.0.47:3000',
})

/**
 * API 서버 상태 체크
 * GET /
 * @type {Promise<axios.AxiosResponse<any>>}
 */
export const checkHealth = () => api
    .get('/')
    .then(res => res.data)
    .catch(error => {
        console.error('API 서버 상태 체크 중 오류 발생:', error);
        // 오류 세부 정보 출력
        if (error.response) {
            console.error('응답 에러:', error.response.data);
            console.error('응답 상태 코드:', error.response.status);
            console.error('응답 헤더:', error.response.headers);
        } else if (error.request) {
            console.error('요청 에러:', error.request);
        } else {
            console.error('기타 에러:', error.message);
        }
        throw error; // 에러 재던짐
    });

/**
 * 로그인
 * POST /auth/login
 * @param email
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const login = (email, password) => api
    .post('/auth/login', { email, password })
    .then(res => res.data)
    .catch(error => {
        console.error('로그인 중 오류 발생:', error);
        // 오류 세부 정보 출력
        if (error.response) {
            console.error('응답 에러:', error.response.data);
            console.error('응답 상태 코드:', error.response.status);
            console.error('응답 헤더:', error.response.headers);
        } else if (error.request) {
            console.error('요청 에러:', error.request);
        } else {
            console.error('기타 에러:', error.message);
        }
        throw error; // 에러 재던짐
    });

/**
 * 회원가입
 * POST /auth/register
 * @param data {{email: string, password: string, dogName: string, dogBreed: string}}
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const register = (data) => api
    .post('/auth/register', data)
    .then(res => res.data)
    .catch(error => {
        console.error('회원가입 중 오류 발생:', error);
        // 오류 세부 정보 출력
        if (error.response) {
            console.error('응답 에러:', error.response.data);
            console.error('응답 상태 코드:', error.response.status);
            console.error('응답 헤더:', error.response.headers);
        } else if (error.request) {
            console.error('요청 에러:', error.request);
        } else {
            console.error('기타 에러:', error.message);
        }
        throw error; // 에러 재던짐
    });

/**
 * 추천 정보 조회
 * GET /recommendation
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getRecommendation = () => api
  .get('/recommendation')
  .then(res => res.data)
  .catch(error => {
    console.error('추천 정보 조회 중 오류 발생:', error);
    // 오류 세부 정보 출력
    if (error.response) {
        console.error('응답 에러:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
    } else if (error.request) {
        console.error('요청 에러:', error.request);
    } else {
        console.error('기타 에러:', error.message);
    }
    throw error; // 에러 재던짐
  });

/**
 * 일일 보고서 조회
 * GET /daily-report
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getDailyReport = (date) => api
  .get(`/report/daily`, { params: { date } })  // 날짜를 쿼리 파라미터로 전달
  .then(res => res.data)
  .catch(error => {
    console.error('일일 보고서 조회 중 오류 발생:', error);
    // 오류 세부 정보 출력
    if (error.response) {
        console.error('응답 에러:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
    } else if (error.request) {
        console.error('요청 에러:', error.request);
    } else {
        console.error('기타 에러:', error.message);
    }
    throw error; // 에러 재던짐
  });

/**
 * 주간 보고서 조회
 * GET /weekly-report
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getWeeklyReport = (date) => api
  .get(`/report/weekly`, { params: { date } })  // 날짜를 쿼리 파라미터로 전달
  .then(res => res.data)
  .catch(error => {
    console.error('주간 보고서 조회 중 오류 발생:', error);
    // 오류 세부 정보 출력
    if (error.response) {
        console.error('응답 에러:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
    } else if (error.request) {
        console.error('요청 에러:', error.request);
    } else {
        console.error('기타 에러:', error.message);
    }
    throw error; // 에러 재던짐
  });

/**
 * 월간 보고서 조회
 * GET /monthly-report
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getMonthlyReport = (date) => api
  .get(`/report/monthly`, { params: { date } })  // 날짜를 쿼리 파라미터로 전달
  .then(res => res.data)
  .catch(error => {
    console.error('월간 보고서 조회 중 오류 발생:', error);
    // 오류 세부 정보 출력
    if (error.response) {
        console.error('응답 에러:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
    } else if (error.request) {
        console.error('요청 에러:', error.request);
    } else {
        console.error('기타 에러:', error.message);
    }
    throw error; // 에러 재던짐
  });