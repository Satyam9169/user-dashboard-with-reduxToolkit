import { createSelector } from 'reselect';

// Assuming your slice is userDetail
const selectUserDetailState = (state) => state.userDetail;

// Memoized selector for user
export const selectUsers = createSelector(
    [selectUserDetailState],
    (userDetail) => userDetail.user
);

// Memoized selector for loading
export const selectLoading = createSelector(
    [selectUserDetailState],
    (userDetail) => userDetail.loading
);

// Memoized selector for error
export const selectError = createSelector(
    [selectUserDetailState],
    (userDetail) => userDetail.error
);
