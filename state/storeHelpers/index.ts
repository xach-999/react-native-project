export const pendingCase = (state: any) => {
  state.loading = true
}

export const errorCase = (state: any, action: any) => {
  state.loading = false
  console.warn(action?.error)
}