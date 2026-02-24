import express from "express";

const app = express();
const port = 4000;

app.use(express.json());

app.listen(port, (err) => {
  if (!err) console.log("App is running on port: ", port);
  else console.log("Error : ", err);
});
