module.exports = function(request, reply) {

	let account = request.auth.credentials;
	let sid = account.profile.id;

	this.cache.set(sid, { account: account }, 0, err => {
		if (err)
			return reply(err);

		request.auth.session.set({ sid: sid });

		return reply.redirect('/');
	});
};