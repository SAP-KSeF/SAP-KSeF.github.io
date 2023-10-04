// script.js

const tableDiv = document.querySelector("#table-container");

fetch("static/issues.json")
  .then((response) => response.json())
  .then((tableData) => {
    const tableHTML = generateTableHTML(tableData);
    

    tableDiv.innerHTML = tableHTML;
  })
  .catch((error) => console.error("Error fetching data:", error));

function generateTableHTML(data) {
  return `
    <table class="custom-table">
      <thead>
        <tr>
          <th class="table-header">Title</th>
          <th class="table-header">Label</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (item) => `
              <tr>
                <td class="table-cell">${item.title}</td>
                <td class="table-cell" style="background-color: #${item.labels[0].color}; text-align: center;">${item.labels[0].name}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}
