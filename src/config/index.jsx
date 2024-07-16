const config = {
    home: '/',
    profile: '/profile',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgotPassword',
    confirmAccount: '/confirmAccount',
    resetPassword: '/resetPassword',
    searchCategory: '/searchCategory',
    tour: '/tour',
    tourdetail: '/tour/:id',
    hotel: '/hotel',
    hoteldetail: '/hotel/:id',
    // information
    about: '/about',
    blog: '/blog',
    blogDetail: '/blog/details/:id',
    helpCenter: '/helpCenter',
    helpCenterDetail: '/helpCenter/:id',
    helpCenterDetailAnswer: '/helpCenterDetailAnswer/:idQuestion/:id',
    contact: '/contact',
    oneStepCheckOutTour: 'oneStepCheckOutTour/:id',
    success: '/success',
    selectRoom: '/selectRoom/:id',
    oneStepCheckOutHotel: 'oneStepCheckOutHotel/:id',
    orderHotelDetail: '/orderHotelDetail/:id',
    orderTourDetail: '/orderTourDetail/:id',
    termcondition: '/termCondition',
    admin: '/admin',
    // admin tour
    adminTour: '/admin/adminTour',
    adminTourAdd: '/admin/adminTourAdd',
    adminTourEdit: '/admin/adminTourEdit/:id',
    adminTourAddDescription: '/admin/adminTour/adminTourAddDescription',
    adminTourEditDescription: '/admin/adminTourEdit/adminTourEditDescription/:id',
    adminTourAddIntro: '/admin/adminTour/adminTourAddIntro',

    adminTourEditIntro: '/admin/adminTourEdit/adminTourEditIntro/:id',

    // admin hotel
    adminHotel: '/admin/adminHotel',
    adminHotelAdd: '/admin/adminHotelAdd',
    adminHotelEdit: '/admin/adminHotelEdit/:id',
    // admin order
    adminOrderHotel: '/admin/adminOrderHotel',
    adminOrderHotelDetail: '/admin/adminOrderHotel/:id',
    adminOrderTour: '/admin/adminOrderTour',
    adminOrderTourDetail: '/admin/adminOrderTour/:id',
    // admin user
    adminUser: '/admin/adminUser',
    adminUserAdd: '/admin/adminUserAdd',
    adminUserEdit: '/admin/adminUserEdit/:id',
    // // admin room
    // adminRoom: '/admin/adminRoom',
    // adminRoomAdd: '/admin/adminRoomAdd',
    // adminRoomEdit: '/admin/adminRoomEdit/:id',
    // admin room hotel
    adminRoomHotel: '/admin/adminRoomHotel/:id"',
    adminRoomHotelAdd: '/admin/adminRoomHotelAdd/:id',
    adminRoomHotelEdit: '/admin/adminRoomHotelEdit/:id',

    paymentResult: '/paymentResult',
    //admin qa
    adminCategoriesQuestion: '/admin/adminCategoriesQuestion',
    // adminCategoriesQuestionAdd: '/admin/adminCategoriesQuestion',

    adminQuestion: '/admin/adminCategoriesQuestion/:id',
};
export default config;
