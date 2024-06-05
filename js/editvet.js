const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const name = document.getElementById("name");
const surname = document.getElementById("surname");
const idCardCode = document.getElementById("id-card-code");

if (id == null || id == "") {
  window.location.href = "./vets.html";
}

fetch("http://localhost:8080/veterinarian/" + id)
  .then((rsp) => rsp.json())
  .then((data) => {
    document.getElementById(
      "breadcrumb-name"
    ).innerText = `${data.name} ${data.surname}`;
    document.getElementById("name").value = data.name;
    document.getElementById("surname").value = data.surname;
    document.getElementById("id-card-code").value = data.idCardCode;
  });

//perform put
document.getElementById("save").addEventListener("click", () => {
  fetch(`http://localhost:8080/veterinarian/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      surname: surname.value,
      idCardCode: idCardCode.value,
    }),
  }).then((rsp) => {
    window.location.href = "./vets.html";
  });
});
