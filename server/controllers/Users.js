import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUsers = async(req,res) =>{
    try{
        const users = await Users.findAll();
        res.json(users);
    }catch (error){
        console.log(error);
    }
}

export const Register = async(req, res) =>{
    console.log("Request body: ", req.body);
    const { full_name, username, email, phone_number, password_hash } = req.body;

    if (!full_name || !username || !email || !phone_number ||!password_hash) {
        return res.status(400).json({ msg: "Semua data wajib diisi" });
    }
    // if(password !== confPassword){
    //     return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    // }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            full_name:full_name,
            username:username,
            email: email,
            phone_number:phone_number,
            password:password_hash
        });
        res.json({msg: "Registrasi Berhasil"});
    } catch (error) {
        console.log(error);    
    }
};