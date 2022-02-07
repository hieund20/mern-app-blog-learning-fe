const initialState = {
  loading: false,
  data: [],
  errorMessage: "",
};

export const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_DATA":
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };
    case "ADD_MY_DATA":
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        errorMessage: "",
      };
    default:
      return state;
  }
};
