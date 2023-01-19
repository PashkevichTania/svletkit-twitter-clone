import { useQueryClient } from '@tanstack/svelte-query'
// import { page } from '$app/stores'
// import { invalidate } from '$app/navigation'

type Parameters = {
  result?: ({ form }: { form: HTMLFormElement }) => void
}
type Destroy = { destroy: () => void }
type Enhance = (form?: HTMLFormElement, { result }?: Parameters) => Destroy

export const enhance: Enhance = (form, { result } = {}) => {
  async function handleSubmit(event: Event) {
    if (!form) return

    // let invalidatePath: URL
    // page.subscribe((path) => {
    //   invalidatePath = path.url
    // })

    const client = useQueryClient()
    event.preventDefault()

    const response = await fetch(form.action, {
      method: form.method,
      headers: { accept: 'application/json' },
      body: new FormData(form)
    })

    if (!response.ok) {
      console.error(await response.text())
    }

    client.invalidateQueries(['tweets'])

    // const url = new URL(invalidatePath)
    // url.search = ''
    // url.hash = ''
    // invalidate(url.href)

    // reset the form
    if (result) {
      result({ form })
    }
  }

  form?.addEventListener('submit', handleSubmit)

  return {
    destroy() {
      form?.removeEventListener('submit', handleSubmit)
    }
  }
}
