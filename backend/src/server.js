import express from 'express';
import notesRoute from "./routes/notesRoutes.js"
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

// Middleware
if (process.env.NODE_ENV !== "production") {
     app.use(cors({
          origin: "http://localhost:5173"
     }))
}
app.use(express.json())
app.use(rateLimiter)

app.use('/api/notes', notesRoute)

if (process.env.NODE_ENV === "production") {
     app.use(express.static(path.join(__dirname, "../frontend/dist")))

     app.get("*", (req, res) => {
          res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
     })
}

connectDb().then(() => {
     app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
     });
});