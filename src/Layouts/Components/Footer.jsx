import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
    const LinkNav = ({ to, title }) => (
        <div className="py-1">
            <Link to={to} className="text-base text-white hover:opacity-70">
                {title}
            </Link>
        </div>
    );

    const ItemContact = ({ icon: Icon, title }) => (
        <div className="my-5 flex items-start gap-4">
            <div>
                <Icon className="text-xl text-orange" />
            </div>
            <p className="text-base">{title}</p>
        </div>
    );

    return (
        <div className="bg-black1 text-white">
            <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-3 lg:px-0">
                <div className="my-10 flex flex-col items-start gap-16 lg:flex-row">
                    <div className="w-full lg:w-[30%]">
                        <div className="flex items-center">
                            <img
                                src="https://png.pngtree.com/png-vector/20220619/ourmid/pngtree-plane-travel-logo-vector-template-png-image_5128726.png"
                                alt="Travel AT Logo"
                                className="h-16 w-16"
                            />
                            <h3 className="m-0 text-3xl font-bold text-[#19619E]">
                                TRAVEL <span className="text-[#F79517]">SVIP</span>
                            </h3>
                        </div>
                        <div className="mt-3">
                            <p>
                                Chúng tôi mang đến những hành trình tuyệt vời và kỷ niệm đáng nhớ. Dù bạn muốn nghỉ
                                dưỡng, khám phá văn hóa hay phiêu lưu, chúng tôi luôn sẵn sàng hỗ trợ.
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/5">
                        <p className="my-3 text-2xl">Công ty</p>
                        <LinkNav title="Giới thiệu" to="/about" />
                        <LinkNav title="Blog" to="/blog" />
                        <LinkNav title="Tuyển dụng" to="#" />
                        <LinkNav title="Điều khoản và điều kiện" to="/termCondition" />
                    </div>
                    <div className="w-full lg:w-1/5">
                        <p className="my-3 text-2xl">Hỗ trợ</p>
                        <LinkNav title="Trung tâm trợ giúp" to="/helpCenter" />
                        <LinkNav title="Câu hỏi thường gặp" to="#" />
                        <LinkNav title="Hỗ trợ vé" to="#" />
                        <LinkNav title="Tài khoản của tôi" to="/profile" />
                        <LinkNav title="Liên hệ chúng tôi" to="#" />
                    </div>
                    <div className="w-full lg:w-[30%]">
                        <p className="my-3 text-2xl">Liên hệ</p>
                        <ItemContact icon={MapPin} title="Ấp Trạm Lạc, Xã Mỹ Hạnh Bắc, Huyện Đức Hòa, Tỉnh Long An" />
                        <ItemContact icon={Mail} title="uit999@gm.uit.edu.vn" />
                        <ItemContact icon={Phone} title="+(84) 979797979" />
                    </div>
                </div>
                <div className="border-t-[0.5px] border-gray-200 pt-5 text-center">
                    Copyright © 2024 <span className="text-orange">TravelSVIP</span> | Design by{' '}
                    <span className="text-orange">HoChiAn31</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
