var Providers = require('./config').get('/provider');

exports.register = function(server, options, next) {

	// app cache to store user information once logged in expires in 3 days
	var cache = server.cache({
		expiresIn: 3 * 24 * 60 * 60 * 1000
	});
	server.app.cache = cache;

	// bind the object to the plugin to be accessible in handlers
	server.bind({
		cache: server.app.cache
	});

	server.auth.strategy('google', 'bell', Providers.google);

	server.auth.strategy('session', 'cookie', {
		password: 'hapiauth', // give any string you think is right password to encrypted
		cookie: 'sid-hapiauth', // cookie name to use, usually sid-<appname>
		redirectTo: '/',
		isSecure: false,
		validateFunc: function(request, session, callback) {

			cache.get(session.sid, function(err, cached) {
				if (err)
					return callback(err, false);

				if (!cached)
					return callback(null, false);

				return callback(null, true, cached.account);
			});
		}
	});

	server.route({
		path: '/auth/google',
		method: 'GET',
		config: {
			auth: 'google',
			handler: require('./session')
		}
	});

	server.route({
		path: '/logout',
		method: 'GET',
		config: {
			handler: function(request, reply) {
				request.auth.session.clear();
				return reply.redirect('/');
			}
		}
	});

	next();
};

exports.register.attributes = {
	pkg: require('./package.json')
};
