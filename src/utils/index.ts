export function generateRandomId () {
  return Math.random().toString(16).slice(2)
}

export function getValueById (id: string) {
  return (document.getElementById(id) as HTMLInputElement | null)?.value || ''
}

export function resetValueById (id: string) {
  const el = (document.getElementById(id) as HTMLInputElement | null)
  if (el) {
    el.value = ''
  }
}