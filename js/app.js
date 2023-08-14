"use strict";

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            renderGrid(JSON.parse(JSON.stringify(json)));
        };
        reader.readAsArrayBuffer(file);
    }
});

function renderGrid(json) {
    json.splice(0, 2)
    const grid = new canvasDatagrid({
        data: json,
        parentNode: document.getElementById('datagrid'),
        multiLine: true,
    });
}
