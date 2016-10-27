lamassu-desw
============

Welcome to the Lamassu desw Plugin. This plugin provides "wallet" functionalities by using desw.

Pre-reqs
=========

Generate a WIF (Wallet Import Format) bitcoin private key.

It is recommended that your machine be on version 0.4.13 or higher. Please contact [support@lamassu.is](mailto:support@lamassu.is) to arrange an update.

Additionally, it is suggested that you run the plugin with the latest lamassu-server. After your machine has been updated to 0.4.13, you may run the server upgrade script found here: https://github.com/lamassu/lamassu-install/tree/two-way#to-upgrade

Installing
==========

Run these four commands:

```
cd /usr/local/lib/node_modules/lamassu-server
npm install lamassu-desw
cd /usr/local/lib/node_modules/lamassu-admin
npm install lamassu-desw
```

Configuring
==========

Run:

```
node /usr/local/lib/node_modules/lamassu-server/node_modules/lamassu-desw/setup
```

Enter the WIF and server info, hitting <kbd>Enter</kbd> after each. The field for WIF will remain blank when pasting the value.

When complete, you'll see 'Success' and the machine will begin to use desw.

