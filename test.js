import test from 'ava';
var ps = require('./dist/promised-services.js');

test(t => {
  var s = ps();

  s.define('service1', () => {
    return 'service 1 value';
  });

  t.same(s.getServices(), ['service1']);
});

test(t => {
  var s = ps();

  s.define('service1', ['service2'], () => {
    return 'service 2 value';
  });

  t.throws(() => {
    s('service1');
  }, 'No such service defined: service2');
});

test(t => {
  var s = ps();

  s.define('service1', () => {
    return 'service 1 value';
  });

  s('service1').then(service => {
    t.is(service, 'service 1 value');
  });
});
