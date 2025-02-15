import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // นำเข้าไลบรารี xlsx
import { ChartsModule } from 'ng2-charts';  // นำเข้าโมดูล ChartsModule
import { ChartOptions, ChartData, ChartType } from 'chart.js';

//import * as echarts from 'echarts';

import { FormsModule, } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource } from '@angular/material/table';  // ใช้สำหรับแสดงข้อมูลในตาราง


@Component({
  selector: 'app-leave-history',
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
       //ChartsModule
  ],
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.scss'
})
export class LeaveHistoryComponent implements OnInit {
  @ViewChild('leaveChart') leaveChartElement!: ElementRef;


  leaveType: string = '';
  startDate: string = '';
  endDate: string = '';
  leaveReason: string = '';
  status: string = '';

  leaveHistory: any[] = [];
  displayedColumns: string[] = ['leaveType', 'startDate', 'endDate', 'leaveReason', 'status']; 
  dataSource = new MatTableDataSource(this.leaveHistory);

  leaveDetails = [
    {
      name: 'บิ๋ม บิ๋ม', leaveType: 'นักศึกษาฝึกงาน', sickLeave: 1, personalLeave: 0, vacationLeave: 0, together: 1
    },
    {
      name: 'สมชาย ใจดี', leaveType: 'IT', sickLeave: 2, personalLeave: 1, vacationLeave: 0, together: 3
    },
    {
      name: 'สมหญิง รักษางาน', leaveType: 'HR', sickLeave: 1, personalLeave: 2, vacationLeave: 1, together: 4
    }
  ];

  // กราฟ
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public barChartLabels: string[] = ['ลาป่วย', 'ลากิจ', 'ลาพักร้อน'];
  // public barChartData: ChartData<'bar'> = {
  //   labels: this.barChartLabels,
  //   datasets: [
  //     {
  //       data: [10, 5, 7], 
  //       label: 'จำนวนการลา',
  //       backgroundColor: '#42A5F5',
  //       borderColor: '#1E88E5',
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  // public barChartType: ChartType = 'bar'; 
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const leaveType = params['leaveType'];
      const startDate = params['startDate'];
      const endDate = params['endDate'];
      const leaveReason = params['leaveReason'];
      const status = params['status'];

      if (status === 'อนุมัติ') {
        this.leaveHistory.push({
          leaveType: leaveType,
          startDate: startDate,
          endDate: endDate,
          leaveReason: leaveReason,
          status: status
        });

        // อัปเดต dataSource
        this.dataSource = new MatTableDataSource(this.leaveHistory);
      }
    });
  }
  
  // ฟังก์ชันสำหรับ export ข้อมูลเป็นไฟล์ Excel
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.leaveDetails);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Leave History');  

    // สร้างไฟล์ Excel และดาวน์โหลด
    XLSX.writeFile(wb, 'leave_history.xlsx');
  }

  viewDetails(row: any) {
    console.log('ดูรายละเอียด:', row);
  }

}
