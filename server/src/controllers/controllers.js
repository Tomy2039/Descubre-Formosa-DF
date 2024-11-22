import { User } from "../models/models.js";
import { createJwt } from "../helpers/createJwt.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Verifica si el correo electrónico ya está registrado
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Este correo electrónico ya está registrado." });
        }

        // Genera un 'username' automáticamente, por ejemplo, usando el nombre
        const generatedUsername = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);

        // Verifica si ya existe un usuario con el nombre de usuario generado
        user = await User.findOne({ username: generatedUsername });
        if (user) {
            return res.status(400).json({ message: "El nombre de usuario generado ya está registrado." });
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el nuevo usuario con el 'username' generado
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username: generatedUsername // Utiliza el 'username' generado automáticamente
        });

        // Guarda el nuevo usuario en la base de datos
        await newUser.save();

        res.json({ message: "Usuario registrado con éxito." });
    } catch (error) {
        console.error("Error al registrar el usuario:", error.message);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};


export const login = async (req, res) => {
    const { email , password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({message: "Usuario no encontrado"});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.status(400).json({message: "Contraseña incorrecta"});
        }
        const token = createJwt(user._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesion" })
    }
}
