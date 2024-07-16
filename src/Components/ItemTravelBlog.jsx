import { Button } from 'semantic-ui-react';
import { useTheme } from '../Layouts/ThemeProvider';

const ItemTravelBlog = ({ src, alt, title }) => {
    const { darkMode } = useTheme();
    return (
        <div className="mt-15 relative mx-5 mb-56">
            <div className="label1 absolute -top-2 left-8 mt-[6px] bg-orange px-2 py-2 text-base font-bold text-white">
                <p>10/06/2024</p>
            </div>
            <img
                src="https://sacotravel.com/wp-content/uploads/2023/07/thac-ban-gioc.jpg"
                alt="ac"
                className="-mt-[38px] h-[280px] w-[360px] rounded-xl"
            />
            <div className="absolute -bottom-40 left-[20px] w-[320px]" to="#">
                <div
                    className={`rounded-xl ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} px-3 py-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                >
                    {/* <p className="text-orange font-bold">4 NGÀY</p> */}
                    <p className="line-clamp-2 py-1 text-2xl font-bold">
                        10 điểm đến được người Việt yêu thích nhất trong năm 2018
                    </p>
                    <div className=" ">
                        <p className="">
                            Việc đẩy mạnh quảng bá, liên tục đưa ra các sản phẩm mới khiến du lịch Thái Lan gặt hái được
                            nhiều thành công trong thời gian gần đây. Mục tiêu của Thái Lan trong năm 2019 là đón 1,1
                            triệu khách từ Việt Nam....
                        </p>

                        <Button className="mt-4 bg-orange text-white hover:opacity-80">Xem thêm</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemTravelBlog;
