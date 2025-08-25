const cors = require('cors');

// Substitua a URL abaixo pela URL exata do seu frontend no Vercel
const frontendURL = 'https://i-priced-frontend.vercel.app/'; 

// Use o middleware CORS, permitindo a comunicação com o seu frontend
app.use(cors({
    origin: frontendURL,
    credentials: true,
}));

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Conexão com o MySQL (ajuste user, password e database)
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

// Testar conexão
db.connect(err => {
    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }
    console.log("✅ Conectado ao MySQL!");
});

// Rota de login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Preencha todos os campos!");
    }

    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro no servidor!");
        }

        if (result.length > 0) {
            res.send("Login com sucesso!");
        } else {
            res.status(401).send("Email ou senha inválidos!");
        }
    });
});

// Rodar servidor
app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
});
