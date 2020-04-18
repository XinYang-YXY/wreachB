const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5600;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.catch((err) => {
		console.log(err);
	});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database is connected successfully");
});

const userRouter = require("./routes/user");

app.use("/users", userRouter);

app.get("/", (req, res) => {
	res.json({ name: "hello" });
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
