
hapi-auth-demo
=================

An example application using bell and hapi-auth-cookie.

[![Build Status](https://travis-ci.org/jiverson/hapi-auth-demo.svg)](https://travis-ci.org/jiverson/hapi-auth-demo)


## Installation

```bash
npm install
node index.js
```

Run node in `--use_strict` mode.

## Usage

**Configuration**
```js
var Confidence = require('confidence');

var store = new Confidence.Store({
	provider: {
		$filter: 'env',
		production: {
			google: {
				provider: 'google',
				password: 'hapiauth',
				clientId: '',
				clientSecret: '',
				isSecure: false
			}
		},
		staging: {
			google: {
				provider: 'google',
				password: 'hapiauth',
				clientId: '',
				clientSecret: '',
				isSecure: false
			}
		}, 
		$default: {
			google: {
				provider: 'google',
				password: 'hapiauth',
				clientId: '',
				clientSecret: '',
				isSecure: false 
			}
		}
	}
});
```

## Obtaining OAuth Keys

<img src="http://images.google.com/intl/en_ALL/images/srpr/logo6w.png" width="150">
- Visit [Google Cloud Console](https://cloud.google.com/console/project)
- Click **CREATE PROJECT** button
- Enter *Project Name*, then click **CREATE**
- Then select *APIs & auth* from the sidebar and click on *Credentials* tab
- Click **CREATE NEW CLIENT ID** button
 - **Application Type**: Web Application
 - **Authorized Javascript origins**: *http://localhost:3000*
 - **Authorized redirect URI**: *http://localhost:3000*

**Note:** Make sure you have turned on **Contacts API** and **Google+ API** in the *APIs* tab.
