import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../Components/useIntersectionObserver';

function AboutPage() {
    const [ref1, isVisible1] = useIntersectionObserver({ threshold: 0.1 });
    const [ref2, isVisible2] = useIntersectionObserver({ threshold: 0.1 });
    const [ref3, isVisible3] = useIntersectionObserver({ threshold: 0.1 });
    const [ref4, isVisible4] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <div className="mx-auto max-w-[1200px] p-5">
            <div className="text-center">
                <h1 className="font-bold">TravelAT</h1>
                <p className="font-bold">Sống, đậm dấu ấn riêng</p>
            </div>
            <div className="my-10 flex items-center gap-20">
                <img
                    src="https://media.istockphoto.com/id/1500563478/photo/traveler-asian-woman-relax-and-travel-on-thai-longtail-boat-in-ratchaprapha-dam-at-khao-sok.webp?b=1&s=170667a&w=0&k=20&c=PL6F9_KtlUx4E6pl9ryJxR3kLSv-l6aiHAi1DLw84vk="
                    alt=""
                    className={`h-[400px] w-[400px] rounded-2xl ${
                        isVisible1 ? 'animate-fade-right animate-delay-100 animate-duration-500' : ''
                    }`}
                    ref={ref1}
                />
                <p
                    ref={ref2}
                    className={`${isVisible2 ? 'animate-fade-left animate-delay-100 animate-duration-500' : ''}`}
                >
                    TravelAT là siêu ứng dụng hàng đầu về du lịch và tiện ích sống tại Đông Nam Á, mang đến cho bạn cơ
                    hội khám phá và mua sắm đa dạng các sản phẩm du lịch, dịch vụ địa phương và tài chính. Với danh mục
                    sản phẩm phong phú, TravelAT cung cấp dịch vụ đặt vé máy bay, xe buýt, tàu hỏa, thuê ô tô, đưa đón
                    sân bay, cùng với kho khách sạn và chỗ ở lớn nhất khu vực. Ngoài ra, chúng tôi còn đáp ứng nhu cầu
                    phong cách sống của bạn bằng các dịch vụ tham quan, hoạt động địa phương và spa chăm sóc sức khỏe,
                    sắc đẹp. Dù bạn có lựa chọn lối sống như thế nào, chỉ cần một cú nhấp chuột là đủ!
                </p>
            </div>
            <div className="my-10 flex items-center gap-20">
                <div
                    ref={ref3}
                    className={`${isVisible3 ? 'animate-fade-right animate-delay-100 animate-duration-500' : ''}`}
                >
                    <p>
                        TravelAT tin rằng hạnh phúc có thể đến dưới nhiều hình thức khác nhau, tùy vào mỗi người và từng
                        thời điểm. Với uy tín và hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến cho bạn hàng loạt
                        lựa chọn phong phú để làm bừng sáng niềm vui của bạn. Dù bạn đang tìm kiếm một trải nghiệm thú
                        vị, nghỉ dưỡng tại khu resort 5 sao, một ngày spa thư giãn, một chuyến phiêu lưu mạo hiểm, vé
                        máy bay hạng nhất hay một chuyến đi đường bộ thú vị, cho cả hành trình trong nước và quốc tế,
                        tất cả đều có trong một ứng dụng duy nhất – TravelAT.
                    </p>
                    <p className="py-5">
                        Với dịch vụ chăm sóc khách hàng 24/7 bằng nhiều ngôn ngữ địa phương và hơn 30 phương thức thanh
                        toán khác nhau, TravelAT đã được tải xuống hơn 100 triệu lần, trở thành ứng dụng du lịch và tiện
                        ích sống phổ biến nhất tại Đông Nam Á.
                    </p>
                    <p>
                        Còn chờ gì nữa? Hãy đặt ngay một chuyến đi được lên kế hoạch kỹ lưỡng hoặc một kỳ nghỉ ngẫu hứng
                        với chúng tôi. Với tất cả các lựa chọn du lịch và phong cách sống độc đáo, TravelAT sẽ luôn đồng
                        hành cùng bạn.
                    </p>
                </div>
                <img
                    src="https://static.saltinourhair.com/wp-content/uploads/2019/06/23134442/italy-travel-itinerary.jpg"
                    alt=""
                    ref={ref4}
                    className={`h-[400px] w-[400px] rounded-2xl ${isVisible2 ? 'animate-fade-left animate-delay-100 animate-duration-500' : ''}`}
                />
            </div>
            <div className="pt-10 text-center">
                <Link to="/" className="rounded-md bg-blueButton px-16 py-4 font-bold text-white hover:opacity-70">
                    Khám phá thêm
                </Link>
            </div>
        </div>
    );
}

export default AboutPage;
