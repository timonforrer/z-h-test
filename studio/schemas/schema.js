import createSchema from 'part:@sanity/base/schema-creator'

import schemaTypes from 'all:part:@sanity/base/schema-type'

import pageBase from './pageBase'
import article from './pageTypes/article'
import homeSite from './pageTypes/HomeSite'
import newsSite from './pageTypes/newsSite'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    pageBase,
    article,
    homeSite,
    newsSite
  ]),
})
