var ServiceManager  = require('rotor-services');
var Entity  = require('rotor-entity');
var _       = require('lodash');

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
  this.running = false;
  this.tabstop = param.tabstop;

  this._services = new ServiceManager();

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

Game._instance = null;
Game.getInstance = function() {
  return Game._instance;
};

module.exports = Game;
