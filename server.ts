import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust first proxy (important for Heroku, Render, etc)
app.set("trust proxy", 1);

app.use(express.json());

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
    : 6000;

app.get("/health", (_req, res) => {
    res.status(200).send("ok");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});