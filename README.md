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
		"accessory": "ssh",
		"name": "Electronic Music",
		"on": "tell application ''Evocam'' to open ''Security.evocamsettings''",
		"off": "quit application ''Evocam''"
	}
]
```

Note that two successive single-quotes (`''`) will be automatically converted to double-quotes.
