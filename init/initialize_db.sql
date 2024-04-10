-- Specify the database to use
USE home_inventory_db;

-- Create a 'bins' table
CREATE TABLE IF NOT EXISTS bins (
    bin_id INT AUTO_INCREMENT PRIMARY KEY,
    bin_name VARCHAR(255) NOT NULL,
    bin_location VARCHAR(255),  -- Optional: add more attributes as needed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an 'items' table
CREATE TABLE IF NOT EXISTS items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    item_description TEXT,
    bin_id INT,
    quantity INT DEFAULT 1,
    purchase_date DATE,
    price DECIMAL(10, 2),  -- Adjust the precision as needed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bin_id) REFERENCES bins(bin_id) ON DELETE SET NULL
);

-- Note: Ensure that the 'home_inventory_db' database exists before running this script
