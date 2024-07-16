import config from '../config/index';
import HomePage from '../Pages/Home';
import HotelPage from '../Pages/Hotel';
import HotelDetailPage from '../Pages/HotelDetail';
import LoginPage from '../Pages/Login';
import NotPage from '../Pages/NotPage';
import RegisterPage from '../Pages/Register';
import SearchCategoryPage from '../Pages/searchCategory';
import TourPage from '../Pages/Tour';
import TourDetailPage from '../Pages/TourDetail';
import UserPage from '../Pages/Profile';
import ForgotPasswordPage from '../Pages/ForgotPassword';
import ResetPasswordPage from '../Pages/ResetPassword';
import ConfirmAccountPage from '../Pages/ConfirmAccount';
import AboutPage from '../Pages/Infor/About';
import HelpCenterPage from '../Pages/Infor/HelpCenter';
import ContactPage from '../Pages/Infor/Contact';

import OneStepCheckOutTourPage from '../Pages/OneStepCheckOutTour';
import SuccessPage from '../Pages/SuccessfullTransaction';
import SelectRoomPage from '../Pages/SelectRoom';
import OneStepCheckOutHotelPage from '../Pages/OneStepCheckOutHotel';
// import OrderHotelDetailPage from '../Pages/OrderHotelDetail';
import OrderTourDetailPage from '../Pages/OrderTourDetail';
import TermConditionPage from '../Pages/TermCondition';
import AdminPage from '../Pages/Admin/Admin';
import AdminTourPage from '../Pages/Admin/AdminTour/AdminTour';
import HelpCenterDetailPage from '../Pages/Infor/HelpCenterDetail';
import HelpCenterDetailAnswerPage from '../Pages/Infor/HelpCenterDetailAnswer';
import PaymentResult from '../Pages/PaymentResult';
import AdminTourAddPage from '../Pages/Admin/AdminTour/AdminTourAdd';
import AdminTourEditPage from '../Pages/Admin/AdminTour/AdminTourEdit';
import AdminHotelPage from '../Pages/Admin/AdminHotel/AdminHotel';
import AdminHotelAddPage from '../Pages/Admin/AdminHotel/AdminHotelAdd';
import AdminHotelEditPage from '../Pages/Admin/AdminHotel/AdminHotelEdit';
import AdminOrderHotelPage from '../Pages/Admin/AdminOrder/AdminOrderHotel';
import AdminOrderHotelDetailPage from '../Pages/Admin/AdminOrder/AdminOrderHotelDetail';
import AdminOrderTourPage from '../Pages/Admin/AdminOrder/AdminOrderTour';
import AdminOrderTourDetailPage from '../Pages/Admin/AdminOrder/AdminOrderTourDetail';
import AdminUserAddPage from '../Pages/Admin/AdminUser/AdminUserAdd';
import AdminUserEditPage from '../Pages/Admin/AdminUser/AdminUserEdit';
import AdminUserPage from '../Pages/Admin/AdminUser/AdminUser';
import AdminRoomHotelPage from '../Pages/Admin/AdminRoomHotel/AdminRoomHotel';
import AdminRoomHotelAddPage from '../Pages/Admin/AdminRoomHotel/AdminRoomHotelAdd';
import AdminRoomHotelEditPage from '../Pages/Admin/AdminRoomHotel/AdminRoomHotelEdit';
import AdminTourEditDescriptionPage from '../Pages/Admin/AdminTour/AdminTourEditDescription';
import AdminTourEditIntroPage from '../Pages/Admin/AdminTour/AdminTourEditIntro';
import AdminTourAddDescriptionPage from '../Pages/Admin/AdminTour/AdminTourAddDescription';
import AdminTourAddIntroPage from '../Pages/Admin/AdminTour/AdminTourAddIntro';
import BlogPage from '../Pages/Infor/Blog';
import BlogDetailPage from '../Pages/Infor/BlogDetail';
import AdminCategoriesQuestionPage from '../Pages/Admin/AdminQuestion/AdminCategoriesQuestion';
import AdminQuestionPage from '../Pages/Admin/AdminQuestion/AdminQuestions';
const publicRoutes = [
    { path: config.home, component: HomePage },
    { path: config.profile, component: UserPage },
    { path: config.login, component: LoginPage },
    { path: config.register, component: RegisterPage },
    { path: config.forgotPassword, component: ForgotPasswordPage },
    { path: config.confirmAccount, component: ConfirmAccountPage },
    { path: config.resetPassword, component: ResetPasswordPage },
    { path: config.searchCategory, component: SearchCategoryPage },
    { path: config.tour, component: TourPage },
    { path: config.hotel, component: HotelPage },
    { path: config.tourdetail, component: TourDetailPage },
    { path: config.hoteldetail, component: HotelDetailPage },
    // information
    { path: config.about, component: AboutPage },
    { path: config.blog, component: BlogPage },
    { path: config.blogDetail, component: BlogDetailPage },

    { path: config.helpCenter, component: HelpCenterPage },
    { path: config.helpCenterDetail, component: HelpCenterDetailPage },
    { path: config.helpCenterDetailAnswer, component: HelpCenterDetailAnswerPage },
    { path: config.contact, component: ContactPage },
    { path: config.oneStepCheckOutTour, component: OneStepCheckOutTourPage },
    { path: config.success, component: SuccessPage },
    { path: config.selectRoom, component: SelectRoomPage },
    { path: config.oneStepCheckOutHotel, component: OneStepCheckOutHotelPage },
    // { path: config.orderHotelDetail, component: OrderHotelDetailPage },
    { path: config.orderTourDetail, component: OrderTourDetailPage },
    { path: config.termcondition, component: TermConditionPage },
    { path: config.paymentResult, component: PaymentResult },
    { path: config.admin, component: AdminPage },
    // admin tour
    { path: config.adminTour, component: AdminTourPage },
    { path: config.adminTourAdd, component: AdminTourAddPage },
    { path: config.adminTourEdit, component: AdminTourEditPage },
    { path: config.adminTourAddDescription, component: AdminTourAddDescriptionPage },

    { path: config.adminTourEditDescription, component: AdminTourEditDescriptionPage },
    { path: config.adminTourAddIntro, component: AdminTourAddIntroPage },
    { path: config.adminTourEditIntro, component: AdminTourEditIntroPage },

    // admin hotel
    { path: config.adminHotel, component: AdminHotelPage },
    { path: config.adminHotelAdd, component: AdminHotelAddPage },
    { path: config.adminHotelEdit, component: AdminHotelEditPage },
    // admin order
    { path: config.adminOrderHotel, component: AdminOrderHotelPage },
    { path: config.adminOrderHotelDetail, component: AdminOrderHotelDetailPage },
    { path: config.adminOrderTour, component: AdminOrderTourPage },
    { path: config.adminOrderTourDetail, component: AdminOrderTourDetailPage },
    // admin user
    { path: config.adminUser, component: AdminUserPage },
    { path: config.adminUserAdd, component: AdminUserAddPage },
    { path: config.adminUserEdit, component: AdminUserEditPage },
    // admin room hotel
    { path: config.adminRoomHotel, component: AdminRoomHotelPage },
    { path: config.adminRoomHotelAdd, component: AdminRoomHotelAddPage },
    { path: config.adminRoomHotelEdit, component: AdminRoomHotelEditPage },

    { path: config.adminCategoriesQuestion, component: AdminCategoriesQuestionPage },
    { path: config.adminQuestion, component: AdminQuestionPage },

    { component: NotPage },
];

export { publicRoutes };
