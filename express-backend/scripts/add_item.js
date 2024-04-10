// insertTestData.js

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'mahnkemj',
    password: 'password',
    database: 'home_inventory_db',
    port: 3310
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);

    // Insert a test bin
    const testBin = { bin_name: 'Test Bin', bin_location: 'Garage' };
    db.query('INSERT INTO bins SET ?', testBin, (err, result) => {
        if (err) throw err;
        console.log(`Inserted bin with ID: ${result.insertId}`);

        // Assuming the bin ID is needed for item insertion
        const binId = result.insertId;

        // Insert test items
        const testItems = [
            { item_name: 'Screwdriver', item_description: 'Phillips head', bin_id: binId, quantity: 3 },
            { item_name: 'Hammer', item_description: 'Claw hammer', bin_id: binId, quantity: 1 },
            { item_name: 'Tape Measure', item_description: '25 feet retractable tape measure', bin_id: binId, quantity: 1 }
        ];

        testItems.forEach(item => {
            db.query('INSERT INTO items SET ?', item, (err, result) => {
                if (err) throw err;
                console.log(`Inserted item with ID: ${result.insertId}`);
            });
        });

        // Close the connection once all queries are completed
        db.end();
    });
});
