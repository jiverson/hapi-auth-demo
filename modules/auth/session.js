module.exports = function(request, reply) {

	var account = request.auth.credentials;
	var sid = account.profile.id;

	this.cache.set(sid, { account: account }, 0, function(err) {
		if (err)
			return reply(err);

		request.auth.session.set({ sid: sid });

		return reply.redirect('/');
	});
};