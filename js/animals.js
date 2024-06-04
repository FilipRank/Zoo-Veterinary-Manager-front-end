const table = document.getElementById("table");
const template = document.getElementById("animals");

fetch("http://localhost:8080/animal")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((animal) => {
      const copy = template.content.cloneNode(true);

      copy.querySelector(".id").innerText = animal.id;
      copy.querySelector(".name").innerText = animal.name;
      copy.querySelector(".species").innerText = animal.species;
      copy.querySelector(".health-status").innerText = animal.healthStatus;
      copy.querySelector(".edit").href = `./editanimal.html?id=${animal.id}`;
      copy.querySelector(".remove").addEventListener("click", () => {
        if (confirm("Delete entry?")) {
          fetch(`http://localhost:8080/animal/${animal.id}`, {
            method: "DELETE",
          }).then(rsp => {
            window.location.href = "./animals.html"
          });
        }
      });
      table.appendChild(copy);
    });
  });
