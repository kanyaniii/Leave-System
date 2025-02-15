# แผนการพัฒนาระบบลางาน (Leave System) 
# Angular

Angular 18 มาพร้อมกับ ประสิทธิภาพที่ดีขึ้น และ ฟีเจอร์ใหม่ๆ ที่ช่วยให้นักพัฒนาทำงานได้ง่ายขึ้น
🔹 คุณสมบัติเด่นของ Angular 18
✅ Signals API – ปรับปรุงการจัดการสถานะ (State Management)
✅ Deferred Views – โหลด Component เฉพาะเมื่อต้องใช้งาน (Lazy Rendering)
✅ Better Hydration – รองรับ Server-Side Rendering (SSR) ได้ดีขึ้น
✅ Standalone Components – ลดการพึ่งพา NgModules
✅ View Transitions API – ทำ Animation ระหว่างหน้าได้ง่ายขึ้น

# การเริ่มต้นใช้งาน

## 1.ติดตั้ง Angular CLI Version18.2.14
ก่อนอื่นต้องติดตั้ง Node.js และ npm ให้พร้อมใช้งาน จากนั้นติดตั้ง Angular CLI โดยการรันคำสั่งนี้:

Run `npm install -g @angular/cli@18.2.14`

## 2.ตรวจสอบเวอร์ชันที่ติดตั้ง
หลังจากติดตั้งเสร็จแล้ว คุณสามารถตรวจสอบว่า Angular CLI ติดตั้งเวอร์ชัน 18.2.14 หรือไม่ โดยการรันคำสั่งนี้ในคอมมานด์ไลน์:
Run `ng version`

## 3.สร้างโปรเจค Angular ใหม่
หลังจากติดตั้ง Angular CLI แล้ว ให้สร้างโปรเจค Angular ใหม่ด้วยคำสั่ง:

Run `ng new my-angular-app`

## 4.รันแอปพลิเคชัน
หลังจากสร้างโปรเจคเสร็จแล้ว ให้เข้าไปในไดเรกทอรีของโปรเจคและเริ่มเซิร์ฟเวอร์การพัฒนา:

Run `cd my-angular-app`
Run `ng serve`

แอปพลิเคชันจะพร้อมใช้งานที่ http://localhost:4200/

## 5. สร้างคอมโพเนนต์, เซอร์วิส, ฯลฯ
สามารถสร้างคอมโพเนนต์ใหม่, เซอร์วิส, หรือโมดูลด้วยคำสั่ง ng generate เช่น:

Run `ng generate component my-component`
Run `ng generate service my-service`

## 6. สร้างคอมโพเนนต์, เซอร์วิส, ฯลฯ
เมื่อแอปพลิเคชันพร้อมใช้งานในโปรดักชันแล้ว ให้สร้างแอปเพื่อใช้งานในสภาพแวดล้อมการผลิต:
Run `ng build --prod`

# คำสั่งทั่วไปของ Angular

## สร้างโปรเจคใหม่

Run `ng new <project-name>` 

## รันแอปพลิเคชัน

Run `ng serve` 

## สร้างคอมโพเนนต์ใหม่

Run `ng generate component <component-name>` 

## สร้างโปรเจคสำหรับการผลิต

Run `ng build --prod` 

## รันการทดสอบหน่วย (unit test)

Run `ng test` 

## รันการทดสอบแบบ end-to-end (e2e test)

Run `ng e2e` 
