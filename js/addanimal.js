const name = document.getElementById("name");
const species = document.getElementById("species");
const healthStatus = document.getElementById("health-status");

name.value = "Default"
species.value = "Default";
healthStatus.value = "Default";

document.getElementById("save").addEventListener("click", () => {
    fetch("http://localhost:8080/animal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        species: species.value,
        healthStatus: healthStatus.value,
      }),
    }).then(rsp => {
        window.location.href = "./animals.html"
    });
})