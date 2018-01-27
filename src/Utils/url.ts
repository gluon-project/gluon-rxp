const URL = require('url')
const urlRegex = require('url-regex')
const normalizeUrl = require('normalize-url')

export const getUrls = (text: string, options: any) => {
  options = options || {}

  let ret: string[] = []

  const add = (url: string) => {
    ret.push(normalizeUrl(url.trim().replace(/\.+$/, ''), options))
  }

  const urls = text.match(urlRegex()) || []
  for (const url of urls) {
    add(url)
  }

  return ret
}

export const getHost = (url: string) => {
  return URL.parse(normalizeUrl(url)).host
}
