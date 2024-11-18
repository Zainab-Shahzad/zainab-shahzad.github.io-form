const imageUpload = document.getElementById("imageUpload");
const uploadButton = document.getElementById("uploadButton");
const uploadedImage = document.getElementById("uploadedImage");

let uploadedImageDataUrl = "";
imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImageDataUrl = e.target.result;
      uploadedImage.src = uploadedImageDataUrl;
      uploadButton.style.display = "none";
      uploadedImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("addGuardianBtn").addEventListener("click", function () {
  const guardianDiv = document.createElement("div");
  guardianDiv.classList.add("guardian-field");

  const guardianName = document.createElement("input");
  guardianName.type = "text";
  guardianName.placeholder = "Guardian name";
  guardianName.name = "guardianName[]";

  const guardianPhone = document.createElement("input");
  guardianPhone.type = "text";
  guardianPhone.placeholder = "Phone Number";
  guardianPhone.name = "guardianPhone[]";

  guardianDiv.appendChild(guardianName);
  guardianDiv.appendChild(guardianPhone);

  guardianDiv.style.width = "100%";
  guardianName.style.width = "40%";
  guardianPhone.style.width = "40%";
  guardianPhone.style.marginLeft = "5%";

  document.getElementById("guardianFields").appendChild(guardianDiv);
});

const form = document.getElementById("Form");
const outputContainer = document.createElement("div");
document.body.appendChild(outputContainer);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const studentName = document.getElementById("studentName").value;
  const fatherName = document.getElementById("fatherName").value;
  const dob = document.getElementById("dob").value;
  const rollNo = document.getElementById("rollNo").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value || "Not specified";
  const maritalStatus = document.querySelector('input[name="martial"]:checked')?.value || "Not specified";
  const email = document.getElementById("email").value;
  const homeAddress = document.getElementById("homeAddress").value;
  const guardianName = document.getElementById("guardianName").value;
  const guardianPhone = document.getElementById("guardianPhone").value;

  const newStudent = {
    studentName,
    fatherName,
    dob,
    rollNo,
    gender,
    maritalStatus,
    email,
    homeAddress,
    guardianName,
    guardianPhone,
    image: uploadedImageDataUrl
  };

  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(newStudent);
  localStorage.setItem("students", JSON.stringify(students));

  // Display data only when the form is submitted
  displayStoredData();
});

function displayStoredData() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  outputContainer.innerHTML = "<h3>Submitted Students Data:</h3>";
  if (students.length === 0) {
    outputContainer.innerHTML += "<p>No student data available.</p>";
    return;
  }

  students.forEach((student, index) => {
    const studentData = document.createElement("div");
    studentData.classList.add("student-data");
    studentData.innerHTML = `
      <h4 style="text-align:center">Student ${index + 1}</h4>
      <span><strong>Name:</strong> ${student.studentName}</span>
      <span><strong>Father's Name:</strong> ${student.fatherName}</span>
      <span><strong>DOB:</strong> ${student.dob}</span>
      <span><strong>Roll No:</strong> ${student.rollNo}</span>
      <span><strong>Gender:</strong> ${student.gender}</span>
      <span><strong>Marital Status:</strong> ${student.maritalStatus}</span>
      <span><strong>Email:</strong> ${student.email}</span>
      <span><strong>Home Address:</strong> ${student.homeAddress}</span>
      <span><strong>Guardian Name:</strong> ${student.guardianName}</span>
      <span><strong>Guardian Phone:</strong> ${student.guardianPhone}</span>
      ${student.image ? `<img src="${student.image}" alt="Uploaded Image" style="max-width: 150px; margin-top: 10px;">` : ""}
      <hr>
    `;
    outputContainer.appendChild(studentData);
  });
}
window.addEventListener("load", displayStoredData);
