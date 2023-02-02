export const generateUUID = (): string => Math.random().toString(16).slice(2)

export function timePosted(createdAt: Date | string): string {
  try {
    const posted = new Date(createdAt).getTime()
    const currentTime = new Date().getTime()
    const difference = currentTime - posted
    const seconds = difference / 1000
    const minutes = seconds / 60
    const hours = minutes / 60

    if (minutes <= 60) {
      return `${minutes.toFixed()}m`
    }

    if (hours <= 24) {
      return `${hours.toFixed()}h`
    }

    return Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium'
    }).format(posted)
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`)
  }
}

export const parseCookie = (str: string) =>
  str
    .split(';')
    .map((v: string) => v.split('='))
    .reduce((acc: { [x: string]: string }, v: string[]) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
