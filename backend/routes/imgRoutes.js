import path from 'path';
import express from 'express';
import multer from 'multer';

// Create __dirname equivalent
const __dirname = path.resolve();

const router = express.Router();

// Configure storage with multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
        // Ensure the uploads folder is correctly referenced
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Function to check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Image Only');
    }
}

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => checkFileType(file, cb)
});

// Upload endpoint
router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image Uploaded',
        image: `/uploads/${path.basename(req.file.path)}`
    });
});

export default router;
