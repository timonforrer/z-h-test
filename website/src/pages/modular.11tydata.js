module.exports = {
  pagination: {
    addAllPagesToCollections: true,
    alias: "_data",
    data: "modular_pages",
    resolve: "values",
    serverless: "eleventy.serverless.path.id",
    size: 1,
  },
  eleventyComputed: {
    permalink: data => {
      [data._data.slug];
      const { slug } = data._data;
      return {
        build: slug !== null ? `${slug}/index.html` : 'index.html',
        preview: `/preview/:id`
      }
    },
    isDraft: data => {
      [data._data.id];
      const { id } = data._data;
      const isDraft = (id.split('.'))[0] === 'drafts';
      return isDraft
    }
  }
}
