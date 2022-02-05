const initialState = {
  loading: false,
  data: {
    responseData: [],
  },
  errorMessage: "",
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENT_LIST_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "GET_COMMENT_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMessage: "",
      };
    case "GET_COMMENT_LIST_FAILED":
      return {
        ...state,
        loading: false,
        errorMessage: "Unable to get comment list from API",
      };
    case "POST_COMMENT_LOADING":
      return {
        ...state,
        loading: true,
        status: "loading",
      };
    case "POST_COMMENT_SUCCESS":
      return {
        ...state,
        data: {
          responseData: [...state.data.responseData, action.payload],
        },
        loading: false,
        status: "success",
      };
    case "POST_COMMENT_FAILED":
      return {
        ...state,
        loading: true,
        status: "failed",
      };
    case "DELETE_COMMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          responseData: state.data.responseData.filter(
            (comment) => comment._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default CommentReducer;
