import S from '@sanity/desk-tool/structure-builder';
import Iframe from 'sanity-plugin-iframe-pane';

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view.component(Iframe)
     .options({
       url: doc => `http://localhost:8080/preview/${doc._id}`,
       reload: {
         button: true
       }
     })
     .title('Preview')
  ])
}

export default () => {
  return (
    S.list()
     .title('Content')
     .items(S.documentTypeListItems())
  )
}
