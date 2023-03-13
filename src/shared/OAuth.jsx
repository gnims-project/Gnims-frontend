/* 
카카오 인가코드를 받기 위한 URL 페이지로 넘어가기 위한 세팅
REST API KEY와 REDIRECT URI는 왠만하면 한명의 키로 사용할것 
REST_API_KEY 는 다를수 있어도 REDIRECT URI만큼은 백앤드와 프론트 모두 맞춰서 사용할것 
*/

//민우님 카카오 api
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI; // 배포후 변경 주소
//const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
