import fs from'fs';
import data from '../../data/db.json';

//ตอนแรกว่าจะทำแยกฟังก์ชันแล้วค่อย Import  ไปใช้เอา
// ตรวจสอบว่า data เป็น Array หรือ Object
const items = Array.isArray(data.products) ? data.products : [];

const updateProduct = (id, name, newData) => { 
    const index = items.findIndex(item => item.id === id && item.name === name);
    
    if (index === -1) { 
        console.log(" Cannot find the product with ID and name");
        return null;
    }

    // Copy ข้อมูลเก่าไว้ก่อน ไม่ให้ถูกเปลี่ยน
    const oldData = { ...items[index] };

    //  Log ข้อมูลเก่าก่อนอัปเดต
    console.log("🔹 Old Data:", JSON.stringify(oldData, null, 2));

    // อัปเดตข้อมูล
    items[index] = { ...items[index], ...newData };

    // Log ข้อมูลใหม่หลังอัปเดต
    console.log(" Updated Data:", JSON.stringify(items[index], null, 2));

    // บันทึกไฟล์ db.json ใหม่
    fs.writeFileSync('./db.json', JSON.stringify({ products: items }, null, 2), 'utf-8');
    
    return items[index];
};

// ตัวอย่างการอัปเดตข้อมูล
updateProduct(1, "Wireless Headphones", { price: 79.99, stock: 50 });
