
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const connectBD = require("./config/db");
connectBD();// gerer les req json

// Port d'écoute
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));


