import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
} from "./types";

// export const getLogs = () => {
//   return async (dispatch) => {
//     setLoading();
//     const res = await fetch("/logs");
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data,
//     });

//   };
// };

//similar to the above commented code.
//Get Logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

//Add new log
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

//Delete log from server
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`/logs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};
//Update log on server
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};
//Set current log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};
//Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

//since we dont need to make async call for set loading to true/false
export const setLoading = () => {
  return {
    //set loading to true.
    type: SET_LOADING,
  };
};
