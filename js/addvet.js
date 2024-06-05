const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const name = document.getElementById("name");
const surname = document.getElementById("surname");
const idCardCode = document.getElementById("id-card-code");

document.getElementById("breadcrumb-name").innerText = "Add a Veterinarian";
name.value = "Default";
surname.value = "Default";
idCardCode.value = "AAA111";

document.getElementById("save").addEventListener("click", () => {
  fetch("http://localhost:8080/veterinarian", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      surname: surname.value,
      idCardCode: idCardCode.value,
    }),
  }).then((rsp) => {
    window.location.href = "./vets.html";
  });
});
