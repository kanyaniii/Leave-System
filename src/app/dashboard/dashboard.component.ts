import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';  // ใช้สำหรับแสดงข้อมูลในตาราง
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
  selector: 'app-dashboard',
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
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe] 
})
export class DashboardComponent implements OnInit {

  leaveType: string = '';
  startDate: string = '';
  endDate: string = '';
  leaveReason: string = '';
  status: string = '';
  days: number = 0;

  // ข้อมูลคำขอลาที่ได้รับการอนุมัติ
  approvedRequests: any[] = [];
  pendingRequests: any[] = [];  // คำขอลาที่รออนุมัติ
  totalLeaveDays: number = 20; // ตัวอย่าง จำนวนวันลาทั้งหมดที่พนักงานมี
  totalLeaveUsed: number = 0; // จำนวนวันลาที่ใช้ไป

  displayedColumns: string[] = ['startDate', 'endDate', 'leaveType', 'days', 'status']; // กำหนดคอลัมน์ที่จะใช้ในตาราง
  dataSource = new MatTableDataSource(this.approvedRequests);  // ใช้ MatTableDataSource สำหรับตาราง

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit() {
    // รับข้อมูลจาก queryParams
    this.route.queryParams.subscribe(params => {
      this.leaveType = params['leaveType'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
      this.leaveReason = params['leaveReason'];
      this.status = params['status'];
      this.days = params['days'];

      // ถ้าคำขอได้รับการอนุมัติ
      if (this.status === 'อนุมัติ') {
        this.approvedRequests.push({
          startDate: this.startDate,
          endDate: this.endDate,
          leaveType: this.leaveType,
          days: this.days,
          status: 'อนุมัติ'
        });

        this.totalLeaveUsed += this.days; // เพิ่มจำนวนวันที่ใช้ไป

        // อัพเดตข้อมูลใน MatTableDataSource เพื่อให้แสดงในตาราง
        this.dataSource.data = this.approvedRequests;
      } else if (this.status === 'รออนุมัติ') {
        this.pendingRequests.push({
          startDate: this.startDate,
          endDate: this.endDate,
          leaveType: this.leaveType,
          days: this.days,
          status: 'รออนุมัติ'
        });
      }
    });
  }

  // ฟังก์ชันแปลงวันที่เป็นรูปแบบที่ต้องการ
  getFormattedStartDate(date: string) {
    return this.datePipe.transform(date, 'M/d/yyyy'); 
  }

  getFormattedEndDate(date: string) {
    return this.datePipe.transform(date, 'M/d/yyyy'); 
  }

  // ฟังก์ชันคำนวณวันลาคงเหลือ
  getRemainingLeaveDays(): number {
    return this.totalLeaveDays - this.totalLeaveUsed;
  }

  // ฟังก์ชันคำนวณคำขอลาที่รออนุมัติ
  getPendingLeaveRequests(): number {
    return this.pendingRequests.length;
  }

  // ฟังก์ชันคำนวณวันลาที่ใช้ไปทั้งหมดในปีนี้
  getTotalLeaveUsed(): number {
    let totalUsed = 0;
    this.approvedRequests.forEach(request => {
      totalUsed += parseInt(request.days, 10);  // แปลงวันเป็นตัวเลข
    });
    return totalUsed;  // คืนค่าเป็นตัวเลขที่ไม่มีเลข 0 ข้างหน้า
  }

  // ฟังก์ชันคำนวณจำนวนวันระหว่างวันที่เริ่มต้นและวันที่สิ้นสุด
  calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return dayDifference + 1;  // +1 เนื่องจากรวมวันเริ่มต้น
  }
}
