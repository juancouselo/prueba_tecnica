const fs = require('fs');
const distributeStock = require('./distributeStock');

const distributionProposals = JSON.parse(fs.readFileSync('./Prereparto_bruto.json')).data;
const stock = JSON.parse(fs.readFileSync('./Stock_unificado.json')).data;

const result = distributeStock(distributionProposals, stock);

console.table(result.map(r => ({
    Key: r.Key,
    idTienda: r.idTienda,
    propuesta: r.propuesta,
    tipoStockDesc: r.tipoStockDesc,
    EstadoStock: r.EstadoStock,
    posicioncompleta: r.posicioncompleta
})));