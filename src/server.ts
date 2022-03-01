import express from "express";

const app = express();

app.get("/test", (req, res) => {
    return res.send("Olá a todos")
});

app.post("/test-post", (req, res) => {
    return res.send("Olá a todos com o método POST");
})


app.listen(3333, () => console.log("Server is running"));