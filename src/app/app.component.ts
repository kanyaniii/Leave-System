import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

import { LeaveRequestFormComponent } from './leave-request-form/leave-request-form.component';
import { LeaveBalanceDisplayComponent } from './leave-balance-display/leave-balance-display.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { NavbarComponent } from './Features/navbar/navbar.component';
import { DatepickerComponent } from './dashboard/components/datepicker/datepicker.component'

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    LeaveRequestFormComponent,
    LeaveBalanceDisplayComponent,
    DashboardComponent,
    LeaveHistoryComponent,
    NavbarComponent,
    MatIconModule,
    DatepickerComponent,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'leaveSystem-angular';

  currentComponent: string = ''; 
  isDarkMode = false;

  // ฟังก์ชันในการเปลี่ยนธีม
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    // สลับธีมตามค่า isDarkMode
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light'); 
    }
  }

  // ฟังก์ชันสำหรับเปลี่ยนแปลง component ที่จะแสดง
  setComponent(componentName: string) {
    this.currentComponent = componentName;
  }
}
