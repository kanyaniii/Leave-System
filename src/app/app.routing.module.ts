import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveBalanceDisplayComponent } from './leave-balance-display/leave-balance-display.component';
import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { RoleGuardComponent } from './role-guard/role-guard.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'leave-balance-display', component: LeaveBalanceDisplayComponent },
  { path: 'leave-request-form', component: LeaveRequestFormComponent },
  { path: 'leave-history', component: LeaveHistoryComponent },
  { path: 'role-guard', component: RoleGuardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
