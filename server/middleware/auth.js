const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token)
		res
			.status(401)
			.json({ status: { text: "You are not authorized", severity: "error" } });

	try {
		const decoded = jwt.verify(token, process.env.jwtSecret);
		req.user = decoded;
		next();
	} catch (e) {
		res
			.status(400)
			.json({ status: { text: "Token is not valid", severity: "error" } });
	}
}

module.exports = auth;
