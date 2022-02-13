// importiere funktion für API abfragen (verwendet caching für schnellere seiten re-builds)
const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = async function() {
  const query = `*[_type == "article"]`;
  const news_site = await fetchFromSanity('articles', query, '');
  return news_site;
}
