let students = [];
const resultList = document.getElementById("resultList");


function assignGrades() {
    const name = document.getElementById("name").value;
    const matricula = document.getElementById("matricula").value;
    // const nota1 = document.getElementById("nota1").value || Math.floor(Math.random() * 21);
    // const nota2 = document.getElementById("nota2").value || Math.floor(Math.random() * 21);
    // const nota3 = document.getElementById("nota3").value || Math.floor(Math.random() * 21);

    const nota1 = Math.floor(Math.random() * 21);
    const nota2 = Math.floor(Math.random() * 21);
    const nota3 = Math.floor(Math.random() * 21);

    if (name && matricula) {
        const media = ((+nota1 + +nota2 + +nota3) / 3).toFixed(2);
        const estado = studentStatus(media);

        students.push({ name, matricula, nota1, nota2, nota3, media, estado });
        alert(`Notas atribuídas a ${name} com sucesso!`);
        clearForm();
    } else {
        alert("Por favor, insira o nome e número de matrícula.");
    }
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("matricula").value = "";
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
                <th>Acção</th>

            </tr>
        </thead>
        <tbody>
            ${students.map((student, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.matricula}</td>
                    <td>${student.nota1}</td>
                    <td>${student.nota2}</td>
                    <td>${student.nota3}</td>
                    <td>${student.media}</td>
                    <td>${student.estado}</td>
                    <td><button onclick="deleteRecord('${student.matricula}')">Excluir</button></td>
                </tr>
            `).join('')}
        </tbody>
    `;
    resultList.appendChild(table);
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function deleteRecord(matricula) {
    students = students.filter(student => student.matricula !== matricula);

    viewGrades();
}
