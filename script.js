
const sheetUrl = "https://docs.google.com/spreadsheets/d/1glvkWLOpUhdBUmY4j-2DJoXQvY6dnQD_OQkYYCaXXEQ/edit?usp=sharing/Foglio1";

fetch(sheetUrl)
  .then(res => res.json())
  .then(data => {
    const presenze = {};

    data.forEach(row => {
      const nome = row["Nome Operaio"]?.trim();
      if (nome) {
        if (!presenze[nome]) presenze[nome] = 0;
        presenze[nome]++;
      }
    });

    const labels = Object.keys(presenze);
    const valori = Object.values(presenze);

    const ctx = document.getElementById("graficoPresenze").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Giorni di presenza",
          data: valori,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
