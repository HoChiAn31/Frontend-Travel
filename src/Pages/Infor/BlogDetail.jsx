// import { useParams } from 'react-router-dom';
// import { dataBlog } from '../../Components/data';
// import { useEffect, useState } from 'react';
// import FormatDate from '../../Components/FormatDate';

// function BlogDetailPage() {
//     const { id } = useParams();
//     const [dataDetail, setDataDetail] = useState();
//     useEffect(() => {
//         const data = dataBlog.find((item) => item.id === id);
//         setDataDetail(data);
//     }, [id]);
//     return (
//         <div>
//             {dataDetail && (
//                 <div
//                     style={{
//                         backgroundImage: `url('${dataDetail.image}')`,
//                         backgroundPosition: 'center center',
//                         backgroundAttachment: 'scroll',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundSize: 'cover',
//                         backgroundBlendMode: 'darken',
//                         backgroundColor: 'rgba(0, 0, 0, 0.4)',
//                     }}
//                     className="flex min-h-[500px] w-full items-end justify-center rounded-2xl pb-24"
//                 >
//                     <div className="max-w-[700px] text-white">
//                         <p className="text-2xl font-bold">{dataDetail.category}</p>
//                         <p className="my-5 flex h-20 items-center text-4xl font-medium">{dataDetail.title}</p>
//                         <div className="flex gap-4">
//                             <p className="text-xl">{dataDetail.author}</p>
//                             <p className="text-xl">
//                                 <FormatDate date={dataDetail.createdAt} />
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default BlogDetailPage;

import { useParams } from 'react-router-dom';
import { dataBlog } from '../../Components/data';
import { useEffect, useState } from 'react';
import FormatDate from '../../Components/FormatDate';

function BlogDetailPage() {
    const { id } = useParams();
    const [dataDetail, setDataDetail] = useState();

    useEffect(() => {
        const data = dataBlog.find((item) => item.id === id);
        setDataDetail(data);
    }, [id]);

    return (
        <div>
            {dataDetail && (
                <div>
                    <div
                        style={{
                            backgroundImage: `url('${dataDetail.image}')`,
                            backgroundPosition: 'center center',
                            backgroundAttachment: 'scroll',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundBlendMode: 'darken',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        }}
                        className="flex min-h-[500px] w-full items-end justify-center rounded-2xl pb-24"
                    >
                        <div className="max-w-[700px] text-white">
                            <p className="text-2xl font-bold">{dataDetail.category}</p>
                            <p className="my-5 flex h-20 items-center text-4xl font-medium">{dataDetail.title}</p>
                            <div className="flex gap-4">
                                <p className="text-xl">{dataDetail.author}</p>
                                <p className="text-xl">
                                    <FormatDate date={dataDetail.createdAt} />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto my-8 max-w-[700px]">
                        {dataDetail.content.map((section, index) => (
                            <div key={index} className="my-4">
                                <h2 className="text-2xl font-bold">{section.title}</h2>
                                <p className="mt-2">{section.content}</p>
                                {section.image && (
                                    <img src={section.image} alt={section.imageCaption} className="mt-4 rounded-md" />
                                )}
                                {section.imageCaption && (
                                    <p className="mt-1 text-center text-sm text-gray-500">{section.imageCaption}</p>
                                )}
                                {section.content1 && <p className="mt-2">{section.content1}</p>}
                                {section.content2 && <p className="mt-2">{section.content2}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BlogDetailPage;
