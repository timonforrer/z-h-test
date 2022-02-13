
// Diese Datei gilt für alle .njk-Files im Ordner 'pages'

module.exports = {
  layout: "base.njk",
  eleventyComputed: {
    title: data => {
      return data._data.pageBase.title
    },
    permalink: data => {
      [data._data.pageBase.slug];
      const slug = data._data.pageBase.slug?.current ?? null;
      return slug !== null ? `${slug}/index.html` : 'index.html';
    }
  }
}
