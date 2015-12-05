homebridge-applescript
======================

Supports triggering ssh commands on the HomeBridge platform.

## Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-ssh`
3. Update your configuration file. See `sample-config.json` in this repository for a sample.

## Configuration

Configuration sample:

```
"accessories": [
	{
              "accessory": "SSH",
              "name": "iTunes Music",
              "on": "tell application \"iTunes\" to play",
              "off": "tell application \"iTunes\" to stop",
              "user": "me",
              "host": "mymac",
              "password: "password"
	}
]
```
