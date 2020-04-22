import moment from 'moment';
const $ = (qs) => document.querySelector(qs);

const generateBundesligaTable = (arr) => {
  arr.forEach((item) => {
    const { MatchID, MatchDateTimeUTC, Team1, Team2, MatchResults } = item;
    console.log(`TEST: ${MatchID}  AND ${MatchResults}`);

    const tableRow = document.createElement('tr');

    const imgElTeam1 = document.createElement('td');
    const logoTeam1 = document.createElement('img');
    const tableDataTeam1 = document.createElement('td');

    const imgElTeam2 = document.createElement('td');
    const logoTeam2 = document.createElement('img');
    const tableDataTeam2 = document.createElement('td');

    const matchResultsEl = document.createElement('td');
    const matchDate = document.createElement('td');

    tableRow.appendChild(imgElTeam1);
    imgElTeam1.appendChild(logoTeam1);
    tableRow.appendChild(tableDataTeam1);

    tableRow.appendChild(imgElTeam2);
    imgElTeam2.appendChild(logoTeam2);
    tableRow.appendChild(tableDataTeam2);

    tableRow.appendChild(matchResultsEl);
    tableRow.appendChild(matchDate);

    logoTeam1.src = Team1.TeamIconUrl;
    tableDataTeam1.textContent = Team1.ShortName;
    logoTeam2.src = Team2.TeamIconUrl;
    tableDataTeam2.textContent = Team2.ShortName;

    MatchResults.length !== 0
      ? (matchResultsEl.innerHTML = `${MatchResults[0].PointsTeam1} : ${MatchResults[0].PointsTeam2}`)
      : (matchResultsEl.innerHTML = 'n/a');

    matchDate.textContent = moment(MatchDateTimeUTC).format('L');

    $('.bundesliga-body').appendChild(tableRow);

    return tableRow;
  });
};

module.exports = {
  generateBundesligaTable
};
