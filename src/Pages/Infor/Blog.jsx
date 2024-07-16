import { Link } from 'react-router-dom';
import { dataBlog } from '../../Components/data';

function BlogPage() {
    const ItemBlogs = ({ image, id, title, category, author, createdAt }) => {
        return (
            <div
                style={{
                    backgroundImage: `url('${image}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'darken',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
                className="min-h-[400px] w-full rounded-2xl"
            >
                <div className="flex text-white">
                    <div className="mt-[60%]">
                        <Link to={`/blog/details/${id}`}>
                            <div className="px-5 hover:text-white hover:opacity-80">
                                <p className="font-bold">{category}</p>
                                <p className="flex h-20 items-center text-xl font-medium">{title}</p>
                                <div className="flex gap-4">
                                    <p className="text-base">{author}</p>
                                    <p className="text-base">{createdAt}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div>
            <div className="container-tour">
                <div className="mx-auto flex h-[500px] max-w-[1200px] items-end justify-center">
                    <h3 className="text-5xl font-bold text-white">Blog</h3>
                </div>
            </div>

            <div className="mx-auto mt-10 max-w-[1200px]">
                <div className="my-4 text-center text-4xl">Trải nghiệm siêu chất</div>
                <div className="grid grid-cols-3 gap-20">
                    {dataBlog.map((data) => (
                        <ItemBlogs
                            key={data.id}
                            image={data.image}
                            id={data.id}
                            title={data.title}
                            category={data.category}
                            author={data.author}
                            createdAt={data.createdAt}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogPage;
