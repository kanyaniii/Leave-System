import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-role-guard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './role-guard.component.html',
  styleUrl: './role-guard.component.scss'
})
export class RoleGuardComponent {

  constructor(private router: Router) {}

  // นำทางไปยังหน้าของพนักงาน
  navigateToEmployee() {
    this.router.navigate(['/dashboard']);
  }

  // นำทางไปยังหน้าของผู้จัดการ
  navigateToManager() {
    this.router.navigate(['/leave-balance-display']);
  }
}
