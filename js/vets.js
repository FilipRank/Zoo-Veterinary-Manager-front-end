const table = document.getElementById("table");
const template = document.getElementById("veterinarians");
fetch("http://localhost:8080/veterinarian")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((vet) => {
      const copy = template.content.cloneNode(true);

      copy.querySelector(".id").innerText = vet.id;
      copy.querySelector(".name").innerText = vet.name;
      copy.querySelector(".surname").innerText = vet.surname;
      copy.querySelector(".id-card-code").innerText = vet.idCardCode;
        
      if (vet.tasks.length == 0) {
        const li = document.createElement("li")
        li.className = "task dropdown-item"
        li.innerText = "No tasks"
        copy.querySelector(".tasks").appendChild(li)
      }  

      vet.tasks.forEach(task => {
        const li = document.createElement("li")
        li.className = "task dropdown-item"
        li.innerText = task.name
        copy.querySelector(".tasks").appendChild(li)
      })

      table.appendChild(copy);
    });
  });
