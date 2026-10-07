import app from "./src/app/app.js";
import { config } from "./src/config/env.config.js";
import { connectToDb } from "./src/config/db.config.js";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "ClassyWear backend is live 🚀"
  });
});

const startServer = async () => {
    try {
        await connectToDb();
        const port = Number(config.PORT) || 3000;

        app.listen(port, "0.0.0.0", () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Unable to start server because MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

startServer();