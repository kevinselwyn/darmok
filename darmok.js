/*globals console, module, process, require*/
/*jslint regexp: true*/

var fs = require('fs');

(function () {
	'use strict';

	var darmok = {
		spec: null,
		trim: function (str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},
		log: function (msg, ret) {
			console.log(msg);

			if (ret) {
				process.exit(ret);
			}
		},
		read: function (filename, callback) {
			fs.readFile(filename, function (err, data) {
				callback(err, data);
			});
		},
		write: function (filename, data, callback) {
			fs.writeFile(filename, data, function (err) {
				callback(err);
			});
		},
		convert: function (line) {
			var spec = this.spec,
				space = /^[^a-zA-Z]*/,
				indent = '',
				leftover = '',
				i;

			indent = line.match(space)[0];
			line = line.replace(space, '');

			for (i in spec) {
				if (spec.hasOwnProperty(i)) {
					if (line.search(i) === 0) {
						leftover = this.trim(line.replace(i, ''));

						line = [indent, spec[i]].join('');
						line = line.replace('%s', leftover);

						return line;
					}
				}
			}

			return [indent, line].join('');
		},
		loadSpec: function (filename, callback) {
			var $this = this;

			$this.read(filename, function (err, spec) {
				if (err) {
					$this.log(['Could not load spec', filename].join(': '), 1);
				}

				spec = JSON.parse(spec.toString());

				callback(spec);
			});
		},
		doCompile: function (infile, callback) {
			var $this = this,
				output = '',
				lines = [],
				i = 0,
				l = 0;

			$this.read(infile, function (err, input) {
				if (err) {
					$this.log(['Could not read', infile].join(': '), 1);
				}

				input = input.toString();
				lines = input.split(/\n/);

				for (i = 0, l = lines.length; i < l; i += 1) {
					lines[i] = $this.convert(lines[i]);
				}

				output = lines.join('\n');

				if (typeof callback === 'function') {
					callback(output);
				} else if (typeof callback === 'string') {
					$this.write(callback, output, function (err) {
						if (err) {
							$this.log(['Could not write', callback].join(': '), 1);
						}

						$this.log([callback, 'was written successfully'].join(' '), 0);
					});
				} else {
					$this.log(output);
				}
			});
		},
		compile: function (infile, callback) {
			var $this = this;

			if (!this.spec) {
				this.loadSpec('spec.json', function (spec) {
					$this.spec = spec;
					$this.doCompile(infile, callback);
				});
			} else {
				this.doCompile(infile, callback);
			}
		}
	};

	module.exports = darmok;
}());