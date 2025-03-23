# PROJECT1-SEC-1-Kittiphop.vue 🇰 🇮 🇹 🇹 🇮 🇵 🇭 🇴 🇵 . <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="Vue.js Logo" width="22" height="22">
## รายละเอียดโปรเจค 🔻
**หัวข้อโปรเจค: ระบบจัดการสินค้า**  
- เป็นเว็บไซต์จำลองระบบจัดการสินค้าเเละส่งของให้กับลูกค้า Logistics Marketplace มีทั้งในประเทศเเละต่างประเทศ โดยลูกค้าสามารถเข้ามาซื้อของในเว็ปไซต์ของเราได้ด้วยราคาถูกจากการยกเลิกสินค้าที่ส่งไม่สำเร็จ เเละลูกค้ายังสามารถเข้ามาประมูลสินค้าที่ถูกยกเลิกได้อีกด้วย

## รายชื่อสมาชิกและหน้าที่รับผิดชอบ


**หน้าที่รับผิดชอบในแต่ละ Week**

| รหัสนักศึกษา  | ชื่อ - นามสกุล          |      Week 1      | Week 2 | Week 3 | Week 4 | Week 5 | เปอร์เซ็นการรับผิดชอบงาน |
|---------------|-----------------|:----------------:|:------:|:------:|:------:|:------:|:------------------------:|
| 66130500009  | กิตติภพ ศิรานนท์ชัย     | create product (admin-side)   |   create product to backend (admin-side)  |  read product in cart (user-side)  |  add product to cart (user-side)  |  check bug and fix  |           20%            |
| 66130500046  | ธีรภัทร แสงมาน      | filter product (admin-side)   |   filter components (admin&user-side)   |   tracking product (admin-side)   |   tracking product (user-side)   |   check bug and fix  |           20%            |
| 66130500056  | ปรเมษฐ์ ขันทอง      | design ui    |   delete product (admin-side)   |   delete multiple products (admin-side)  |   buy product (user-side)   |   check bug and fix   |           20%            |
| 66130500059  | ปวริศญ์ สำเรียง       | update product (admin-side)   |   create function update ui (admin-side) |  re-design add,update (admin-side)   |   checking box product(admin-side)   |    check bug and fix   |           20%            |
| 66130500062  | พงศกร สินสมบูรณ์สุข    | creating ui |   retrieve product (admin-side)    |   retrieve product by id (admin-side)  |   Authentication system and ui (admin&user-side)   | check bug and fix |           20%            |

---

**Progress งานในแต่ละ Week**
| รหัสนักศึกษา | Progress Week1 | Progress Week2 | Progress Week3 | Progress Week4 | Progress Week5 |
|---------------|----------------|----------------|----------------|----------------|----------------|
| 66130500009   | create addProduct | create product from backend  | addToCart, readProduct in cart              | -              | -              |
| 66130500046   | filter product | filter components  | -              | -              | -              |
| 66130500056   | delete product and design ui. |  delete product by id and ui           |  delete multiple products (admin-side)  | -              | -              |
| 66130500059   | update Product ui | update product from backend     | -              | -              | -              |
| 66130500062   | creating ui | add retrieve product feature, add components | add get product by id , add ProductDetail component and ui | -              | -              |


---
### 🃏ฟีเจอร์หลัก (Features)
- ฟีเจอร์ล็อคอิน เเละ ลงทะเบียน - การ Login หลักๆจะมีสอง user ได้แก่ admin user และ users ทั่วไป, การลงทะเบียน user ทั่วไป <br>

**ฝั่ง admin** 
- ตรวจสอบและจัดการคลังสินค้า - เพิ่ม,เรียกดู,อัพเดท,ลบ สินค้าภายในคลัง <br>
- ฟีเจอร์ส่งของให้ลูกค้า tracking สินค้า พร้อมบอก status การขนส่ง <br>

**ฝั่ง users** 
- ฟีเจอร์ที่ลูกค้าสามารถซื้อของได้ - เรียกดูสินค้าทั้งหมด,เรียกดูรายละเอียดสินค้านั้น ๆ   เพิ่มสินค้า,ลบสินค้าในตะกร้า 
- ฟีเจอร์เติมเงิน


--- 
### คู่มือการใช้งานแอปพลิเคชัน 
--- 
### วิดิโอสาธิตการทำงานของเว็บไซต์
[Watch the video](link)

--- 
### แหล่งข้อมูลอ้างอิงหรือเป็นแรงบันดาลใจในการพัฒนา
- ref 1 ไอเดีย 
---

## วิธีการใช้งาน 💻
1. git clone : ` https://github.com/P4warit06/PROJECT2-SEC-1-Kittiphop.vue.git `
2. change directory ไปที่โฟลเดอร์ที่มีการ clone project นี้ลงไป ใช้คำสั่ง `cd your : path/path/path`
3. จากนั้นตรวจสอบว่าใน folder มีการติดตั้ง Node Module หรือยัง ถ้ายังให้ใช้คำสั่ง `npm install`  หรือ `npm i`
4. จากนั้นทดลองรันโปรเจคด้วยคำสั่ง `npm run dev `
5. จากนั้นให้ตรวจสอบว่าปรากฎตัว "localhost:xxxx" ให้ทดสอบหรือไม่
---

## Tool ที่ใช้ในโปรเจคนี้ 🔍
- Vue.js <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="Vue.js Logo" width="22" height="22">
- JavaScript <img src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg" alt="Js.js Logo" width="22" height="22">
- HTML / Tailwind Framework &nbsp;  <img src="https://cdn.worldvectorlogo.com/logos/html-1.svg" alt="Html.js Logo" width="22" height="22"> |  <img src="https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" alt="Tailwind.js Logo" width="22" height="22">
- Daisy UI for icon  <img src="https://avatars.githubusercontent.com/u/76870092?s=280&v=4" alt="daisy.Logo" width="22" height="22">

---

### หมายเหตุ:
หากพบปัญหาหรือข้อผิดพลาดในการรันโปรเจค  กรุณาติดต่อสมาชิกในทีมเพื่อแก้ไขปัญหาดังกล่าว
