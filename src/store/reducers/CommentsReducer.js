const initialState = {
  loading: false,
  data: [],
  errorMessage: "",
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENT_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMessage: "",
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
