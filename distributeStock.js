// distributeStock.js
function distributeStock(distributionProposals, stock) {
    const validCycles = new Set([
        'CICLO 2 GRUPO A2',
        'CICLO 1 GRUPO B',
        'CICLO 1 GRUPO A2',
    ]);

    const zones = ['ZAR', 'MSR', 'SILO'];
    const states = [5, 1];

    const stockIndex = {};
    for (const s of stock) {
        if (!stockIndex[s.key]) stockIndex[s.key] = {};
        if (!stockIndex[s.key][s.tipoStockDesc]) stockIndex[s.key][s.tipoStockDesc] = [];
        stockIndex[s.key][s.tipoStockDesc].push({ ...s });
    }

    const result = [];

    for (const dp of distributionProposals) {
        const { grupoLocalizacionDesc, esEcommerce, key, tiendaId, propuesta } = dp;

        if (!validCycles.has(grupoLocalizacionDesc) || esEcommerce !== 1) continue;

        let remainingUnits = propuesta;

        for (const state of states) {
            if (remainingUnits <= 0) break;
            for (const zone of zones) {
                if (remainingUnits <= 0) break;
                const zoneStock = stockIndex[key]?.[zone] || [];

                for (const s of zoneStock) {
                    const quantity = state === 5 ? s.stockEm05 : s.stockEm01;
                    if (quantity <= 0) continue;

                    const taken = Math.min(remainingUnits, quantity);
                    remainingUnits -= taken;

                    result.push({
                        Key: key,
                        idTienda: tiendaId,
                        propuesta: taken,
                        tipoStockDesc: zone,
                        EstadoStock: state,
                        posicioncompleta: s.posicioncompleta,
                    });

                    if (state === 5) s.stockEm05 -= taken;
                    else s.stockEm01 -= taken;

                    if (remainingUnits <= 0) break;
                }
            }
        }
    }

    return result;
}

module.exports = distributeStock;
