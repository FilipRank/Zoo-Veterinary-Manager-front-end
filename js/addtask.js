const animals = document.getElementById("animals")
const task = document.getElementById("name")
const summary = document.getElementById("summary")
const startTime = document.getElementById("start-time");
const endTime = document.getElementById("end-time");

fetch("http://localhost:8080/animal")
    .then(rsp => rsp.json())
    .then(data => data.forEach(animal => {
        const option = document.createElement("option")

        option.value = animal.id
        option.text = `${animal.name} (${animal.species})`

        animals.appendChild(option)
    }))

task.value = "default"
summary.value = "default";
startTime.value = "2000-01-01T01:01:01";
endTime.value = "2000-01-01T02:01:01";

document.getElementById('save').addEventListener('click', () => {
    fetch(`http://localhost:8080/task/animal/${animals.value}`, {
      method: "POST",
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
})