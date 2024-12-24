const db = require('./db');

const initializeDatabase = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS Items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT
            );
        `;

        const createUsersQuery = `
        CREATE TABLE IF NOT EXISTS Users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
        `;

        // Execute the query
        await db.query(createTableQuery);
        console.log('Table "Items" has been created or already exists.');

        // Execute the query
        await db.query(createUsersQuery);
        console.log('Table "Users" has been created or already exists.');

        // Clear the table if it exists
        const clearDataQuery = `TRUNCATE TABLE Items RESTART IDENTITY;`; // Clears the data and resets the ID sequence
        await db.query(clearDataQuery);
        console.log('Existing data in the "Items" table has been deleted.');

        // Clear the table if it exists
        const clearUsersData = `TRUNCATE TABLE Users RESTART IDENTITY;`; // Clears the data and resets the ID sequence
        await db.query(clearUsersData);
        console.log('Existing data in the "Users" table has been deleted.');

        // Insert sample data
        const seedDataQuery = `
            INSERT INTO Items (name, description)
            VALUES
            ('Sample Item 1', 'This is a sample item'),
            ('Sample Item 2', 'This is another sample item');
        `;
        await db.query(seedDataQuery);
        console.log('Sample data for Items has been inserted.');

                // Insert sample data
        const seedDataUsersQuery = `
            INSERT INTO Users (email, password)
            VALUES
            ('eminkocan@gmail.com', 'password123'),
            ('davudzukorlic@gmail.com', 'password123');
        `;
        await db.query(seedDataUsersQuery);
        console.log('Sample data for Users has been inserted.');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await db.pool.end();
        console.log('Database connection closed.');
    }
};

initializeDatabase();
