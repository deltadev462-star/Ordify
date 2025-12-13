const multer = require('multer');
const path = require('path');

const allowedExtensions = {
    image: [
        'image/jpeg',      // .jpg, .jpeg, .jfif files
        'image/png',       // .png files
        'image/gif',       // .gif files
        'image/webp',      // .webp files
        'image/avif',      // .avif files
        'image/svg+xml',   // .svg files
        'image/bmp',       // .bmp files
        'image/tiff'       // .tiff files
    ],
    file: ['application/pdf', 'application/msword'],
    video: ['video/mp4']
};

function fileUpload({
    customValidation = allowedExtensions.image,
    fileSize = 5 * 1024 * 1024 // 5MB default
} = {}) {
    // Use memory storage instead of disk storage for direct Cloudinary upload
    const storage = multer.memoryStorage();
    
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            return cb(null, true);
        }
        return cb(new Error('Invalid file format'), false);
    }
    
    const upload = multer({
        fileFilter,
        storage,
        limits: {
            fileSize: fileSize
        }
    });
    return upload;
}

module.exports = {
    fileUpload,
    allowedExtensions
};