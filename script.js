document.addEventListener('DOMContentLoaded', function () {
    
    // Fetch and parse CSV data
    fetch('Table_Input.csv')
        .then(response => response.text())
        .then(csvData => {
            const tableData = Papa.parse(csvData, { header: true }).data;

            // Table 1
            displayTable('table1', tableData);

            // calculations for Table 2
            const table2Data = calculateTable2(tableData);

            // Table 2
            displayTable('table2', table2Data);
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
        });
});

// display a table in a specified div
function displayTable(divId, data) {
    const tableHtml = '<table>' +
        '<thead><tr>' + Object.keys(data[0]).map(header => `<th>${header}</th>`).join('') + '</tr></thead>' +
        '<tbody>' + data.map(row => '<tr>' + Object.values(row).map(cell => `<td>${cell}</td>`).join('') + '</tr>').join('') + '</tbody>' +
        '</table>';
    document.getElementById(divId).innerHTML = tableHtml;
}

// function to calculate values for Table 2
function calculateTable2(tableData) {
    // perform calculations 
    const table2Data = [
        { Category: 'Alpha', Value: parseInt(tableData[4].Value) + parseInt(tableData[19].Value) },
        { Category: 'Beta', Value: parseInt(tableData[14].Value) / parseInt(tableData[6].Value) },
        { Category: 'Charlie', Value: parseInt(tableData[12].Value) * parseInt(tableData[11].Value) }
    ];

    return table2Data;
}
