let students = JSON.parse(localStorage.getItem("students")) || [];

function renderStudents() {
  const list = document.getElementById("student-list");
  list.innerHTML = "";
  students.forEach((student, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${student.name} - ${student.age} años
      <button onclick="deleteStudent(${index})">Eliminar</button>
    `;
    list.appendChild(li);
  });
}

function addStudent(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  students.push({ name, age });
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  event.target.reset();
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

document.getElementById("student-form").addEventListener("submit", addStudent);

renderStudents();
