const App = {
    AppName: "HelloWorld",
    LoaderPrepareData: "Đang tải dữ liệu...",
};

const Error = {
    "error-with-status": "Lỗi {{ statusCode }} xảy ra trong quá trình xử lý",
    "error-without-status": "Có lỗi trong quá trình xử lý",
};

const HomeNavigate = {
    homeMap: "Bản đồ",
    homeHistory: "Lịch sử",
    homeMessage: "Tin nhắn",
    homeAccount: "Tài khoản",
    homeSetting: "Cài đặt",
};

const MapPage = {
    mapSearchUnits: 'Tìm nhà xe...'
}

const LoginPage = {
    loginTitle: "Đăng nhập",
    loginSubTitle: "Một tin nhắn sẽ gửi đến điện thoại bạn, có thể tính phí phụ thu.",
    loginVerTitle: "Nhập mã OTP",
    loginVerSub: "Một mã OTP được gửi đến {{ phone }}, vui lòng nhập nó dưới đây",
    loginVerResendP1: "Chưa nhận được mã?",
    loginVerResendP2: "Gửi lại",
    loginInfoTitle: "Thông tin các nhân",
    loginInfoSubTitle: "Vui lòng điền các thông tin sau đây",
    loginInfoAcceptPolicy: "Tôi đã đọc và hiểu rõ các",
    loginInfoAcceptPolicyLink: "điều khoản và chính sách của e-Parking.",
};

const Tools = {
    firstName: "Họ",
    lastName: "Tên",
    birth: "Ngày sinh",
    continue: "Tiếp tục",
};

export default {
    ...App,
    ...Error,
    ...HomeNavigate,
    ...MapPage,
    ...LoginPage,
    ...Tools,
};
