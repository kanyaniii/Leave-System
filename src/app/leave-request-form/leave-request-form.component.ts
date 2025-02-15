import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // สำหรับ ngModel
import { ReactiveFormsModule } from '@angular/forms';  // ถ้าจะใช้ Reactive Forms
import { MatFormFieldModule } from '@angular/material/form-field';  // สำหรับ mat-form-field
import { MatInputModule } from '@angular/material/input';  // สำหรับ matInput
import { MatSelectModule } from '@angular/material/select';  // สำหรับ mat-select
import { MatDatepickerModule } from '@angular/material/datepicker';  // สำหรับ mat-datepicker
import { MatNativeDateModule } from '@angular/material/core';  // สำหรับ mat-datepicker
import { MatButtonModule } from '@angular/material/button';  // สำหรับ mat-raised-button
import { MatIconModule } from '@angular/material/icon';  // สำหรับ mat-datepicker-toggle
import { MatDialogModule } from '@angular/material/dialog';  // ถ้าต้องการใช้ Dialog
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-leave-request-form',
  standalone: true,
  imports: [
    //BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.scss'
})
export class LeaveRequestFormComponent {
  leaveType: string = '';
  startDate: string = '';
  endDate: string = '';
  leaveReason: string = '';   
  
  leaveHistory: any[] = []; 

  constructor(private router: Router) {}

  onSubmit() {
    // คำนวณจำนวนวันจากวันที่เริ่มต้นและวันที่สิ้นสุด
    const days = this.calculateDays(this.startDate, this.endDate);
  
    // ส่งข้อมูลไปยังหน้า dashboard พร้อมกับการคำนวณจำนวนวัน
    this.router.navigate(['/dashboard'], {
      queryParams: {
        leaveType: this.leaveType,
        startDate: this.startDate,
        endDate: this.endDate,
        leaveReason: this.leaveReason,
        status: 'อนุมัติ',
        days: days
      }
    });

    this.router.navigate(['/leave-balance-display'], {
      queryParams: {
        leaveType: this.leaveType,
        startDate: this.startDate,
        endDate: this.endDate,
        leaveReason: this.leaveReason,
        status: 'อนุมัติ',
        days: days
      }
    });

  
    Swal.fire({
      title: "คำขอลาได้ถูกส่งแล้ว!",
      text: "คำขอลาของคุณได้รับการส่งเรียบร้อยแล้ว",
      icon: "success",
      confirmButtonText: 'ตกลง',
      draggable: true
    });
  }
  
  // ฟังก์ชันคำนวณจำนวนวันจากวันที่เริ่มต้นและสิ้นสุด
  calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return dayDifference + 1;  // +1 เพราะรวมวันเริ่มต้นด้วย
  }

  resetForm() {
    this.leaveType = '';
    this.startDate = '';
    this.endDate = '';
    this.leaveReason = '';
  }

  onCancel() {
    this.resetForm();
  }
}
