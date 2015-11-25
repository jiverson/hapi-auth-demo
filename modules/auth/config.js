const Confidence = require('confidence');

const store = new Confidence.Store({
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
				clientSecret: process.env.GOOGLE_SECRET,
				isSecure: false
			}
		}
	}
});

const criteria = {
	env: process.env.ENVIRONMENT
};

exports.get = key => (store.get(key, criteria));
