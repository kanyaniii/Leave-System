import { createReducer, on } from '@ngrx/store';
import * as LeaveActions from '../actions/leave.actions';

export interface State {
  totalLeaveDays: number;
  totalLeaveUsed: number;
  approvedRequests: any[];
  pendingRequests: any[];
}

export const initialState: State = {
  totalLeaveDays: 20,  // ตัวอย่าง จำนวนวันลาทั้งหมดที่พนักงานมี
  totalLeaveUsed: 0,
  approvedRequests: [],
  pendingRequests: [],
};

export const leaveReducer = createReducer(
  initialState,
  on(LeaveActions.addApprovedLeaveRequest, (state, { startDate, endDate, leaveType, days }) => ({
    ...state,
    approvedRequests: [...state.approvedRequests, { startDate, endDate, leaveType, days, status: 'อนุมัติ' }],
  })),
  on(LeaveActions.addPendingLeaveRequest, (state, { startDate, endDate, leaveType, days }) => ({
    ...state,
    pendingRequests: [...state.pendingRequests, { startDate, endDate, leaveType, days, status: 'รออนุมัติ' }],
  })),
  on(LeaveActions.updateTotalLeaveUsed, (state, { days }) => ({
    ...state,
    totalLeaveUsed: state.totalLeaveUsed + days,
  })),
  on(LeaveActions.setTotalLeaveDays, (state, { totalLeaveDays }) => ({
    ...state,
    totalLeaveDays,
  }))
);
