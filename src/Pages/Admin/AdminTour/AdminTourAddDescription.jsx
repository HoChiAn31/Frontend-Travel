// import axios from 'axios';
// import { useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import InputField from '../../../Components/InputField';
// import { CirclePlus, CircleX, ChevronLeft } from 'lucide-react';
// import { useTheme } from '../../../Layouts/ThemeProvider';

// function AdminTourAddDescriptionPage() {
//     const { darkMode, url } = useTheme();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { city } = location.state;
//     console.log(city);
//     const [description, setDescription] = useState({
//         title: '',
//         image: '',
//         imageCaption: '',
//         events: [],
//     });

//     const handleInputChange = (field, value) => {
//         setDescription((prevDescription) => ({
//             ...prevDescription,
//             [field]: value,
//         }));
//     };

//     const handleEventChange = (eventIndex, field, value) => {
//         const updatedEvents = [...description.events];
//         updatedEvents[eventIndex][field] = value;
//         setDescription((prevDescription) => ({
//             ...prevDescription,
//             events: updatedEvents,
//         }));
//     };

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setDescription((prevDescription) => ({
//                 ...prevDescription,
//                 image: reader.result,
//             }));
//         };
//         if (file) {
//             reader.readAsDataURL(file);
//         }
//     };

//     const fileInputRef = useRef(null);

//     const handleImageClick = () => {
//         fileInputRef.current.click();
//     };

//     const handleAddEvent = () => {
//         setDescription((prevDescription) => ({
//             ...prevDescription,
//             events: [...prevDescription.events, { time: '', description: '' }],
//         }));
//     };

//     const handleDeleteEvent = (eventIndex) => {
//         const updatedEvents = [...description.events];
//         updatedEvents.splice(eventIndex, 1);
//         setDescription((prevDescription) => ({
//             ...prevDescription,
//             events: updatedEvents,
//         }));
//     };

//     const handleAddDescription = () => {
//         console.log([description]);
//         axios
//             .post(`${url}/tourSchedules`, {
//                 city,
//                 description: [description],
//             })
//             .then((response) => {
//                 console.log('Description added successfully:', response.data.id);

//                 navigate(`/admin/adminTourAdd`, { state: { idDescription: response.data.id } });
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     };

//     return (
//         <div className="">
//             <div
//                 className={`fixed left-0 right-0 top-0 z-[100] ml-[250px] px-5 pt-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'}`}
//             >
//                 <div className="text-3xl">Thêm mô tả lịch trình</div>
//                 <div className="my-4 flex items-center justify-between">
//                     <button
//                         className="flex items-center gap-2 rounded-md border border-red p-2 hover:bg-gray-500"
//                         onClick={() => navigate(-1)}
//                     >
//                         <ChevronLeft className="text-red" /> <p className="">Quay lại</p>
//                     </button>
//                     <button
//                         className="flex items-center gap-2 rounded-md border border-blueButton p-2 hover:bg-gray-500"
//                         onClick={handleAddDescription}
//                     >
//                         <CirclePlus className="text-blueButton" /> <p className="">Thêm mô tả</p>
//                     </button>
//                 </div>
//             </div>
//             <div className="pt-[100px]">
//                 <div className="my-5 rounded-md border-2 px-4 py-5">
//                     <InputField
//                         label="Tiêu đề"
//                         type="text"
//                         value={description.title}
//                         onChange={(e) => handleInputChange('title', e.target.value)}
//                     />

//                     <div>
//                         <p className="font-bold">Hình ảnh:</p>
//                         {description.image ? (
//                             <div className="group relative w-80">
//                                 <img
//                                     src={description.image}
//                                     alt={description.imageCaption}
//                                     className="h-80 w-80 cursor-pointer rounded-md"
//                                     onClick={handleImageClick}
//                                 />
//                                 <div className="absolute inset-0 flex h-80 max-w-80 cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
//                                     <p className="font-bold text-white">Sửa ảnh</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 style={{ display: 'none' }}
//                                 ref={fileInputRef}
//                             />
//                         )}
//                     </div>
//                     <InputField
//                         label="Tên hình ảnh"
//                         type="text"
//                         value={description.imageCaption}
//                         onChange={(e) => handleInputChange('imageCaption', e.target.value)}
//                     />

//                     <div className="mt-4">
//                         <p className="font-bold">Sự kiện:</p>
//                         {description.events.map((event, eventIndex) => (
//                             <div key={eventIndex} className="mb-2 rounded border p-2">
//                                 <div className="flex">
//                                     <div className="w-[90%]">
//                                         <InputField
//                                             label="Thời gian"
//                                             type="text"
//                                             value={event.time}
//                                             onChange={(e) => handleEventChange(eventIndex, 'time', e.target.value)}
//                                         />
//                                         <InputField
//                                             label="Mô tả"
//                                             type="text"
//                                             value={event.description}
//                                             onChange={(e) =>
//                                                 handleEventChange(eventIndex, 'description', e.target.value)
//                                             }
//                                         />
//                                     </div>
//                                     <div className="flex w-[10%] items-center justify-center">
//                                         <button
//                                             className="mt-2 flex items-center gap-2 rounded-md border border-red p-2"
//                                             onClick={() => handleDeleteEvent(eventIndex)}
//                                         >
//                                             <CircleX className="text-red" /> <p className="text-red">Xóa</p>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="mt-4 flex gap-5">
//                         <button
//                             className="flex items-center gap-2 rounded-md border border-blueButton p-2"
//                             onClick={handleAddEvent}
//                         >
//                             <CirclePlus className="text-blueButton" /> <p className="">Thêm sự kiện</p>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AdminTourAddDescriptionPage;
import axios from 'axios';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../../Components/InputField';
import { CirclePlus, CircleX, ChevronLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '../../../Layouts/ThemeProvider';
import { useTitle } from '../../../Components/useTitle';

function AdminTourAddDescriptionPage() {
    useTitle('Thêm mô tả');
    const { darkMode, url } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { city } = location.state;

    const [descriptions, setDescriptions] = useState([
        {
            title: '',
            image: '',
            imageCaption: '',
            events: [],
        },
    ]);

    const handleInputChange = (descIndex, field, value) => {
        setDescriptions((prevDescriptions) => {
            const updatedDescriptions = [...prevDescriptions];
            updatedDescriptions[descIndex][field] = value;
            return updatedDescriptions;
        });
    };

    const handleEventChange = (descIndex, eventIndex, field, value) => {
        setDescriptions((prevDescriptions) => {
            const updatedDescriptions = [...prevDescriptions];
            const updatedEvents = [...updatedDescriptions[descIndex].events];
            updatedEvents[eventIndex][field] = value;
            updatedDescriptions[descIndex].events = updatedEvents;
            return updatedDescriptions;
        });
    };

    const handleImageChange = (descIndex, event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setDescriptions((prevDescriptions) => {
                const updatedDescriptions = [...prevDescriptions];
                updatedDescriptions[descIndex].image = reader.result;
                return updatedDescriptions;
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = useRef([]);

    const handleImageClick = (descIndex) => {
        fileInputRef.current[descIndex].click();
    };

    const handleAddEvent = (descIndex) => {
        setDescriptions((prevDescriptions) => {
            const updatedDescriptions = [...prevDescriptions];
            updatedDescriptions[descIndex].events = [
                ...updatedDescriptions[descIndex].events,
                { time: '', description: '' },
            ];
            return updatedDescriptions;
        });
    };

    const handleDeleteEvent = (descIndex, eventIndex) => {
        setDescriptions((prevDescriptions) => {
            const updatedDescriptions = [...prevDescriptions];
            const updatedEvents = [...updatedDescriptions[descIndex].events];
            updatedEvents.splice(eventIndex, 1);
            updatedDescriptions[descIndex].events = updatedEvents;
            return updatedDescriptions;
        });
    };

    const handleAddDescription = () => {
        setDescriptions((prevDescriptions) => [
            ...prevDescriptions,
            {
                title: '',
                image: '',
                imageCaption: '',
                events: [],
            },
        ]);
    };

    const handleDeleteDescription = (descIndex) => {
        setDescriptions((prevDescriptions) => {
            const updatedDescriptions = [...prevDescriptions];
            updatedDescriptions.splice(descIndex, 1);
            return updatedDescriptions;
        });
    };

    const handleMoveDescriptionUp = (descIndex) => {
        if (descIndex === 0) return;
        setDescriptions((prevDescriptions) => {
            const updatedDescriptions = [...prevDescriptions];
            const temp = updatedDescriptions[descIndex];
            updatedDescriptions[descIndex] = updatedDescriptions[descIndex - 1];
            updatedDescriptions[descIndex - 1] = temp;
            return updatedDescriptions;
        });
    };

    const handleMoveDescriptionDown = (descIndex) => {
        if (descIndex === descriptions.length - 1) return;
        setDescriptions((prevDescriptions) => {
            const updatedDescriptions = [...prevDescriptions];
            const temp = updatedDescriptions[descIndex];
            updatedDescriptions[descIndex] = updatedDescriptions[descIndex + 1];
            updatedDescriptions[descIndex + 1] = temp;
            return updatedDescriptions;
        });
    };

    const handleSubmit = () => {
        axios
            .post(`${url}/tourSchedules`, {
                city,
                description: descriptions,
            })
            .then((response) => {
                navigate(`/admin/adminTourAdd`, { state: { idDescription: response.data.id } });
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
                <div className="text-3xl">Thêm mô tả lịch trình</div>
                <div className="my-4 flex items-center justify-between">
                    <button
                        className="flex items-center gap-2 rounded-md border border-red p-2 hover:bg-gray-500"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft className="text-red" /> <p className="">Quay lại</p>
                    </button>
                    <button
                        className="flex items-center gap-2 rounded-md border border-blueButton p-2 hover:bg-gray-500"
                        onClick={handleSubmit}
                    >
                        <CirclePlus className="text-blueButton" /> <p className="">Thêm mô tả</p>
                    </button>
                </div>
            </div>
            <div className="pt-[100px]">
                {descriptions.map((description, descIndex) => (
                    <div key={descIndex} className="my-5 rounded-md border-2 px-4 py-5">
                        <div className="mb-4 flex justify-end gap-2">
                            <button
                                onClick={() => handleMoveDescriptionUp(descIndex)}
                                className="flex items-center gap-2 rounded-md border border-blueButton p-2"
                            >
                                <ArrowUp className="text-blueButton" />
                            </button>
                            <button
                                onClick={() => handleMoveDescriptionDown(descIndex)}
                                className="flex items-center gap-2 rounded-md border border-blueButton p-2"
                            >
                                <ArrowDown className="text-blueButton" />
                            </button>
                            <button
                                onClick={() => handleDeleteDescription(descIndex)}
                                className="flex items-center gap-2 rounded-md border border-red p-2"
                            >
                                <CircleX className="text-red" /> <p className="text-red">Xóa mô tả</p>
                            </button>
                        </div>
                        <InputField
                            label="Tiêu đề"
                            type="text"
                            value={description.title}
                            onChange={(e) => handleInputChange(descIndex, 'title', e.target.value)}
                        />

                        <div>
                            <p className="font-bold">Hình ảnh:</p>
                            {description.image ? (
                                <div className="group relative w-80">
                                    <img
                                        src={description.image}
                                        alt={description.imageCaption}
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
                                    ref={(el) => (fileInputRef.current[descIndex] = el)}
                                />
                            )}
                        </div>
                        <InputField
                            label="Tên hình ảnh"
                            type="text"
                            value={description.imageCaption}
                            onChange={(e) => handleInputChange(descIndex, 'imageCaption', e.target.value)}
                        />

                        <div className="mt-4">
                            <p className="font-bold">Sự kiện:</p>
                            {description.events.map((event, eventIndex) => (
                                <div key={eventIndex} className="mb-2 rounded border p-2">
                                    <div className="flex">
                                        <div className="w-[90%]">
                                            <InputField
                                                label="Thời gian"
                                                type="text"
                                                value={event.time}
                                                onChange={(e) =>
                                                    handleEventChange(descIndex, eventIndex, 'time', e.target.value)
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
                                className="flex items-center gap-2 rounded-md border border-blueButton p-2"
                                onClick={() => handleAddEvent(descIndex)}
                            >
                                <CirclePlus className="text-blueButton" /> <p className="">Thêm sự kiện</p>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="mt-4 flex gap-5">
                    <button
                        className="flex items-center gap-2 rounded-md border border-blueButton p-2"
                        onClick={handleAddDescription}
                    >
                        <CirclePlus className="text-blueButton" /> <p className="">Thêm mô tả</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminTourAddDescriptionPage;
