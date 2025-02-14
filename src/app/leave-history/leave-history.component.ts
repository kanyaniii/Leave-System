import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // นำเข้าไลบรารี xlsx
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
//import { ChartsModule } from 'ng2-charts'; // นำเข้าโมดูล Charts
//import { ChartDataSets, ChartOptions } from 'chart.js';
//import { Color, Label } from 'ng2-charts';

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
       MatDividerModule
       //ChartsModule
  ],
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.scss'
})
export class LeaveHistoryComponent implements OnInit {
  @ViewChild('leaveChart') leaveChartElement!: ElementRef;

  leaveDetails: any[] = [];  // รายการการลา
  leaveType: string = '';
  startDate: string = '';
  endDate: string = '';
  leaveReason: string = '';
  status: string = '';

  leaveHistory: any[] = [];
  displayedColumns: string[] = ['leaveType', 'startDate', 'endDate', 'leaveReason', 'status']; 
  dataSource = new MatTableDataSource(this.leaveHistory);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.leaveType = params['leaveType'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
      this.leaveReason = params['leaveReason'];
      this.status = params['status'];

      if (this.status === 'อนุมัติ') {
        this.leaveHistory.push({
          leaveType: this.leaveType,
          startDate: this.startDate,
          endDate: this.endDate,
          leaveReason: this.leaveReason,
          status: 'อนุมัติ'
        });

        // อัพเดตข้อมูลใน MatTableDataSource เพื่อให้แสดงในตาราง
        this.dataSource.data = this.leaveHistory;
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
