import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';  
import { DatePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';  

@Component({
  selector: 'app-leave-balance-display',
  standalone: true,
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    DatePipe
  ],
  templateUrl: './leave-balance-display.component.html',
  styleUrls: ['./leave-balance-display.component.scss'],
  providers: [DatePipe] 
})
export class LeaveBalanceDisplayComponent implements OnInit {
  leaveType: string = '';
  startDate: string = '';
  endDate: string = '';
  leaveReason: string = '';
  comment: string = '';
  approvedRequests: any[] = [];
  pendingRequests: any[] = []; 
  displayedColumns: string[] = ['startDate', 'endDate', 'leaveType', 'days', 'status'];
  dataSource = new MatTableDataSource(this.pendingRequests); 

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.leaveType = params['leaveType'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
      this.leaveReason = params['leaveReason'];
      const status = params['status'];
      const days = this.calculateDays(this.startDate, this.endDate);

      if (status === 'รออนุมัติ') {
        this.pendingRequests.push({
          leaveType: this.leaveType,
          startDate: this.startDate,
          endDate: this.endDate,
          leaveReason: this.leaveReason,
          days: days,
          status: 'รออนุมัติ'
        });
        this.dataSource.data = this.pendingRequests;
      }
    });
  }

  getFormattedStartDate(date: string) {
    return this.datePipe.transform(date, 'M/d/yyyy');
  }

  getFormattedEndDate(date: string) {
    return this.datePipe.transform(date, 'M/d/yyyy');
  }

  calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24)) + 1; // รวมวันเริ่มต้น
  }

  // ฟังก์ชันอนุมัติคำขอ
  approveLeave(request: any) {
    const index = this.pendingRequests.indexOf(request);
    if (index > -1) {
      this.pendingRequests[index].status = 'อนุมัติ';
      this.approvedRequests.push(this.pendingRequests[index]);
      this.pendingRequests.splice(index, 1);
    }

    // อัพเดตแสดงผลในตาราง
    this.dataSource.data = this.pendingRequests;
    Swal.fire({
      title: 'คำขอลาถูกอนุมัติ!',
      text: 'คำขอลาได้รับการอนุมัติเรียบร้อยแล้ว',
      icon: 'success',
      confirmButtonText: 'ตกลง'
    });
  }

  // ฟังก์ชันไม่อนุมัติคำขอ
  rejectLeave(request: any) {
    const index = this.pendingRequests.indexOf(request);
    if (index > -1) {
      this.pendingRequests[index].status = 'ไม่อนุมัติ';
      this.pendingRequests.splice(index, 1);
    }

    // อัพเดตแสดงผลในตาราง
    this.dataSource.data = this.pendingRequests;
    Swal.fire({
      title: 'คำขอลาถูกปฏิเสธ!',
      text: 'คำขอลาไม่ได้รับการอนุมัติ',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    });
  }
}
