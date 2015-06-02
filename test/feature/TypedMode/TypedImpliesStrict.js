// Options: --strong-mode --typed-mode

'use types';

assert.equal((function() { return this })(), undefined);
