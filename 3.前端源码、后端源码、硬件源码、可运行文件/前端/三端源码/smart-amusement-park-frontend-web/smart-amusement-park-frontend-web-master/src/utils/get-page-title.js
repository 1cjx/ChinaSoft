import defaultSettings from '@/settings'

const title = defaultSettings.title || '游乐园智慧助手'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
