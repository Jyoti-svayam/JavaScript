// Get DOM elements
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.querySelector("#studentTable tbody");
const totalStudentsSpan = document.getElementById("totalStudents");
const formError = document.getElementById("formError");
const searchInput = document.getElementById("search");

// Load students from localStorage or empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

// Track edit mode
let editIndex = -1;

// Function to render student table
function renderTable(filter=""){
    studentTableBody.innerHTML = "";

    const filteredStudents = students.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));

    filteredStudents.forEach((student, index) => {
        const row = document.createElement("tr");

        const status = student.marks >= 40 ? "Pass" : "Fail";

        row.innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td class="${status === "Pass" ? "pass" : "fail"}">${status}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
    totalStudentsSpan.innerText = filteredStudents.length;
}

// Function to reset form
function resetForm(){
    studentForm.reset();
    formError.innerText = "";
    editIndex = -1;
}

// Function to add/update student
studentForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = document.getElementById("marks").value.trim();

    // Validation
    if(!name || !roll || !course || !marks){
        formError.innerText = "All fields are required";
        return;
    }

    if(Number(marks) < 0 || Number(marks) > 100){
        formError.innerText = "Marks must be between 0 and 100";
        return;
    }

    // Check roll number uniqueness
    const rollExists = students.some((s, i) => s.roll === roll && i !== editIndex);
    if(rollExists){
        formError.innerText = "Roll number must be unique";
        return;
    }

    const studentData = { name, roll, course, marks };

    if(editIndex === -1){
        // Add student
        students.push(studentData);
    } else {
        // Update student
        students[editIndex] = studentData;
    }

    localStorage.setItem("students", JSON.stringify(students));
    renderTable(searchInput.value);
    resetForm();
});

// Function to delete student
function deleteStudent(index){
    if(confirm("Are you sure you want to delete this student?")){
        students.splice(index,1);
        localStorage.setItem("students", JSON.stringify(students));
        renderTable(searchInput.value);
    }
}

// Function to edit student
function editStudent(index){
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("course").value = student.course;
    document.getElementById("marks").value = student.marks;
    editIndex = index;
}

// Search functionality
searchInput.addEventListener("input", function(){
    renderTable(this.value);
});

// Initial render
renderTable();