// External imports
import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';


// config multer to store files in memory
const storage = multer.memoryStorage();

// Create an instance of multer with the memory storage configuration.
const upload = multer({ storage });

// Create an instance of the DataParser to handle file parsing
const parser = new DataParser();

/**
 * Format an image file to a Data URI string.
 * @param {Object} file - The file object to be formatted.
 * @param {string} file.originalname - The original name of the file.
 * @param {Buffer} file.buffer - The buffer containing the file data.
 * @returns {string} The formatted Data URI string.
 */
export const formatImage = (file) => {
    console.log(file);
    const fileExtension = path.extname(file.originalname).toString();
    return parser.format(fileExtension, file.buffer).content;

};
export default upload;