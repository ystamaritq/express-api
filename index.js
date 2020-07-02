// starts configuration for listen the server without routes so far

const express = require("express");
const path = require("path");
const logger = require("./middlware/logger");
const exphbs = require("express-handlebars");
const { title } = require("process");
const members = require("./Members");

const app = express();

//to init the middlware
// app.use(logger);

//HandleBars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body Parser Middlware

//this is to handle raw json
app.use(express.json());
//handle url encoded data and forms
app.use(express.urlencoded({ extended: false }));

//main index handle bars (Homepage route)
app.get("/", (req, res) =>
	res.render("index", {
		title: "Add members",
		members,
	})
);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Since I put here the api members route so I can remove now the rout ans just leave / and /:id in the members.js file
//members api route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server stared on PORT ${PORT}`));
