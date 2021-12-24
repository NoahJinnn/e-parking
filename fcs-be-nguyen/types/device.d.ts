interface IDevice {
  id: string
  readonly caseUUID?: string
  readonly macAddress?: string
  ipAddress?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  masterDevice?: string
  deviceName?: string
  deviceType?: string
  note?: string // Save Note about device
  isActive?: boolean
  isOnline?: boolean
  balenaUUID?: string // UUID from Balena
  publicIpAddress?: string
  longitude?: number
  latitude?: number
  customLongitude?: number
  customLatitude?: number
  [propName: string]: any // In case we have any extra properties
}
