import { Component,  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    RouterOutlet
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  @Output() onNavigate = new EventEmitter<string>();

  // ฟังก์ชันที่ใช้ในการเลือก component ที่จะแสดง
  navigateTo(componentName: string) {
    this.onNavigate.emit(componentName);
  }

  navigateToDashboard() {
    console.log('Navigating to Dashboard');
    this.router.navigate(['/dashboard']);
  }
  
  navigateToLeaveRequest() {
    console.log('Navigating to Leave Request Form');
    this.router.navigate(['/leave-request-form']);
  }
  
  navigateToLeaveHistory() {
    console.log('Navigating to Leave History');
    this.router.navigate(['/leave-history']);
  }
}
