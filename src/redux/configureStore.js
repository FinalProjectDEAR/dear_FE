import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import user from "./modules/user";
import image from "./modules/image";
import post from "./modules/post";
import imagePost from "./modules/imagePost";
import vote from "./modules/vote";
import comment from "./modules/comment";
import review from "./modules/review";
import chat from "./modules/chat";
import message from "./modules/message";
import mypage from "./modules/mypage";
import noti from "./modules/noti";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: user,
  image: image,
  post: post,
  imagePost: imagePost,
  vote: vote,
  chat: chat,
  comment: comment,
  review: review,
  message: message,
  mypage: mypage,
  noti: noti,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
