const initialState = {
  loading: false,
  data: [],
  errorMessage: "",
};

export const PostListReducer = (state = initialState, action) => {
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
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export const PostDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POST_DETAIL_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "GET_POST_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMessage: "",
      };
    case "GET_POST_DETAIL_FAILED":
      return {
        ...state,
        loading: false,
        errorMessage: "Unable to get post detail from API",
      };
    default:
      return state;
  }
};
