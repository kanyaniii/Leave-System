import { createAction, props } from '@ngrx/store';

export const addApprovedLeaveRequest = createAction(
  '[Leave] Add Approved Request',
  props<{ startDate: string, endDate: string, leaveType: string, days: number }>()
);

export const addPendingLeaveRequest = createAction(
  '[Leave] Add Pending Request',
  props<{ startDate: string, endDate: string, leaveType: string, days: number }>()
);

export const updateTotalLeaveUsed = createAction(
  '[Leave] Update Total Leave Used',
  props<{ days: number }>()
);

export const setTotalLeaveDays = createAction(
  '[Leave] Set Total Leave Days',
  props<{ totalLeaveDays: number }>()
);
