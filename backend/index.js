import express from "express";
const port = 5000;
const data = [
  {
    id: 1,
    name: "Mehedi",
  },
  {
    id: 2,
    name: "Mushfiq",
  },
  {
    id: 3,
    name: "Siam",
  },
];
const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/users", (req, res) => {
  res.json(data);
});

app.get("/users/:userId", (req, res) => {
    const user = data.find((u)=>u.id === parseInt(req.params.userId))
    res.json(user);
  });

app.listen(port, () => console.log(`Port is running in ${port}`));
