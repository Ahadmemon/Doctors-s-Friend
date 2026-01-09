import express from "express"
const app = express()
const port = process.env.PORT || 4000
app.get("/user", (req, res) => {
    res.send("Hello this is from user");

})
app.listen(port, () => console.log("Server started at port ", port)
)