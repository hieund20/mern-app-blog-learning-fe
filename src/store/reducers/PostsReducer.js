
const initialState = {
  loading: false,
  data: [],
  errorMessage: "",
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POST_LIST_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "GET_POST_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMessage: "",
      };
    case "GET_POST_LIST_FAILED":
      return {
        ...state,
        loading: false,
        errorMessage: "Unable to get post list from API",
      };
    default:
      return state;
  }
};

export default PostsReducer;