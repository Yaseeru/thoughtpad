import express from 'express';
import notesRoute from "./routes/notesRoutes.js"
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
     origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(rateLimiter)

app.use('/api/notes', notesRoute)

connectDb().then(() => {
     app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
     });
});