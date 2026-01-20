import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

import ardbRoutes from "./src/routes/ardb/index.js";
import metaforgeRoutes from "./src/routes/metaforge/index.js";

// Recreate __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust first proxy (important for Heroku, Render, etc)
app.set("trust proxy", 1);

app.use(express.json());
app.use("/api/ardb", ardbRoutes);
app.use("/api/metaforge", metaforgeRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(
        express.static(path.resolve(__dirname, "client", "dist"))
    );

    app.get("*", (_req: Request, res: Response) => {
        res.sendFile(
            path.resolve(__dirname, "client", "dist", "index.html")
        );
    });
}

const PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 5001;

app.get("/health", (_req, res) => {
    res.status(200).send("ok");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});