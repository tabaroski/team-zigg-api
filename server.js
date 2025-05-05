const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
app.use(cors());
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const CLAN_TAG = "%232R2POY2UY";
const API_TOKEN = process.env.COC_API_TOKEN;

app.get("/clan", async (req, res) => {
  try {
    const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados do clã." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});