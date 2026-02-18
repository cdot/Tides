/**
 * Define Logger for node.js
 * Must be excluded from AppScript packaging.
 */
global.Logger = { log: s => console.debug(s) };
