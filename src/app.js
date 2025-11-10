import express from "express";
import authRouter from "./routes/auth.route.js";
import notFoundMidelleware from "./middlewares/notFound.midelleware.js";


const app = express()
app.use(express.json());

app.use('/api/auth', authRouter);

app.use(notFoundMidelleware);

export default app;