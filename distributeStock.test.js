const distributeStock = require('./distributeStock');

test('should assign stock correctly for valid ecommerce entries', () => {
    const distributionProposals = [
        {
            grupoLocalizacionDesc: 'CICLO 2 GRUPO A2',
            esEcommerce: 1,
            key: '1234/11/22/33/V2024',
            tiendaId: 100,
            propuesta: 4
        }
    ];

    const stock = [
        {
            key: '1234/11/22/33/V2024',
            tipoStockDesc: 'ZAR',
            stockEm05: 2,
            stockEm01: 1,
            posicioncompleta: 'P-ZAR-001'
        },
        {
            key: '1234/11/22/33/V2024',
            tipoStockDesc: 'MSR',
            stockEm05: 1,
            stockEm01: 0,
            posicioncompleta: 'P-MSR-001'
        }
    ];

    const result = distributeStock(distributionProposals, stock);

    expect(result.length).toBe(3);
    expect(result[0]).toEqual(expect.objectContaining({
        Key: '1234/11/22/33/V2024',
        idTienda: 100,
        propuesta: 2,
        tipoStockDesc: 'ZAR',
        EstadoStock: 5,
        posicioncompleta: 'P-ZAR-001'
    }));
    expect(result[1]).toEqual(expect.objectContaining({
        Key: '1234/11/22/33/V2024',
        idTienda: 100,
        propuesta: 1,
        tipoStockDesc: 'MSR',
        EstadoStock: 5,
        posicioncompleta: 'P-MSR-001'
    }));
    expect(result[2]).toEqual(expect.objectContaining({
        Key: '1234/11/22/33/V2024',
        idTienda: 100,
        propuesta: 1,
        tipoStockDesc: 'ZAR',
        EstadoStock: 1,
        posicioncompleta: 'P-ZAR-001'
    }));

});

test('should skip proposals that are not ecommerce or from invalid cycles', () => {
    const distributionProposals = [
        {
            grupoLocalizacionDesc: 'CICLO 3 GRUPO C', // invalid
            esEcommerce: 1,
            key: '9999/00/00/00/V2024',
            tiendaId: 200,
            propuesta: 5
        },
        {
            grupoLocalizacionDesc: 'CICLO 1 GRUPO A2',
            esEcommerce: 0,                           // not an ecommerce
            key: '8888/00/00/00/V2024',
            tiendaId: 201,
            propuesta: 3
        }
    ];

    const stock = [
        {
            key: '9999/00/00/00/V2024',
            tipoStockDesc: 'ZAR',
            stockEm05: 10,
            stockEm01: 5,
            posicioncompleta: 'P-ZAR-999'
        },
        {
            key: '8888/00/00/00/V2024',
            tipoStockDesc: 'MSR',
            stockEm05: 10,
            stockEm01: 0,
            posicioncompleta: 'P-MSR-888'
        }
    ];

    const result = distributeStock(distributionProposals, stock);

    expect(result.length).toBe(0);
});
