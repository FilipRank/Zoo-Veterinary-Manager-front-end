const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const name = document.getElementById("name");
const species = document.getElementById("species");
const healthStatus = document.getElementById("health-status");

if (id == null || id == "") {
    window.location.href = './animals.html'
}

fetch("http://localhost:8080/animal/" + id)
.then(rsp => rsp.json())
.then(data => {
    document.getElementById("breadcrumb-name").innerText = `${data.name} (${data.species})`
    document.getElementById("name").value = data.name
    document.getElementById("species").value = data.species;
    document.getElementById("health-status").value = data.healthStatus;
})

//perform put
document.getElementById("save").addEventListener("click", () => {
    fetch(`http://localhost:8080/animal/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        species: species.value,
        healthStatus: healthStatus.value,
      }),
    }).then((rsp) => {
      window.location.href = "./animals.html";
    });
    
})