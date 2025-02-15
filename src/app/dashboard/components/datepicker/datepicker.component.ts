import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { FormsModule, } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    FormsModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatFormFieldModule,
     MatSelectModule,
     MatIconModule,
     MatPaginatorModule,
     MatCardModule,
     MatToolbarModule,
     CommonModule
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  selectedDate: Date | null = null;
  selectedPerson: string = '';
  eventType: string = '';
  people = ['บุคลากร 1', 'บุคลากร 2', 'บุคลากร 3'];
  eventTypes = ['ลาป่วย', 'ลากิจ', 'สัมมนาผู้บริหาร']; // ประเภทเหตุการณ์
  events = [
    { date: new Date(2025, 1, 16), type: 'leave', description: 'ลาป่วย' },
    { date: new Date(2025, 1, 17), type: 'leave', description: 'ลาป่วย' },
    { date: new Date(2025, 1, 23), type: 'work', description: 'สัมมนาผู้บริหาร' },
    { date: new Date(2025, 1, 24), type: 'work', description: 'สัมมนาผู้บริหาร' },
  ];

  // ฟังก์ชันเพิ่มเหตุการณ์
  addEvent() {
    if (this.selectedDate && this.selectedPerson && this.eventType) {
      const newEvent = {
        date: new Date(this.selectedDate),
        type: this.eventType === 'ลาป่วย' ? 'leave' : this.eventType === 'ลากิจ' ? 'sick' : 'work',
        description: `${this.selectedPerson} - ${this.eventType}`,
      };
      this.events.push(newEvent);
      this.resetForm();
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }

  // ฟังก์ชันรีเซ็ตค่าในฟอร์ม
  resetForm() {
    this.selectedDate = null;
    this.selectedPerson = '';
    this.eventType = '';
  }
}
