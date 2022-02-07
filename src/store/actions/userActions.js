export const addMyData = (value) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_MY_DATA",
      payload: value,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMyData = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_MY_DATA",
    });
  } catch (err) {
    console.log(err);
  }
};
