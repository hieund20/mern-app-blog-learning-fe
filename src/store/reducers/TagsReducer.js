const initialState = {
  loading: false,
  data: [],
  status: "",
};

export const TagListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TAG_LIST_LOADING":
      return {
        ...state,
        loading: true,
        status: "loading",
      };
    case "GET_TAG_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        status: "success",
      };
    case "GET_TAG_LIST_FAILED":
      return {
        ...state,
        loading: false,
        status: "failed",
      };
    case "POST_TAG_LOADING":
      return {
        ...state,
        loading: true,
        status: "loading",
      };
    case "POST_TAG_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
        status: "success",
      };
    case "POST_TAG_FAILED":
      return {
        ...state,
        loading: true,
        status: "failed",
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
