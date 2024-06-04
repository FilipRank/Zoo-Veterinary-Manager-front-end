const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const animals = document.getElementById("animals");
const task = document.getElementById("name");
const summary = document.getElementById("summary");
const startTime = document.getElementById("start-time");
const endTime = document.getElementById("end-time");

if (id == null || id == "") {
  window.location.href = "./tasks.html";
}

fetch("http://localhost:8080/animal")
  .then((rsp) => rsp.json())
  .then((data) =>
    data.forEach((animal) => {
      const option = document.createElement("option");

      option.value = animal.id;
      option.text = `${animal.name} (${animal.species})`;

      animals.appendChild(option);
    })
  );

fetch("http://localhost:8080/task/" + id)
  .then((rsp) => rsp.json())
  .then((data) => {
    document.getElementById(
      "breadcrumb-name"
    ).innerText = `${data.name}`;
    task.value = data.name;
    summary.value = data.summary;
    startTime.value = data.expectedStartTime;
    endTime.value = data.expectedEndTime
  });

  fetch("http://localhost:8080/task/" + id)
    .then((rsp) => rsp.json())
    .then((data) => {
      animals.value = data.animal.id
    });

  document.getElementById("save").addEventListener("click", () => {
    fetch(`http://localhost:8080/task/${id}/animal/${animals.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: task.value,
        summary: summary.value,
        expectedStartTime: startTime.value + "Z",
        expectedEndTime: endTime.value + "Z",
      }),
    }).then((rsp) => {
      window.location.href = "./tasks.html";
    });
  });