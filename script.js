let selectedRow = null;

// Form submission handler
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const studentClass = document.getElementById('class').value;
    const rollNo = document.getElementById('rollNo').value;

if (!validateName(name)) {
    alert("Please enter a valid name (letters and spaces only).");
    return;
}
if (!validateStudentId(studentId)) {
    alert("Please enter a valid Student ID (alphanumeric only).");
    return;
}
if (!validateClass(studentClass)) {
    alert("Please enter a valid class.");
    return;
}
if (!validateRollNo(rollNo)) {
    alert("Please enter a valid Roll No (positive number).");
    return;
}
if (selectedRow == null) {
    addRecordToTable(name, studentId, studentClass, rollNo);
} else {
    updateRecord(name, studentId, studentClass, rollNo);
}
resetForm();
});


// Function to add a new record
function addRecordToTable(name, studentId, studentClass, rollNo) {
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.length);
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = studentId;
    newRow.insertCell(2).innerHTML = studentClass;
    newRow.insertCell(3).innerHTML = rollNo;
    newRow.insertCell(4).innerHTML = `
        <div class="actions">
            <button class="edit" onclick="editRecord(this)">Edit</button>
            <button class="delete" onclick="deleteRecord(this)">Delete</button>
        </div>`;
}

// Function to edit a record
function editRecord(td) {
    selectedRow = td.parentElement.parentElement.parentElement;
    document.getElementById('name').value = selectedRow.cells[0].innerHTML;
    document.getElementById('studentId').value = selectedRow.cells[1].innerHTML;
    document.getElementById('class').value = selectedRow.cells[2].innerHTML;
    document.getElementById('rollNo').value = selectedRow.cells[3].innerHTML;
}

// Function to update an existing record
function updateRecord(name, studentId, studentClass, rollNo) {
    selectedRow.cells[0].innerHTML = name;
    selectedRow.cells[1].innerHTML = studentId;
    selectedRow.cells[2].innerHTML = studentClass;
    selectedRow.cells[3].innerHTML = rollNo;
    selectedRow = null;
}

// Function to delete a record
function deleteRecord(td) {
    if (confirm('Are you sure you want to delete this record?')) {
        const row = td.parentElement.parentElement.parentElement;
        document.getElementById('studentTable').deleteRow(row.rowIndex);
    }
}

// Function to reset the form
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('studentId').value = '';
    document.getElementById('class').value = '';
    document.getElementById('rollNo').value = '';
    selectedRow = null;
}

function resetField(fieldId) {
    document.getElementById(fieldId).value = ''; // Clear the incorrect input field
}

function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

// Student ID validation (alphanumeric)
function validateStudentId(studentId) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(studentId);
}

// Class validation (e.g., 1-12, A-D)
function validateClass(studentClass) {
    const regex = /^[A-Za-z0-9]+$/; // Adjust according to the allowed class format
    return regex.test(studentClass);
}

// Roll No validation (positive numbers only)
function validateRollNo(rollNo) {
    const regex = /^[0-9]+$/;
    return regex.test(rollNo) && Number(rollNo) > 0;
}
