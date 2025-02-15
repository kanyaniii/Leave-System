import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
    DatePipe,
    CommonModule
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
      console.log('Query Params:', params);
      this.leaveType = params['leaveType'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
      this.leaveReason = params['leaveReason'];
      const status = params['status'];
      const days = params['days'];
  
      // คุณสามารถแสดงข้อมูลต่างๆ ที่ได้รับจาก queryParams
      console.log('Leave Type:', this.leaveType);
      console.log('Start Date:', this.startDate);
      console.log('End Date:', this.endDate);
      console.log('Leave Reason:', this.leaveReason);
      console.log('Days:', days);

        const newRequest = {
          leaveType: this.leaveType,
          startDate: this.startDate,
          endDate: this.endDate,
          leaveReason: this.leaveReason,
          days: days,
          status: 'รออนุมัติ'
        };
  
        // เพิ่มข้อมูลคำขอที่รออนุมัติ
        this.pendingRequests.push(newRequest);
        console.log('Updated pending requests:', this.pendingRequests); 
  
        // อัปเดต MatTableDataSource หลังจากเพิ่มข้อมูลใหม่
        this.dataSource = new MatTableDataSource(this.pendingRequests);  // อัปเดตให้ dataSource ใช้ pendingRequests
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

  approveLeave(request: any) {
    if (request) {
      const index = this.pendingRequests.indexOf(request);
      if (index > -1) {
        this.pendingRequests[index].status = 'อนุมัติ';
        this.approvedRequests.push(this.pendingRequests[index]);
        this.pendingRequests.splice(index, 1);
  
        // อัปเดต dataSource หลังจากการเปลี่ยนแปลง
        this.dataSource = new MatTableDataSource(this.pendingRequests);
  
        Swal.fire({
          title: 'คำขอลาถูกอนุมัติ!',
          text: 'คำขอลาได้รับการอนุมัติเรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        });
  
        // ส่งข้อมูลไปยังหน้า LeaveHistoryComponent
        this.router.navigate(['/leave-history'], {
          queryParams: {
            leaveType: request.leaveType,
            startDate: request.startDate,
            endDate: request.endDate,
            leaveReason: request.leaveReason,
            status: 'อนุมัติ'
          }
        });
      }
    }
  }  
  
  rejectLeave(request: any) {
    const index = this.pendingRequests.indexOf(request);
    if (index > -1) {
      this.pendingRequests[index].status = 'ไม่อนุมัติ';
      this.pendingRequests.splice(index, 1);
  
      // อัปเดต dataSource เพื่อให้ตารางแสดงผลใหม่
      this.dataSource = new MatTableDataSource(this.pendingRequests);
  
      Swal.fire({
        title: 'คำขอลาถูกปฏิเสธ!',
        text: 'คำขอลาไม่ได้รับการอนุมัติ',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });

      this.router.navigate(['/leave-history'], {
        queryParams: {
          leaveType: request.leaveType,
          startDate: request.startDate,
          endDate: request.endDate,
          leaveReason: request.leaveReason,
          status: 'อนุมัติ'
        }
      });
    }
  }
  
}
