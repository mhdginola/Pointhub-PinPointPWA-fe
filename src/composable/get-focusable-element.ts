export const useFocuseableElement = (parent: any) => {
  if (!parent) {
    console.warn('You need to pass a parent HTMLElement')
    return [] // Return array so length queries will work
  }

  return parent.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
  )
}
