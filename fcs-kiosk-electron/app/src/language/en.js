const IntroPage = {
  MenuText: 'MENU',
  CloseText: 'CLOSE',
  LanguageMenu: 'Language',
  CheckinMenu: 'Check in',
  CheckoutMenu: 'Check out',
  MoreMenu: 'More',
}

const LanguageModal = {
  LangTitle: 'Chose your language',
  ViName: 'Vietnamese',
  EnName: 'English',
  LangBtnTxt: 'Close',
}

const SettingModal = {
  SettingTitle: 'Settings',
  BottomCabin: 'Bottom cabin',
  TopCabin: 'Top cabin',
}

const CheckinPage = {
  CheckinTitle: 'Check in',
  ConfirmInfoTitle: 'Confirm your information',
  CheckinOptionsTitle: 'PLEASE CHOSE YOUR CHECK-IN PROCEDURE',
  PhoneNumberTitle: 'PLEASE ENTER YOUR PHONE NUMBER',

  LeftFooterInTxt: 'Check License Plate',
  MidFooterInTxt: 'Identify',
  RightFooterInTxt: 'Complete',
  SuccessCheckinTxt: 'Checkin successfully!',
}

const ConfirmCard = {
  LicensePlate: 'LICENSE PLATE',
  CheckinTime: 'CHECKIN TIME',
  CarType: 'CAR TYPE',
  ChargeCar: 'CHARGING MODE',
}

const SolutionCard = {
  FacialRecognize: 'Facial Recognize',
  FingerPrint: 'Fingerprint Recognize',
  Passcode: 'Passcode',
  Facial: 'Facial Recognize',
  QR: 'QR Code',
}

const OtpCard = {
  OtpTitle: 'PLEASE ENTER YOUR OTP',
  OtpQuestion: 'Still not received yet?',
  OtpRetry: 'Resend',
}

const CheckoutPage = {
  CheckoutTitle: 'Check out',
  CheckoutOptionsTitle: 'PLEASE CHOSE YOUR CHECK-OUT PROCEDURE',
  ParkingDetailTitle: 'PARKING SESSION DETAILS',
  TotalTitle: 'TOTAL',

  CouponTitle: 'COUPON',
  SearchBtnTxt: 'Search',
  QrScannerHeader: 'SCAN ME',
  QrScannerFooter: 'PLEASE MOVE YOUR QR CODE OVER THE CAMERA',
  UseQrTxt: 'Use It Now',
  NextBtnTxt: 'NEXT',
  PaymentVisaTitle: 'VISA/MASTER CARD PAYMENT',
  PaymentMobile: 'MOBILE PAYMENT',
  VisaOwnerLabel: 'CARDHOLDER NAME',
  VisaCardNumberLabel: 'CARD NUMBER',
  VisaLastDayLabel: 'EXP. DATE',
  VisaCcvLabel: 'CCV',
  NationLabel: 'NATION',
  NationModalHeader: 'Chose your nation',

  NaVi: 'Vietnam',
  NaEn: 'English',
  NaCn: 'China',
  NaJp: 'Japan',
  VisaPayBtnLabel: 'PAY NOW',
  AppSuggest: 'Please use e-Parking app to scan the code',
  AppRequest: 'Not yet install ?',
  InstallAppTitle: 'INSTALL E-PARKING APP',
  SuccessCheckoutTxt: 'Checkout successfully!',

  LeftFooterOutTxt: 'Identify',
  MidFooterOutTxt: 'Payment',
  RightFooterOutTxt: 'Complete',
}

const PaymentDetailCard = {
  CheckoutTime: 'CHECKOUT TIME',
  CouponPlaceholder: 'INPUT YOUR COUPON',
  MobileMethod: 'Mobile',
  VisaMethod: 'Visa/Master Card',
  AtmMethod: 'Domestic ATM',
  CashMethod: 'Cash payment',
}

const RatingCard = {
  RatingTitle: 'Rating',
}

export default {
  ConfirmBtnTxt: 'CONFIRM',
  ThankTxt: 'Thank you for using our services',
  ...IntroPage,
  ...LanguageModal,
  ...CheckinPage,
  ...ConfirmCard,
  ...CheckoutPage,
  ...SolutionCard,
  ...OtpCard,
  ...PaymentDetailCard,
  ...RatingCard,
  ...SettingModal,
}
