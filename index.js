var Service;
var Characteristic;

var ssh = require('ssh-exec');

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory('homebridge-ssh', 'SSH', SshAccessory);
}

function SshAccessory(log, config) {
	this.log = log;
	this.service = 'Switch';
	this.name = config['name'];
	this.onCommand = config['on'];
	this.offCommand = config['off'];
	this.user = config['user'];
	this.host = config['host'];
	this.password = config['password'];
}

SshAccessory.prototype.setState = function(powerOn, callback) {
	var accessory = this;
	var state = powerOn ? 'on' : 'off';
	var prop = state + 'Command';
	var command = accessory[prop];

	var stream = ssh(command, {
		user: accessory.user,
		host: accessory.host,
	    	password: accessory.password
	});

	stream.on('error', function (err) {
	        accessory.log('Error: ' + err);
		callback(err || new Error('Error setting ' + accessory.name + ' to ' + state));
	});

	stream.on('finish', function () {
		accessory.log('Set ' + accessory.name + ' to ' + state);
                callback(null);
	});
}

SshAccessory.prototype.getServices = function() {
	var informationService = new Service.AccessoryInformation();
	var switchService = new Service.Switch(this.name);

	informationService
		.setCharacteristic(Characteristic.Manufacturer, 'SSH Manufacturer')
		.setCharacteristic(Characteristic.Model, 'SSH Model')
		.setCharacteristic(Characteristic.SerialNumber, 'SSH Serial Number');

	switchService
		.getCharacteristic(Characteristic.On)
		.on('set', this.setState.bind(this));

	return [switchService];
}
