const { authenticatedClient, unauthenticatedClient } = require('../utils/sanity');
const { AssetCache } = require('@11ty/eleventy-cache-assets');
const arrayToObject = require('../utils/arrayToObject');

const query = `
  *[_type == "modularPage"]{
    "id": _id,
    ...pageBase,
    "slug": pageBase.slug.current
  }
`;

module.exports = async function() {
  let arr_response = [];
  let obj_response = {};

  // if in preview environment, fetch using authenticatedClient to include document drafts
  if (process.env.ELEVENTY_SERVERLESS) {
    arr_response = await authenticatedClient.fetch(query, '');
    obj_response = arrayToObject(arr_response, "id");
    return obj_response;
  }

  // if not in preview env, use cache
  let asset = new AssetCache('sanity-modular-pages');

  arr_response = await unauthenticatedClient.fetch(query, '');
  obj_response = arrayToObject(arr_response, "id");

  // if cache not older than 1d, return cache
  if(asset.isCacheValid('1d')) {
    return asset.getCachedValue();
  }

  // otherwise, save api response to cache and return data
  await asset.save(obj_response, "json");
  return obj_response;
}
