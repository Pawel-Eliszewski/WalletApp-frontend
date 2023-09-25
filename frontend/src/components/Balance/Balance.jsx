import React, { useEffect, useCallback } from "react";
import styles from "./Balance.module.css";
import { useSelector, useDispatch } from "react-redux";

const SET_CURRENT_USER = "user/SET_CURRENT_USER";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export const selectCurrentUser = (state) => state.user.currentUser;

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const getCurrentUser =
  ({ token }) =>
  async (dispatch) => {
    try {
      const user = await fetchUserFromServer(token);

      dispatch(setCurrentUser(user));
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

function Balance() {
  const user = useSelector(selectCurrentUser);
  const balance = user.balance;
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const fetchCurrentUser = useCallback(async () => {
    dispatch(getCurrentUser({ token }));
  }, [token, dispatch]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <div className={styles.balance}>
      <div className={styles.balance__text}>Your balance</div>
      <div className={styles.balance__amount}>
        <span className={styles.balance__currency}>₴</span> {balance}
      </div>
    </div>
  );
}

export default Balance;
