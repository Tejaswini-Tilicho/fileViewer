const fs = require('fs');
const path = require('path');

// Specify the directory path
const directoryPath = 'C:/Users/Sai Tejaswini/OneDrive/Desktop/Sprint 7 - 11 Mar to 15 Mar 2024/Teju';

// Read the contents of the directory synchronously
try {
    const contents = fs.readdirSync(directoryPath);

    // Iterate over the contents
    contents.forEach(item => {
        // Construct the full path of the item
        const itemPath = path.join(directoryPath, item);

        // Check if the item is a directory or a file
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            console.log('Directory:', item);
        } else if (stats.isFile()) {
            console.log('File:', item);
        }
    });
} catch (error) {
    console.error('Error reading directory:', error);
}
