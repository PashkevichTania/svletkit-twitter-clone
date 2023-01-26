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

// gets random time starting from now and
// going back one day whenever you seed the
// database in the future
export function randomDate(): string {
  // this is set to one day
  const offset = 24 * 60 * 60 * 1000

  const current = new Date().getTime()
  const random = Math.random() * offset
  const difference = new Date(current - random)

  return difference.toISOString()
}

export const parseCookie = (str: string) =>
  str
    .split(';')
    .map((v: string) => v.split('='))
    .reduce((acc: { [x: string]: string }, v: string[]) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
