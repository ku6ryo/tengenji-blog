import * as prismic from '@prismicio/client'

export const endpoint = process.env.PRISMIC_API_ENDPOINT || ""
export const repositoryName = prismic.getRepositoryName(endpoint)

export const client = prismic.createClient(repositoryName, {
  accessToken: "",
})