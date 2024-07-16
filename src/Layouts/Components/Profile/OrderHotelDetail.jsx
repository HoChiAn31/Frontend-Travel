import { useParams } from 'react-router-dom';

function OrderHotelDetailPage() {
    const { id } = useParams();

    return <div>OrderHotelDetails:{id}</div>;
}

export default OrderHotelDetailPage;
