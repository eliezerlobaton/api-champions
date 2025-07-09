import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.PORT || 3000;
app.get("/", (_req: Request, res: Response) => {
  res.send("Chanchito feliz");
});

app.listen(port, () => {
  console.log(`🚀 Server is running at port ${port}`);
});
