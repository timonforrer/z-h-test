export default {
  name: 'modularPage',
  title: 'Modular Page',
  type: 'document',
  fields: [
    {
      name: 'pageBase',
      title: 'Page base',
      type: 'pageBase',
    },
  ],
  preview: {
    select: {
      title: 'pageBase.title'
    }
  }
}
