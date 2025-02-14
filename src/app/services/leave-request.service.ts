import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  private apiUrl = 'http://localhost:8080/api/leave'; // URL ของ Backend API

  constructor(private http: HttpClient) {}

  // POST: สร้างคำขอลา
  createLeaveRequest(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/leave-requests`, request);
  }

  // GET: ดูประวัติการลา
  getAllLeaveRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leave-requests`);
  }

  // PUT: อัพเดทสถานะการลา
  updateLeaveRequestStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/leave-requests${id}`, status);
  }

  // GET: ดูจำนวนวันลาคงเหลือ
  getLeaveBalances(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leave-balances/${userId}`);
  }
}
