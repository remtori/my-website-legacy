let CLAIMS = {};

const controller = {
	getClaims: () => CLAIMS,
	clearClaims: () => CLAIMS = {},
}

function auth()
{

	function setCustomUserClaims(uid, obj)
	{
		CLAIMS[uid] = obj;
		return Promise.resolve();
	}

	function getUserByEmail(email)
	{
		return { uid: email };
	}

	return {
		setCustomUserClaims,
		getUserByEmail
	}
}

module.exports = { controller, auth };
