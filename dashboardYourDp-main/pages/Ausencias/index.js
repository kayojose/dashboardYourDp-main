// Função para abrir o modal e exibir o ID do usuário
function openModal(ausencias) {
  const modal = document.getElementById("modalAusencia");

  const tableBody = document.querySelector("#idTable tbody");
  tableBody.innerHTML = "";

  ausencias.shift()

  ausencias.forEach(ausencia => {
    const row = document.createElement("tr");

    const dia = document.createElement("td");
    dia.textContent = ausencia.dia;
    row.appendChild(dia);

    const motivo = document.createElement("td");
    motivo.textContent = ausencia.motivo;
    row.appendChild(motivo);

    const linkDownload = document.createElement("a");
    linkDownload.href = ausencia.arquivo
    linkDownload.download = ausencia.arquivo
    linkDownload.textContent = "Baixar arquivo"

    linkDownload.addEventListener("click", function (event) {
      // Impedir o comportamento padrão do link
      event.preventDefault();
      // Abrir a URL do arquivo em uma nova janela ou guia do navegador
      window.open(this.href, "_blank");
    });

    row.appendChild(linkDownload);


    tableBody.appendChild(row);
  })


  modal.style.display = "block";
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById("modalAusencia");
  modal.style.display = "none";
}

// Função para buscar e exibir os usuários na tabela
async function fetchUsers() {
  const response = await fetch('https://api-yourdp.onrender.com/users');
  const users = await response.json();

  const tableBody = document.querySelector("#userTable tbody");
  tableBody.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = users.indexOf(user) + 1;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const actionsCell = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "Verificar";
    button.addEventListener("click", () => openModal(user.ausencia));
    actionsCell.appendChild(button);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

// Chamar a função fetchUsers para buscar e exibir os usuários na tabela
fetchUsers();

