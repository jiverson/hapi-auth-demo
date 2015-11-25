var Hapi = require('hapi');
var Path = require('path');

const server = new Hapi.Server();
server.connection({
	port: 3000,
	routes: {
		cors: true
	}
});

server.register([
	require('vision'),
	require('inert'),
	require('bell'),
	require('hapi-auth-cookie'),
	require('./modules/auth')], function(err) {
	if (err) throw err;

	server.views({
		engines: {
			html: require('handlebars')
		},
		relativeTo: __dirname,
		path: 'templates',
		partialsPath: 'templates',
		layout: true,
		layoutPath: Path.join(__dirname, 'templates/layout'),
		isCached: false
	});

	server.route([
		{
			path: '/profile',
			method: 'GET',
			config: {
				auth: 'session',
				handler: (request, reply) => {
					reply(`
						<html>
						<head>
						    <title>Login page</title>
						</head>
						<body>
						    <h3>Welcome!</h3>
						    <code>${JSON.stringify(request.auth.credentials, null, 4)}</code>
						    <br/><br/>
						    <form method="get" action="/logout">
								<input type="submit" value="Logout">
						    </form>
						</body>
						</html>
					`);
				}
			}
		},
		{
			path: '/',
			method: 'GET',
			config: {
				auth: {
					strategy: 'session',
					mode: 'try'
				},
				plugins: {
					'hapi-auth-cookie': {
						redirectTo: false
					}
				}
			},
			handler: (request, reply) => {
				reply.view('index', {
					auth: JSON.stringify(request.auth),
					isLoggedIn: request.auth.isAuthenticated
				});
			}
		},
		{
			path: '/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: './public',
					listing: false,
					index: true
				}
			}
		}
	]);


	server.start(err => {
		if (err) console.log('error message ' + err);

		console.log('Server running at:', server.info.uri);
	});
});

module.exports = server;
