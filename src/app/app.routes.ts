import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { LeaveBalanceDisplayComponent } from './leave-balance-display/leave-balance-display.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'leave-balance-display', component: LeaveBalanceDisplayComponent },
  { path: 'leave-request-form', component: LeaveRequestFormComponent },
  { path: 'leave-history', component: LeaveHistoryComponent },
];
