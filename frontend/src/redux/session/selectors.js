export const selectIsAuth = (state) => state.session.isLoggedIn;

export const selectUser = (state) => state.session.user;

export const selectIsRefreshing = (state) => state.session.isRefreshing;
