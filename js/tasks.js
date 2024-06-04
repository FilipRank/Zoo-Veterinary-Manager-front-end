const table = document.getElementById("table");
const template = document.getElementById("tasks");
fetch("http://localhost:8080/task")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((task) => {
      const copy = template.content.cloneNode(true);

      copy.querySelector(".id").innerText = task.id;
      copy.querySelector(".task").innerText = task.name;
      copy.querySelector(".animal").innerText = `${task.animal.name} (${task.animal.species})`;
      copy.querySelector(".summary").innerText = task.summary;
      copy.querySelector(".expected-start-time").innerText = task.expectedStartTime;
      copy.querySelector(".expected-end-time").innerText = task.expectedEndTime;
      copy.querySelector(".edit").href = `./edittask.html?id=${task.id}`;
      copy.querySelector(".remove").addEventListener("click", () => {
         if (confirm("Delete entry?")) {
           fetch(`http://localhost:8080/task/${task.id}`, {
             method: "DELETE",
           }).then((rsp) => {
             window.location.href = "./tasks.html";
           });
         }
      })

      table.appendChild(copy);
    });
  });
