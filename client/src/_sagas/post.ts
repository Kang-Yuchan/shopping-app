import { all, fork, takeLatest, put, call, throttle } from "redux-saga/effects";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE
} from "../_reducer/post";
import Axios from "axios";
import { Action } from "../_reducer/user";

function addPostAPI(postData: {}) {
  return Axios.post("/product", postData, {
    withCredentials: true
  });
}

function* addPost(action: Action): Generator {
  try {
    const result: any = yield call(addPostAPI, action.data);
    yield put({
      // edit post reducer
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      error: error
    });
  }
}

function* watchAddPost(): Generator {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function uploadImagesAPI(formData: Array<{}>) {
  return Axios.post(`/product/image`, formData, {
    withCredentials: true,
    headers: { "content-type": "multipart/form-data" }
  });
}

function* uploadImages(action: Action): Generator {
  try {
    const result: any = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: error
    });
  }
}

function* watchUploadImages(): Generator {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function loadMainPostsAPI() {
  return Axios.get(`/product/products`);
}

function* loadMainPosts(action: Action): Generator {
  try {
    const result: any = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: error
    });
  }
}

function* watchLoadMainPosts(): Generator {
  yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

export default function* postSaga(): Generator {
  yield all([
    fork(watchAddPost),
    fork(watchUploadImages),
    fork(watchLoadMainPosts)
  ]);
}
