document.addEventListener("DOMContentLoaded", async (event) => {
  const content = document.getElementById("content");

  const f1Data = await getF1Data();
  const round = f1Data.MRData.RaceTable.round;
  const season = f1Data.MRData.RaceTable.season;
  const races = f1Data.MRData.RaceTable.Races;
  updateHTML(content, round, season, races);
});

async function getF1Data() {
  const response = await fetch(
    "https://ergast.com/api/f1/current/last/results.json"
  );
  return await response.json();
}

function updateHTML(content, round, season, races) {
  content.innerHTML = `
  <div>Round: ${round}</div>
  <div>Season: ${season}</div>
  <div>${races.map((race) => getRaceTemplate(race))}</div> 
  `;
}

function getRaceTemplate(raceData) {
  return `
    <div>
      <div>Race Name: ${raceData.raceName}</div> 
      <ul class="list-group">
        ${raceData.Results.map((result) => getDriverTemplate(result)).join("")}
      </ul>
    </div> 
    `;
}

function getDriverTemplate(resultData) {
  return `<li class="list-group-item">${resultData.Driver.givenName} ${resultData.Driver.familyName}</li>`;
}
