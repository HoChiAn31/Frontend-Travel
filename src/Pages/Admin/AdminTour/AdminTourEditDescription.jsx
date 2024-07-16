// import axios from 'axios';
// import { useEffect, useRef, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import InputField from '../../../Components/InputField';
// import { CirclePlus, CircleX, Pencil } from 'lucide-react';

// function AdminTourEditDescriptionPage() {
//     const location = useLocation();
//     const { dataDetail } = location.state;
//     const [description, setDescription] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         if (dataDetail?.descriptionId) {
//             axios
//                 .get(`${url}/tourSchedules/${dataDetail.descriptionId}`)
//                 .then((response) => {
//                     setDescription(response.data);
//                     setIsLoading(true);
//                 })
//                 .catch((error) => {
//                     console.error('Error:', error);
//                 });
//         }
//     }, [dataDetail]);

//     const handleAddDescription = () => {
//         setDescription((prevDescription) => ({
//             ...prevDescription,
//             description: [...prevDescription.description, { title: '', image: '', imageCaption: '' }],
//         }));
//     };

//     const handleInputChange = (index, field, value) => {
//         const updatedDescriptions = [...description.description];
//         updatedDescriptions[index][field] = value;
//         setDescription({ ...description, description: updatedDescriptions });
//     };

//     const handleImageChange = (index, event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             handleInputChange(index, 'image', reader.result);
//         };
//         if (file) {
//             reader.readAsDataURL(file);
//         }
//     };

//     const fileInputRefs = useRef([]);

//     const handleImageClick = (index) => {
//         fileInputRefs.current[index].click();
//     };

//     console.log(dataDetail);
//     return (
//         <div>
//             <div className="text-2xl">Quản lý lịch trình</div>
//             {isLoading && (
//                 <div>
//                     {description.description.map((desc, index) => (
//                         <div key={index}>
//                             <InputField
//                                 label="Tiêu đề"
//                                 type="text"
//                                 value={desc.title}
//                                 onChange={(e) => handleInputChange(index, 'title', e.target.value)}
//                             />

//                             <div>
//                                 <p className="font-bold">Hình ảnh:</p>
//                                 {desc.image ? (
//                                     <div className="group relative w-80">
//                                         <img
//                                             src={desc.image}
//                                             alt={desc.imageCaption}
//                                             className="h-80 w-80 cursor-pointer rounded-md"
//                                             onClick={() => handleImageClick(index)}
//                                         />
//                                         <div className="absolute inset-0 flex h-80 max-w-80 cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
//                                             <p className="font-bold text-white">Sửa ảnh</p>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} />
//                                 )}
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     style={{ display: 'none' }}
//                                     ref={(el) => (fileInputRefs.current[index] = el)}
//                                     onChange={(e) => handleImageChange(index, e)}
//                                 />
//                             </div>
//                             <InputField
//                                 label="Tên hình ảnh"
//                                 type="text"
//                                 value={desc.imageCaption}
//                                 onChange={(e) => handleInputChange(index, 'imageCaption', e.target.value)}
//                             />

//                             <div className="flex gap-5">
//                                 <button
//                                     className="flex items-center gap-2 rounded-md border border-red p-2"
//                                     // onClick={() => handleDeleteDescription(index)}
//                                 >
//                                     <CircleX className="text-red" /> <p className="text-red">Xóa</p>
//                                 </button>
//                                 <button
//                                     className="flex items-center gap-2 rounded-md border border-green p-2"
//                                     // onClick={() =>
//                                     //     handleEditDescription(index, {
//                                     //         ...desc,
//                                     //         title: prompt('Enter new title', desc.title),
//                                     //     })
//                                     // }
//                                 >
//                                     <Pencil className="text-green" /> <p className="">Sửa</p>
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                     <button
//                         className="flex items-center gap-2 rounded-md border border-blueButton p-2"
//                         onClick={handleAddDescription}
//                     >
//                         <CirclePlus className="text-blueButton" /> <p className="">Thêm</p>
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default AdminTourEditDescriptionPage;
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../../Components/InputField';
import { CirclePlus, CircleX, Pencil, ArrowUp, ArrowDown, ChevronLeft } from 'lucide-react'; // Import ArrowUp and ArrowDown icons
import { useTheme } from '../../../Layouts/ThemeProvider';

function AdminTourEditDescriptionPage() {
    const { darkMode, url } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { dataDetail } = location.state;
    const [description, setDescription] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log(dataDetail);
    useEffect(() => {
        if (dataDetail?.descriptionId) {
            axios
                .get(`${url}/tourSchedules/${dataDetail.descriptionId}`)
                .then((response) => {
                    setDescription(response.data);
                    setIsLoading(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [dataDetail]);

    const handleAddDescription = () => {
        setDescription((prevDescription) => ({
            ...prevDescription,
            description: [...prevDescription.description, { title: '', image: '', imageCaption: '', events: [] }],
        }));
    };

    const handleInputChange = (index, field, value) => {
        const updatedDescriptions = [...description.description];
        updatedDescriptions[index][field] = value;
        setDescription({ ...description, description: updatedDescriptions });
    };

    const handleEventChange = (descIndex, eventIndex, field, value) => {
        const updatedDescriptions = [...description.description];
        updatedDescriptions[descIndex].events[eventIndex][field] = value;
        setDescription({ ...description, description: updatedDescriptions });
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            handleInputChange(index, 'image', reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const fileInputRefs = useRef([]);

    const handleImageClick = (index) => {
        fileInputRefs.current[index].click();
    };

    const handleAddEvent = (descIndex) => {
        const updatedDescriptions = [...description.description];
        updatedDescriptions[descIndex].events.push({ time: '', description: '' });
        setDescription({ ...description, description: updatedDescriptions });
    };

    const handleDeleteEvent = (descIndex, eventIndex) => {
        const updatedDescriptions = [...description.description];
        updatedDescriptions[descIndex].events.splice(eventIndex, 1);
        setDescription({ ...description, description: updatedDescriptions });
    };

    const handleDeleteDescription = (descIndex) => {
        const updatedDescriptions = [...description.description];
        updatedDescriptions.splice(descIndex, 1);
        setDescription({ ...description, description: updatedDescriptions });
    };

    const handleMoveUp = (descIndex) => {
        if (descIndex > 0) {
            const updatedDescriptions = [...description.description];
            const temp = updatedDescriptions[descIndex];
            updatedDescriptions[descIndex] = updatedDescriptions[descIndex - 1];
            updatedDescriptions[descIndex - 1] = temp;
            setDescription({ ...description, description: updatedDescriptions });
        }
    };

    const handleMoveDown = (descIndex) => {
        if (descIndex < description.description.length - 1) {
            const updatedDescriptions = [...description.description];
            const temp = updatedDescriptions[descIndex];
            updatedDescriptions[descIndex] = updatedDescriptions[descIndex + 1];
            updatedDescriptions[descIndex + 1] = temp;
            setDescription({ ...description, description: updatedDescriptions });
        }
    };

    const handleUpdate = () => {
        // Handle the update logic here
        axios
            .put(`${url}/tourSchedules/${dataDetail.descriptionId}`, description)
            .then((response) => {
                console.log('Update successful:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="">
            <div
                className={`fixed left-0 right-0 top-0 z-[100] ml-[250px] px-5 pt-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'}`}
            >
                <div className="text-3xl">Quản lý lịch trình</div>
                <div className="my-4 flex items-center justify-between">
                    <button
                        className="flex items-center gap-2 rounded-md border border-red p-2 hover:bg-gray-500"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft className="text-red" /> <p className="">Quay lại</p>
                    </button>
                    <button
                        className="flex items-center gap-2 rounded-md border border-blueButton p-2 hover:bg-gray-500"
                        onClick={handleUpdate}
                    >
                        <Pencil className="text-blueButton" /> <p className="">Cập nhật</p>
                    </button>
                </div>
            </div>
            <div className="pt-[100px]">
                {isLoading && (
                    <div>
                        {description.description?.map((desc, descIndex) => (
                            <div key={descIndex} className="my-5 rounded-md border-2 px-4 py-5">
                                <InputField
                                    label="Tiêu đề"
                                    type="text"
                                    value={desc?.title}
                                    onChange={(e) => handleInputChange(descIndex, 'title', e.target.value)}
                                />

                                <div>
                                    <p className="font-bold">Hình ảnh:</p>
                                    {desc?.image ? (
                                        <div className="group relative w-80">
                                            <img
                                                src={desc?.image}
                                                alt={desc?.imageCaption}
                                                className="h-80 w-80 cursor-pointer rounded-md"
                                                onClick={() => handleImageClick(descIndex)}
                                            />
                                            <div className="absolute inset-0 flex h-80 max-w-80 cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                                <p className="font-bold text-white">Sửa ảnh</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(descIndex, e)}
                                            style={{ display: 'none' }}
                                            ref={(el) => (fileInputRefs.current[descIndex] = el)}
                                        />
                                    )}
                                </div>
                                <InputField
                                    label="Tên hình ảnh"
                                    type="text"
                                    value={desc?.imageCaption}
                                    onChange={(e) => handleInputChange(descIndex, 'imageCaption', e.target.value)}
                                />

                                <div className="mt-4">
                                    <p className="font-bold">Sự kiện:</p>
                                    {desc?.events.map((event, eventIndex) => (
                                        <div key={eventIndex} className="mb-2 rounded border p-2">
                                            <div className="flex">
                                                <div className="w-[90%]">
                                                    <InputField
                                                        label="Thời gian"
                                                        type="text"
                                                        value={event.time}
                                                        onChange={(e) =>
                                                            handleEventChange(
                                                                descIndex,
                                                                eventIndex,
                                                                'time',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <InputField
                                                        label="Mô tả"
                                                        type="text"
                                                        value={event.description}
                                                        onChange={(e) =>
                                                            handleEventChange(
                                                                descIndex,
                                                                eventIndex,
                                                                'description',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex w-[10%] items-center justify-center">
                                                    <button
                                                        className="mt-2 flex items-center gap-2 rounded-md border border-red p-2"
                                                        onClick={() => handleDeleteEvent(descIndex, eventIndex)}
                                                    >
                                                        <CircleX className="text-red" /> <p className="text-red">Xóa</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 flex gap-5">
                                    <button
                                        className="flex items-center gap-2 rounded-md border border-red p-2"
                                        onClick={() => handleDeleteDescription(descIndex)}
                                    >
                                        <CircleX className="text-red" /> <p className="text-red">Xóa</p>
                                    </button>
                                    <button
                                        className="flex items-center gap-2 rounded-md border border-blueButton p-2"
                                        onClick={() => handleAddEvent(descIndex)}
                                    >
                                        <CirclePlus className="text-blueButton" /> <p className="">Thêm sự kiện</p>
                                    </button>

                                    <button
                                        className="flex items-center gap-2 rounded-md border border-blueButton p-2"
                                        onClick={() => handleMoveUp(descIndex)}
                                        disabled={descIndex === 0}
                                    >
                                        <ArrowUp className="text-blueButton" /> <p className="">Di chuyển lên</p>
                                    </button>
                                    <button
                                        className="flex items-center gap-2 rounded-md border border-blueButton p-2"
                                        onClick={() => handleMoveDown(descIndex)}
                                        disabled={descIndex === description.description.length - 1}
                                    >
                                        <ArrowDown className="text-blueButton" /> <p className="">Di chuyển xuống</p>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            className="mt-4 flex items-center gap-2 rounded-md border border-blueButton p-2"
                            onClick={handleAddDescription}
                        >
                            <CirclePlus className="text-blueButton" /> <p className="">Thêm mô tả</p>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminTourEditDescriptionPage;
