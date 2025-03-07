import { createServer } from "http";
import { parse } from "url";
import next from "next";
import mysql from "mysql2/promise";

const port = parseInt(process.env.PORT || "3001", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Crear conexión a la base de datos MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "lapsusgateway",
  database: process.env.DB_NAME || "AgriculturaDB",
});

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);
    if (parsedUrl.pathname === "/api/data") {
      try {
        const [rows] = await db.query("SELECT * FROM mi_tabla");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(rows));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Error al obtener datos" }));
      }
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "En desarrollo" : process.env.NODE_ENV
    }`
  );
});

