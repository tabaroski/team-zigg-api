const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const CLAN_TAG = "%232R2POY2UY";
const API_TOKEN = process.env.COC_API_TOKEN;
const HEADERS = {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json"
};

// 🏰 Dados do clã
app.get("/clan", async (req, res) => {
    try {
        const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}`, { headers: HEADERS });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar dados do clã." });
    }
});

// 👥 Membros do clã
app.get("/members", async (req, res) => {
    try {
        const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}/members`, { headers: HEADERS });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar membros." });
    }
});

// ⚔️ Guerra atual
app.get("/currentwar", async (req, res) => {
    try {
        const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}/currentwar`, { headers: HEADERS });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar dados da guerra atual." });
    }
});

// 📜 Histórico de guerras
app.get("/warlog", async (req, res) => {
    try {
        const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}/warlog`, { headers: HEADERS });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar histórico de guerras." });
    }
});

// 🏆 Grupo da liga de guerra
app.get("/leaguegroup", async (req, res) => {
    try {
        const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}/currentwar/leaguegroup`, { headers: HEADERS });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar grupo da liga de guerra." });
    }
});

// 📊 Detalhes de uma guerra da liga (por ID)
app.get("/leaguewar/:id", async (req, res) => {
    const rawId = req.params.id;
    const warId = rawId.replace(/^#|^%23/, "");  // remove # ou %23 do início
    try {
        const response = await fetch(`https://api.clashofclans.com/v1/clanwarleagues/wars/${warId}`, { headers: HEADERS });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar guerra da liga." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
