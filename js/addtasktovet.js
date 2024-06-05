const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const tasks = document.getElementById("tasks");
const unassignCheckbox = document.getElementById("unassign-checkbox")

fetch("http://localhost:8080/task")
  .then((rsp) => rsp.json())
  .then((data) =>
    data.forEach((task) => {
      const option = document.createElement("option");

      option.value = task.id;
      option.text = `${task.name}`;

      tasks.appendChild(option);
    })
  );

document.getElementById("save").addEventListener("click", () => {
  fetch(`http://localhost:8080/veterinarian/${id}/task/${tasks.value}`, {
    method: unassignCheckbox.checked ? "DELETE" : "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((rsp) => {
    window.location.href = "./vets.html";
  });
});
