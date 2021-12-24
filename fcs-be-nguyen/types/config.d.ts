declare module '@config' {
  const stage: 'prod' | 'dev'
  const resourcesStage: 'prod' | 'dev'
  const adminPhoneNumber: string

  const stripeKeyName: string
}
