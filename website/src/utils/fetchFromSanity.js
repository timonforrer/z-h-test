const { authenticatedClient, unauthenticatedClient } = require('../utils/sanity');
const { AssetCache } = require('@11ty/eleventy-cache-assets');
const arrayToObject = require('../utils/arrayToObject');

module.exports = async function(cache_id, query, params) {
  // platzhalter variabeln
  let arr_response = [];
  let obj_response = {};

  // wenn in preview umgebung, dann verwende den authentifizierten client (für entwürfe)
  if (process.env.ELEVENTY_SERVERLESS) {
    // abfrage von sanity, liefert array
    arr_response = await authenticatedClient.fetch(query, params);
    // umwandlung von array in objekt
    // array: [ { id: 'dokument_1', daten: 'xyz' }, { ... } ]
    // wird zu: { dokument_1: { id: 'dokument_1', daten: 'xyz' }, ... }
    // ist notwendig, damit die live previews funktionieren
    obj_response = arrayToObject(arr_response, "_id");
    return obj_response;
  }

  // wennn nicht in preview umgebung, dann erstelle cache
  let asset = new AssetCache(cache_id);

  // wenn cache jünger als 1 tag, verwende daten aus cache
  if(asset.isCacheValid('1d')) {
    return asset.getCachedValue();
  }

  // andernfalls mache erneute abfrage (mit nicht authentifizierten client)
  arr_response = await unauthenticatedClient.fetch(query, params);
  obj_response = arrayToObject(arr_response, "_id");
  // und speichere die neue abfrage im cache
  await asset.save(obj_response, "json");
  return obj_response;
}
