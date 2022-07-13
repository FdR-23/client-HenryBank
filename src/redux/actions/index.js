const axios = require("axios");
import { dataa } from "../../../response";

export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const LOG_IN = "LOG_IN";
export const RENDER_SCREEN = "RENDER_SCREEN";

export const GET_NEWS = "GET_NEWS";

export const POST_USER_DATA = "POST_USER_DATA";
export const POST_USER = "POST_USER";
export const POST_USER_RENDER = "POST_USER_RENDER";

export const GET_COINS = "GET_COINS";
export const SEARCH_COINS = "SEARCH_COINS";
export const GET_COIN_ID = "GET_COIN_ID";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const BUY_CRYPTOS = "BUY_CRYPTOS";
export const SELL_CRYPTOS = "SELL_CRYPTOS";
export const RECHANGE = "RECHANGE";

export const logIn = (form) => async (dispatch) => {
  console.log(form);

  const response = await axios.post("https://h-bank.herokuapp.com/login", form);

  const payload = await response.data;
  console.log(payload);
  return dispatch({ type: LOG_IN, payload });
};

export const getUsers = () => {
  return {
    type: GET_USERS,
    payload: dataa,
  };
};

// export function getUsers(token) {
//   return async function (dispatch) {
//     const config = {
//       headers: {
//         Authorization: token,
//       },
//     };
//     const res = await axios.get(
//       "https://h-bank.herokuapp.com/userEmail",
//       config
//     );
//     console.log("esto es la res", res.data);
//     return dispatch({
//       type: GET_USERS,
//       payload: res.data,
//     });
//   };
// }

export const getUser = () => {
  return {
    type: GET_USER,
    payload: dataa,
  };
};

export const postUserData = (payload, userMP) => {
  return async function (dispatch) {
    const posteo = {
      name: payload.name,
      lastName: payload.lastName,
      identity: payload.identity,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      city: payload.city,
      nationality: payload.nationality,
      address: payload.address,
      email: userMP.email,
      password: userMP.password,
    };
    console.log("Aca hay un posteo", posteo);
    const created = await axios.post(
      "https://h-bank.herokuapp.com/register",
      posteo
    );
    return dispatch({
      type: "POST_USER_DATA",
      payload: created.data,
    });
  };
};

export const postUserDataCard = (payload, userMP) => {
  return async function (dispatch) {
    const posteo2 = {
      name: payload.name,
      lastName: payload.lastName,
      identity: payload.identity,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      city: payload.city,
      nationality: payload.nationality,
      address: payload.address,
      email: userMP.email,
      password: userMP.password,
    };
    console.log("Aca hay un posteo2", posteo2);
    return dispatch({
      type: "POST_USER_RENDER",
      payload,
    });
  };
};

export const postUser = (payload) => {
  return async function (dispatch) {
    const post = {
      email: payload.email,
      password: payload.password,
    };
    return dispatch({
      type: "POST_USER",
      payload,
    });
  };
};

export const renderScreen = (payload) => {
  return {
    type: RENDER_SCREEN,
    payload,
  };
};

export const getCoins = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get(
    "https://h-bank.herokuapp.com/crypto",
    config
  );
  dispatch({ type: GET_COINS, payload: response.data });
};

export function searchCoins(name) {
  return { type: SEARCH_COINS, payload: name };
}

export function getCoinId(id) {
  return { type: GET_COIN_ID, payload: id };
}

export const getUserDetail = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get(
    "https://h-bank.herokuapp.com/user/profile",
    config
  );
  console.log(response.data);
  dispatch({ type: GET_USER_DETAIL, payload: response.data });
};

export const getNews = () => (dispatch) => {
  return fetch(
    "https://newsapi.org/v2/top-headlines?country=ar&category=business&apiKey=a09836a597c24e2490cdcbcf5f32fb6c"
  )
    .then((response) => response.json())
    .then((news) => {
      dispatch({ type: GET_NEWS, payload: news.articles });
    });
};

export const buyCrytos = (id, price, value, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = {
    amount: value,
    crypto: id,
    price,
  };
  const response = await axios.post(
    "https://h-bank.herokuapp.com/crypto/buy",
    data,
    config
  );
  dispatch({ type: BUY_CRYPTOS, payload: response.data });
};

export const sellCryptos = (id, price, value, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const data = {
    amount: value,
    crypto: id,
    price,
  };
  const response = await axios.post(
    "https://h-bank.herokuapp.com/crypto/sell",
    data,
    config
  );
  dispatch({ type: SELL_CRYPTOS, payload: response.data });
};

export const rechange = (amount, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(
    "https://h-bank.herokuapp.com/user/recharge",
    amount,
    config
  );

  const payload = await response.data;
  return dispatch({ type: RECHANGE, payload });
};
