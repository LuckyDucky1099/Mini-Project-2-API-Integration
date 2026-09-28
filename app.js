const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {
        meals: null,
        error: null,
        search: ""
    });
});

app.post("/search", async (req, res) => {
    const search = req.body.search;

    try {
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );

        const meals = response.data.meals;

        if (!meals) {
            return res.render("index", {
                meals: null,
                error: "No meals were found. Try another search.",
                search: search
            });
        }

        res.render("index", {
            meals: meals,
            error: null,
            search: search
        });

    } catch (error) {
        res.render("index", {
            meals: null,
            error: "Something went wrong. Please try again.",
            search: search
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});