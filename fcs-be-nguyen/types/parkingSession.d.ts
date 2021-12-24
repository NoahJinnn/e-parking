interface ParkingSession {
  id: string
  carType?: string
  carColor?: string
  carLong?: number
  carWidth?: number
  carHeight?: number
  licensePlate?: string
  phone?: string
  phoneCode?: string
  faceId?: string
  fingerprintId?: string
  parkingAvatar?: string
  checkInDate?: number
  checkOutDate?: number
  parkingFee?: number
  currencyType?: number
  checkInMode?: number
  checkOutMode?: number
  paymentMode?: number
  status?: number
  isDeposited?: boolean
  [propName: string]: any
}
