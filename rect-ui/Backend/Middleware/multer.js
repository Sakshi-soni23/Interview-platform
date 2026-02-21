import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "dp") {
            cb(null, "uploads/images");
        } else if (file.fieldname === "resume") {
            cb(null, "uploads/resumes");
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "resume" && file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF allowed for resume"), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
