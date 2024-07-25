import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../Components/InputField';
import { CirclePlus, CircleX } from 'lucide-react';
import { useTheme } from '../../../Layouts/ThemeProvider';
import { useTitle } from '../../../Components/useTitle';
function AdminTourAddIntroPage() {
    useTitle('Thêm lịch trình');
    const { darkMode, url } = useTheme();

    const [intro, setIntro] = useState([{ image: '', title: '', description: '', highlights: [], imageCaption: '' }]);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const handleAddIntro = () => {
        setIntro((prevIntro) => [
            ...prevIntro,
            { image: '', title: '', description: '', highlights: [], imageCaption: '' },
        ]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedIntros = [...intro];
        updatedIntros[index][field] = value;
        setIntro(updatedIntros);
    };

    const handleHighlightChange = (introIndex, highlightIndex, value) => {
        const updatedIntros = [...intro];
        updatedIntros[introIndex].highlights[highlightIndex] = value;
        setIntro(updatedIntros);
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

    const handleAddHighlight = (introIndex) => {
        const updatedIntros = [...intro];
        updatedIntros[introIndex].highlights.push('');
        setIntro(updatedIntros);
    };

    const handleDeleteIntro = (index) => {
        const updatedIntros = intro.filter((_, i) => i !== index);
        setIntro(updatedIntros);
    };

    const handleDeleteHighlight = (introIndex, highlightIndex) => {
        const updatedIntros = [...intro];
        updatedIntros[introIndex].highlights = updatedIntros[introIndex].highlights.filter(
            (_, i) => i !== highlightIndex,
        );
        setIntro(updatedIntros);
    };

    const handleSave = () => {
        setIsSaving(true);
        axios
            .post(`${url}/tourIntroductions`, { intro })
            .then((response) => {
                setIsSaving(false);
                navigate(`/admin/adminTourAdd`, { state: { idIntro: response.data.id } });
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsSaving(false);
            });
    };

    return (
        <div>
            <div className="text-2xl">Thêm giới thiệu</div>
            <div>
                {intro.map((introItem, introIndex) => (
                    <div key={introIndex}>
                        <InputField
                            label="Tiêu đề"
                            type="text"
                            value={introItem.title}
                            onChange={(e) => handleInputChange(introIndex, 'title', e.target.value)}
                        />

                        <div>
                            <p className="font-bold">Hình ảnh:</p>
                            {introItem.image ? (
                                <div className="group relative w-80">
                                    <img
                                        src={introItem.image}
                                        alt={introItem.imageCaption}
                                        className="h-80 w-80 cursor-pointer rounded-md"
                                        onClick={() => handleImageClick(introIndex)}
                                    />
                                    <div className="absolute inset-0 flex h-80 max-w-80 cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                        <p className="font-bold text-white">Sửa ảnh</p>
                                    </div>
                                </div>
                            ) : (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(introIndex, e)}
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={(el) => (fileInputRefs.current[introIndex] = el)}
                                onChange={(e) => handleImageChange(introIndex, e)}
                            />
                        </div>
                        <InputField
                            label="Tên hình ảnh"
                            type="text"
                            value={introItem.imageCaption}
                            onChange={(e) => handleInputChange(introIndex, 'imageCaption', e.target.value)}
                        />

                        <InputField
                            label="Mô tả"
                            type="text"
                            value={introItem.description}
                            onChange={(e) => handleInputChange(introIndex, 'description', e.target.value)}
                        />

                        <div className="mt-4">
                            <p className="font-bold">Điểm nổi bật:</p>
                            {introItem.highlights?.map((highlight, highlightIndex) => (
                                <div key={highlightIndex} className="mb-2 rounded border p-2">
                                    <div className="flex items-center">
                                        <div className="w-[90%]">
                                            <InputField
                                                label={`Điểm nổi bật ${highlightIndex + 1}`}
                                                type="text"
                                                value={highlight}
                                                onChange={(e) =>
                                                    handleHighlightChange(introIndex, highlightIndex, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="flex w-[10%] items-center justify-center">
                                            <button
                                                className="mt-2 flex items-center gap-2 rounded-md border border-red p-2"
                                                onClick={() => handleDeleteHighlight(introIndex, highlightIndex)}
                                            >
                                                <CircleX className="text-red" /> <p className="text-red">Xóa</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                className="mt-2 flex items-center gap-2 rounded-md border border-blueButton p-2"
                                onClick={() => handleAddHighlight(introIndex)}
                            >
                                <CirclePlus className="text-blueButton" /> <p className="">Thêm điểm nổi bật</p>
                            </button>
                        </div>

                        <div className="mt-4 flex gap-5">
                            <button
                                className="flex items-center gap-2 rounded-md border border-red p-2"
                                onClick={() => handleDeleteIntro(introIndex)}
                            >
                                <CircleX className="text-red" /> <p className="text-red">Xóa</p>
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    className="mt-4 flex items-center gap-2 rounded-md border border-blueButton p-2"
                    onClick={handleAddIntro}
                >
                    <CirclePlus className="text-blueButton" /> <p className="">Thêm giới thiệu</p>
                </button>
                <button
                    className="border-green-500 mt-4 flex items-center gap-2 rounded-md border p-2"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    <CirclePlus className="text-green-500" /> <p className="">{isSaving ? 'Saving...' : 'Lưu'}</p>
                </button>
            </div>
        </div>
    );
}

export default AdminTourAddIntroPage;
