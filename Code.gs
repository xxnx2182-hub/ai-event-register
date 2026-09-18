// Code.gs — วางไฟล์นี้ใน Google Apps Script ที่ผูกกับ Google Sheets ของคุณ

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // ถ้ายังไม่มีหัวตาราง ให้สร้างหัวตารางในแถวแรก
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "คำนำหน้า",
        "รหัสนิสิต",
        "ชื่อจริง",
        "นามสกุล",
        "ชื่อเล่น",
        "วันเกิด",
        "ชั้นปี",
        "คณะ",
        "สาขาวิชา",
        "อีเมล",
        "เบอร์โทรศัพท์",
        "LINE ID",
        "ระดับประสบการณ์ AI",
        "หัวข้อที่สนใจ",
        "ภาษาโปรแกรม",
        "อยากใช้ AI ทำอะไร",
        "ข้อเสนอแนะเพิ่มเติม",
        "ยืนยันการยินยอม",
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.prefix || "",
      data.studentId || "",
      data.firstName || "",
      data.lastName || "",
      data.nickname || "",
      data.birthdate || "",
      data.year || "",
      data.faculty || "",
      data.major || "",
      data.email || "",
      data.phone || "",
      data.lineId || "",
      data.level || "",
      data.interests || "",
      data.languages || "",
      data.aiGoal || "",
      data.suggestion || "",
      data.confirm || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ฟังก์ชันนี้ใช้แค่ทดสอบว่า Web App เปิดใช้งานอยู่ (เข้าผ่านลิงก์ตรง ๆ จะเห็นข้อความนี้)
function doGet(e) {
  return ContentService.createTextOutput("Web App is running.");
}
