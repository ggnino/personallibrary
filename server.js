const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const db = require('./config/dbkey');
const Route = require('./routes/api');
const cors = require('cors');
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('*',cors());


// Connect to database
mongoose
	.connect(db.mongoURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log("Error: " + err));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("/", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
// Routes
app.use('/', Route);

app.listen(port, () => console.log(`Server running on port ${port}`));