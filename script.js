// ⚠️ แก้บรรทัดนี้: นำ Web App URL ที่ได้จากการ Deploy Google Apps Script มาใส่แทนค่าด้านล่าง
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw8uIBVPSEFyUSPopmN3ULP9zrVvqUxT6L2DvUIUTl8kAYAlNOOZwOJs5zgqXwkrMPl9A/exec";

const form = document.getElementById("registerForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

const aiGoalInput = document.getElementById("aiGoal");
const aiGoalCount = document.getElementById("aiGoalCount");
const suggestionInput = document.getElementById("suggestion");
const suggestionCount = document.getElementById("suggestionCount");

// นับจำนวนตัวอักษรใน textarea แบบเรียลไทม์
function bindCharCount(input, counter) {
  input.addEventListener("input", () => {
    counter.textContent = input.value.length;
  });
}
bindCharCount(aiGoalInput, aiGoalCount);
bindCharCount(suggestionInput, suggestionCount);

function setMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message" + (type ? " " + type : "");
}

function getCheckedValues(name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`))
    .map((el) => el.value)
    .join(", ");
}

function getRadioValue(name) {
  const el = form.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = {
    prefix: getRadioValue("prefix"),
    studentId: document.getElementById("studentId").value.trim(),
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    nickname: document.getElementById("nickname").value.trim(),
    birthdate: document.getElementById("birthdate").value,
    year: getRadioValue("year"),
    faculty: document.getElementById("faculty").value,
    major: document.getElementById("major").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    lineId: document.getElementById("lineId").value.trim(),
    level: getRadioValue("level"),
    interests: getCheckedValues("interests"),
    languages: getCheckedValues("languages"),
    aiGoal: aiGoalInput.value.trim(),
    suggestion: suggestionInput.value.trim(),
    confirm: document.getElementById("confirm").checked ? "ยินยอม" : "",
  };

  submitBtn.disabled = true;
  setMessage("กำลังบันทึกข้อมูล...", "loading");

  try {
    // Google Apps Script Web App ไม่ส่ง header CORS กลับมาให้อ่านค่า response ได้
    // จึงใช้ mode "no-cors" ส่งข้อมูลแบบ fire-and-forget แล้วถือว่าสำเร็จถ้าไม่มี network error
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    setMessage("ลงทะเบียนสำเร็จ", "success");
    form.reset();
    aiGoalCount.textContent = "0";
    suggestionCount.textContent = "0";
  } catch (err) {
    console.error(err);
    setMessage("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง", "error");
  } finally {
    submitBtn.disabled = false;
  }
});