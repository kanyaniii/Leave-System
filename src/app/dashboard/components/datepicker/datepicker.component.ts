import { Component } from '@angular/core';

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

@Component({
  selector: 'app-datepicker',
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
     MatChipsModule
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  selectedDate = new Date();
}
