
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSSI-L-VnUodcViZlPl-a9dNKAmWOa8joBuzaAYPAn46k5BDjeFNFU7Asfv3R8hsW5dqzr--zZnM4vh/pubhtml?gid=0&single=true/Foglio1";

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
