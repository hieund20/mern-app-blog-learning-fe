const initialState = {
  loading: false,
  data: [],
  errorMessage: "",
};

export const TagListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TAG_LIST_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "GET_TAG_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMessage: "",
      };
    case "GET_TAG_LIST_FAILED":
      return {
        ...state,
        loading: false,
        errorMessage: "Unable to get post list from API",
      };
    case "POST_TAG_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.push(action.payload),
      };
    case "DELETE_TAG_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((tag) => tag._id !== action.payload),
      };

    default:
      return state;
  }
};
