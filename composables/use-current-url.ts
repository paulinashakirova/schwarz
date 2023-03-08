import { computed, useContext, useRoute } from '@nuxtjs/composition-api'

export function useCurrentUrl() {
  const { env } = useContext()
  const { baseUrl } = env
  const route = useRoute()
  console.log('baseUrl', baseUrl)

  return computed(() => {
    const url = `${baseUrl}${route.value.path}`
    console.log('url', url)

    return url.endsWith('/') ? url : `${url}/`
  })
}
