import produce from "immer";
import { Action } from "./user";

interface StateType {
  mainPosts: Array<{}>;
  imagePaths: Array<{}>; // Preview image path
  addPostErrorReason: string; // Post upload error reason
  isAddingPost: boolean; // Post uploading
  addedPost: boolean; // Post upload success
}

export const initialState: StateType = {
  mainPosts: [],
  imagePaths: [], // Preview image path
  addPostErrorReason: "", // Post upload error reason
  isAddingPost: false, // Post uploading
  addedPost: false // Post upload success
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

const reducer = (state = initialState, action: Action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        draft.isAddingPost = true;
        draft.addPostErrorReason = "";
        draft.addedPost = false;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.isAddingPost = false;
        draft.mainPosts.unshift(action.data);
        draft.addedPost = true;
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAddingPost = false;
        draft.addPostErrorReason = action.error;
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data.forEach((p: {}) => {
          draft.imagePaths.push(p);
        });
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
