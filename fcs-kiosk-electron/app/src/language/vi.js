const IntroPage = {
  MenuText: 'TÁC VỤ',
  CloseText: 'ĐÓNG',
  LanguageMenu: 'Ngôn ngữ',
  CheckinMenu: 'Đưa xe vào',
  CheckoutMenu: 'Lấy xe ra',
  MoreMenu: 'Khác',
}

const LanguageModal = {
  LangTitle: 'Chọn ngôn ngữ',
  ViName: 'Tiếng Việt',
  EnName: 'Tiếng Anh',
  LangBtnTxt: 'Đóng',
}

const SettingModal = {
  SettingTitle: 'Cài đặt',
  BottomCabin: 'Cabin dưới cùng',
  TopCabin: 'Cabin trên cùng',
}

const CheckinPage = {
  CheckinTitle: 'Đăng ký',
  ConfirmInfoTitle: 'XÁC NHẬN THÔNG TIN',
  CheckinOptionsTitle: 'VUI LÒNG CHỌN PHƯƠNG THỨC CHECK IN',
  PhoneNumberTitle: 'VUI LÒNG NHẬP SỐ ĐIỆN THOẠI',

  LeftFooterInTxt: 'Xác nhận biển số',
  MidFooterInTxt: 'Xác nhận thông tin',
  RightFooterInTxt: 'Hoàn thành',
  SuccessCheckinTxt: 'Check in thành công!',
}

const ConfirmCard = {
  LicensePlate: 'BIỂN SỐ XE',
  CheckinTime: 'GIỜ CHECK IN',
  CarType: 'LOẠI XE',
  ChargeCar: 'SẠC XE',
}

const SolutionCard = {
  FacialRecognize: 'Nhận diện khuôn mặt',
  FingerPrint: 'Quét vân tay',
  Passcode: 'Passcode',
  Facial: 'Nhận diện khuôn mặt',
  QR: 'Mã QR',
}

const OtpCard = {
  OtpTitle: 'VUI LÒNG NHẬP MÃ OTP',
  OtpQuestion: 'Chưa nhận được mã?',
  OtpRetry: 'Gửi lại',
}

const CheckoutPage = {
  CheckoutTitle: 'Lấy xe',
  CheckoutOptionsTitle: 'VUI LÒNG CHỌN PHƯƠNG THỨC CHECK OUT',
  ParkingDetailTitle: 'CHI TIẾT LƯỢT GỬI XE',
  TotalTitle: 'TỔNG TIỀN',

  CouponTitle: 'KHUYẾN MÃI',
  SearchBtnTxt: 'Tìm mã',
  QrScannerHeader: 'QUÉT MÃ',
  QrScannerFooter: 'VUI LÒNG ĐƯA MÃ QR RA TRƯỚC CAMERA',
  UseQrTxt: 'Sử Dụng Ngay',
  NextBtnTxt: 'TIẾP TỤC',
  PaymentVisaTitle: 'THANH TOÁN VISA/MASTER CARD',
  PaymentMobile: 'THANH TOÁN MOBILE',
  VisaOwnerLabel: 'TÊN CHỦ THẺ',
  VisaCardNumberLabel: 'SỐ THẺ',
  VisaLastDayLabel: 'NGÀY HẾT HẠN',
  VisaCcvLabel: 'CCV',
  NationLabel: 'QUỐC GIA',
  NationModalHeader: 'Chọn quốc gia',

  NaVi: 'Việt Nam',
  NaEn: 'Anh Quốc',
  NaCn: 'Trung Quốc',
  NaJp: 'Nhật Bản',
  VisaPayBtnLabel: 'THANH TOÁN',
  AppSuggest: 'Vui lòng sử dụng ứng dụng e-Parking để quét mã',
  AppRequest: 'Chưa có ứng dụng ?',
  InstallAppTitle: 'TẢI ỨNG DỤNG E-PARKING',
  SuccessCheckoutTxt: 'Check out thành công!',

  LeftFooterOutTxt: 'Xác nhận thông tin',
  MidFooterOutTxt: 'Thanh toán',
  RightFooterOutTxt: 'Hoàn thành',
}

const PaymentDetailCard = {
  CheckoutTime: 'GIỜ CHECK OUT',
  CouponPlaceholder: 'NHẬP MÃ KHUYẾN MÃI',
  MobileMethod: 'Mobile',
  VisaMethod: 'Visa/Master Card',
  AtmMethod: 'ATM Nội địa',
  CashMethod: 'Tiền mặt',
}

const RatingCard = {
  RatingTitle: 'Đánh giá',
}

export default {
  ConfirmBtnTxt: 'XÁC NHẬN',
  ThankTxt: 'Cảm ơn quý khách đã sử dụng dịch vụ',
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
