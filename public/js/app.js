
const counties = document.querySelector('#counties')
counties.textContent = ''

window.onload = function() {
  counties.innerHTML = '<p>loading...</p>'
  
  fetch(`/api/v1/daily/us/county?date=03-27-2020&state=mississippi`).then((response) => {
    response.json().then((data) => {
      counties.innerHTML = ''
      if (data.error) {
        counties.innerHTML = ''
        counties.innerHTML = data.error
      } else {
        counties.innerHTML = ''

        let date = `Mississippi cases as of ${data.daily.date}`
        let dateHeader = document.createElement('h3')
        dateHeader.id = 'counties-header'
        let text = document.createTextNode(date)
        dateHeader.appendChild(text);
        counties.appendChild(dateHeader)

        let table = document.createElement('table');
        counties.appendChild(table)

        let header = Object.keys(data.daily.results[0])

        generateTableHead(table, header);
        generateTable(table, data.daily.results)
      }
    })
  })
}

const generateTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();

  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

const generateTable = (table, data) => {
  for (let element of data) {
    let row = table.insertRow();

    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

const createDateForQuery = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    date = `${mm}-${dd}-${yyyy}`

    return date;
}