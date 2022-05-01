import * as prismic from '@prismicio/client'
import { LinkResolverFunction } from '@prismicio/helpers'

export const endpoint = process.env.PRISMIC_API_ENDPOINT || ""
export const repositoryName = prismic.getRepositoryName(endpoint)

// Update the Link Resolver to match your project's route structure
export const linkResolver: LinkResolverFunction = (doc) => {
  switch (doc.type) {
    case 'homepage':
      return '/'
    case 'page':
      return `/${doc.uid}`
    default:
      return '/'
  }
}

export const client = prismic.createClient(repositoryName, {
  accessToken: "",
})