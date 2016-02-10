function PromisedServices() {
  var services = {};

  function retrieve(serviceName) {
    var service = services[serviceName];
    if (!service) {
      throw new Error(`No such service defined: ${serviceName}`);
    }

    if (!service.instance) {
      var deps = Promise.all(service.deps.map(depName => retrieve(depName)));
      service.instance = deps.then(resolvedDeps => {
        return Promise.resolve(service.factory.apply(null, resolvedDeps));
      });
    }

    return service.instance;
  }

  function define(serviceName, deps, factory) {
    if (arguments.length === 2) {
      factory = deps;
      deps = [];
    }

    services[serviceName] = {
      deps,
      factory
    };
  }

  retrieve.getServices = () => Object.keys(services);
  retrieve.define = define;

  return retrieve;
}

module.exports = PromisedServices;
