import { NoteEntity } from "crossbell.js"

import { IS_PROD } from "./constants"
import { OUR_DOMAIN } from "./env"

export const getSiteLink = ({
  domain,
  subdomain,
  noProtocol,
}: {
  domain?: string
  subdomain: string
  noProtocol?: boolean
}) => {
  if (domain) {
    return `https://${domain}`
  }
  if (noProtocol) {
    return `${subdomain}.${OUR_DOMAIN}`
  }
  return `${IS_PROD ? "https" : "http"}://${subdomain}.${OUR_DOMAIN}`
}

export const getNoteSlug = (note: NoteEntity) => {
  return (
    note.metadata?.content?.attributes?.find(
      (a) => a?.trait_type === "xlog_slug",
    )?.value ||
    (note.metadata?.content as any)?._xlog_slug ||
    (note.metadata?.content as any)?._crosslog_slug
  )?.toLowerCase?.()
}
