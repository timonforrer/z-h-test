import client from 'part:@sanity/base/client';
import slugify from 'slugify';

export default async function(input) {
  const parentQuery = '*[_id == $id][0]'; // a GROQ query, feel free to change this up to match what you need
  const parentQueryParams = {
    id: input.doc.pageBase.parent?._ref || '',
  };
  const parent = await client.fetch(
    parentQuery,
    parentQueryParams,
  );
  const parentSlug = parent?.pageBase.slug.current ? `${parent.pageBase.slug.current}/` : ''; // if there's no parent assign an empty string, it will make the function return the current slug as the root
  const pageSlug = slugify(input.doc.pageBase.title, { locale: 'de', lower: true });
  return `${parentSlug}${pageSlug}`;
}
