export const getErroMessage = (e: unknown) => {
  let message = ''
  if (typeof e === 'string') {
    message = e
  } else if (e instanceof Error) {
    message = e.message
  }
  return message
}
