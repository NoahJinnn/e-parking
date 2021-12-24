import React from 'react'

export const checkinSession: ParkingSession = {
  id: '',
  carType: '',
  carColor: '',
  carLong: 0,
  carWidth: 0,
  carHeight: 0,
  licensePlate: '',
  phone: '',
  phoneCode: '',
  faceId: '',
  fingerprintId: '',
  parkingAvatar: '',
  checkInDate: 0,
  checkOutDate: 0,
  parkingFee: 0,
  currencyType: 0,
  checkInMode: 0,
  checkOutMode: 0,
  paymentMode: 0,
  status: 0,
  isDeposited: false,
}

export const CheckinSessionContext = React.createContext(checkinSession)
