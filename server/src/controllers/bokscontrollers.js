import multer from "multer";
import path from "path";

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtro para validar el tipo de archivo (solo imágenes)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar a 5MB por imagen
});

// Lógica para subir portada de libro
export const uploadBookCover = (req, res) => {
  upload.single("cover")(req, res, (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    if (!req.file) {
      return res.status(400).send("No se subió ninguna imagen.");
    }

    const cover = {
      coverPath: req.file.path,
    };

    // Aquí puedes guardar la imagen en la base de datos (si es necesario)
    res.status(200).send({
      message: "Portada de libro subida exitosamente",
      cover,
    });
  });
};

// Lógica para agregar un libro (usando datos enviados por el cliente)
export const addBook = (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    coverPath: req.body.coverPath, // Esto podría ser la ruta de la imagen subida
    owner: req.body.ownerId, // ID del dueño (usuario autenticado)
  };

  // Aquí puedes guardar el libro en la base de datos
  res.status(200).send({
    message: "Libro agregado exitosamente",
    book,
  });
};
