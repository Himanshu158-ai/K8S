import express from "express";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 10000000; i++) {
        sum += i;
    }
    res.send(`Sum is ${sum}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});