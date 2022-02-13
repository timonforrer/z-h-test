const sanityClient = require('@sanity/client');

const baseSettings = {
  projectId: 'dzerruvp',
  dataset: 'production',
  apiVersion: '2022-02-12',
  useCdn: false,
};

const authenticatedClient = new sanityClient({
  ...baseSettings,
  token: process.env.SANITY_PREVIEW_TOKEN
})

const unauthenticatedClient = new sanityClient(baseSettings);

module.exports = {
  authenticatedClient,
  unauthenticatedClient
}
