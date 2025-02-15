import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/leave.reducer';

export const selectLeaveState = createFeatureSelector<State>('leave');

export const selectTotalLeaveDays = createSelector(
  selectLeaveState,
  (state: State) => state.totalLeaveDays
);

export const selectTotalLeaveUsed = createSelector(
  selectLeaveState,
  (state: State) => state.totalLeaveUsed
);

export const selectApprovedRequests = createSelector(
  selectLeaveState,
  (state: State) => state.approvedRequests
);

export const selectPendingRequests = createSelector(
  selectLeaveState,
  (state: State) => state.pendingRequests
);
