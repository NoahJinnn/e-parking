export const awsWSConfig = {
  onOpen: () => console.log('opened'),
  shouldReconnect: (closeEvent) => true,
  share: true,
}
