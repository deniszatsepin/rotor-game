var ServiceManager  = require('rotor-service-manager');
var Entity          = require('rotor-entity');
var _               = require('lodash');

/**
 * Game skeleton, basic element in rotor-web engine.
 * @param {object} param
 * @constructor
 */
function Game(param) {
  if (Game._instance === null) {
    Game.prototype.init.apply(this, arguments);
    Game._instance = this;
  } else {
    return Game._instance;
  }
}

var proto = Game.prototype;

proto.init = function(param) {
  param = param || {};

  this.running = false;
  this.tabstop = param.tabstop;

  this._services = new ServiceManager(this);

  //The root of entities
  this._entities = new Entity({
    name: 'Root'
  });

};

/**
 * Add entity to the game
 * @param entity
 */
proto.addEntity = function(entity) {
  this._entities.addChild(entity);
};

proto.removeEntity = function(entity) {
  this._entities.removeChild(entity);
};

proto.updateEntities = function() {
  this._entities.update();
};

proto.registerServices = function(serviceConfigs) {
  _.each(serviceConfigs, function(service) {
    this._services.registerService(service.type, service.constructor, service.config);
  }.bind(this));
};

proto.initializeServices = function(serviceList) {
  this._services.initializeServices(serviceList);
};

proto.run = function() {
  this._entities.realize();
  this.running = true;
  this.loop();
};

proto.loop = function(time) {
  requestAnimationFrame(this.loop.bind(this));
  this.ServiceManager.update();
};

//static
Game._instance = null;
Game.getInstance = function() {
  return Game._instance;
};

module.exports = Game;
