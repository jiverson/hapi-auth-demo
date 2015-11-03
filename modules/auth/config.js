var Confidence = require('confidence');

var store = new Confidence.Store({
	provider: {
		$filter: 'env',
		production: {
			google: {
				provider: 'google',
				password: 'hapiauth',
				clientId: '',
				clientSecret: process.env.GOOGLE_SECRET || '',
				isSecure: false
			}
		},
		staging: {
			google: {
				provider: 'google',
				password: 'hapiauth',
				clientId: '',
				clientSecret: process.env.GOOGLE_SECRET || '',
				isSecure: false
			}
		},
		$default: {
			google: {
				provider: 'google',
				password: 'hapiauth',
				clientId: '',
				clientSecret: process.env.GOOGLE_SECRET || '',
				isSecure: false
			}
		}
	}
});

var criteria = {
	env: process.env.ENVIRONMENT
};

exports.get = function(key) {
	return store.get(key, criteria);
};
