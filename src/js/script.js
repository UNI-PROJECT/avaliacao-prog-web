let students = [];
const resultList = document.getElementById("resultList");

let studentsData = {
  2023001: "João Silva",
  2023002: "Maria Santos",
  2023003: "Carlos Pereira",
  2023004: "Ana Oliveira",
  2023005: "Pedro Gomes",
  2023006: "Marta Rodrigues",
  2023007: "Rui Almeida",
  2023008: "Sofia Costa",
  2023009: "Miguel Ferreira",
  2023010: "Inês Martins",
  2023011: "Ricardo Sousa",
  2023012: "Teresa Santos",
  2023013: "Paulo Oliveira",
};

function getRandomStudent() {
  const keys = Object.keys(studentsData);
  return studentsData[keys[Math.floor(Math.random() * keys.length)]];
}

function assignGrades() {
  const matricula = document.getElementById("matricula").value;
  const name = studentsData[matricula] || getRandomStudent();
  const nota1 = document.getElementById("nota1").value;
  const nota2 = document.getElementById("nota2").value;
  const nota3 = document.getElementById("nota3").value;

  if (!matricula || !name || !nota1 || !nota2 || !nota3) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  if (!validateGrade(nota1) || !validateGrade(nota2) || !validateGrade(nota3)) {
    alert("As notas devem estar entre 0 e 20.");
    return;
  }

  const media = ((+nota1 + +nota2 + +nota3) / 3).toFixed(2);
  const estado = studentStatus(media);

  students.push({ name, matricula, nota1, nota2, nota3, media, estado });
  alert(`Notas atribuídas a ${name} com sucesso!`);
  clearForm();
}

function validateGrade(nota) {
  return nota >= 0 && nota <= 20;
}

function clearForm() {
  document.getElementById("matricula").value = "";
  document.getElementById("name").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("nota3").value = "";
}

function clearAll() {
  alert("Tabela limpa");
  students = [];
}

function studentStatus(media) {
  if (media < 6) return "Reprovado";
  if (media < 10) return "Recurso";
  return "Aprovado";
}

function viewGrades() {
  resultList.innerHTML = "";
  const table = document.createElement("table");

  table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>1-Nota</th>
                <th>2-Nota</th>
                <th>3-Nota</th>
                <th>Média</th>
                <th>Estado</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
            ${students
              .map(
                (student, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.matricula}</td>
                    <td>${student.nota1}</td>
                    <td>${student.nota2}</td>
                    <td>${student.nota3}</td>
                    <td>${student.media}</td>
                    <td>${student.estado}</td>
                    <td><button onclick="deleteRecord('${
                      student.matricula
                    }')">Excluir</button></td>
                </tr>
            `
              )
              .join("")}
        </tbody>
    `;
  resultList.appendChild(table);
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function deleteRecord(matricula) {
  students = students.filter((student) => student.matricula !== matricula);
  viewGrades();
}

//Parte da prova
class Login {
  constructor() {
    this.username = document.getElementById("username");
    this.password = document.getElementById("password");
    this.errorMessageElement = document.getElementById("error-message");
    this.loginButton = document.getElementById("loginBtn");

    this.loginButton.addEventListener("click", (event) =>
      this.handleLogin(event)
    );
  }

  handleLogin(event) {
    event.preventDefault();

    const isValid = this.saveToDatabase(
      this.username.value,
      this.password.value
    );

    if (isValid) {
      window.location.href = "index.html";
    } else {
      alert("Login falhou. Verifique suas credenciais.");
    }
  }

  saveToDatabase(username, password) {
    return username === "mardoche" && password === "pembele";
  }
}

const login = new Login();
