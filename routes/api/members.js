const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");
const { filter } = require("../../Members");

//lets gonna make the route to get a member json from the response

/* get all members, we don't need to do stringify 
even if they are taking a js object because express 
talking care of that for us */
router.get("/", (req, res) => res.json(members));

//get the member by id so now we need to use :
//get a single member
router.get("/:id", (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));

	if (found) {
		res.json(members.filter((member) => member.id === parseInt(req.params.id)));
	} else {
		res
			.status(400)
			.json({ msg: `Message: No member found by that ${req.params.id}` });
	}
});

//create a member
router.post("/", (req, res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: "active",
	};

	//validate email and name before send it to the array
	if (!newMember.name || !newMember.email) {
		res.status(400).json({ msg: "Please include a name and email" });
	}
	//add the new member to the array
	members.push(newMember);

	//we need ti send back a response
	// res.json(members); // this is without a template
	res.redirect("/");
});

//update a member
router.put("/:id", (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));

	if (found) {
		const updMember = req.body;
		members.forEach((member) => {
			if (members.id === parseInt(req.params.id)) {
				member.name = updMember.name ? updMember.name : member.name;

				res.json({ msg: "Member updated", member: member });
			}
		});
	} else {
		res.status(400).json({ msg: `not member with the id of ${req.params.id}` });
	}
});

//router delete
router.delete("/:id", (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));

	if (found) {
		res.json({
			msg: "Member deleted",
			members: members.filter(
				(member) => member.id !== parseInt(req.params.id)
			),
		});
	} else {
		res.status(400).json({ msg: `not member with the id of ${req.params.id}` });
	}
});

module.exports = router;
