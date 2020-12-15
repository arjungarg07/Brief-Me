function redirect(req, res) {
	res.redirect('/');
}

function logout(req, res) {
	req.logout();
	res.redirect('/');
}

module.exports = { logout, redirect };
