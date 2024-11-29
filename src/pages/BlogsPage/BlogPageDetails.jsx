import { useLocation } from 'react-router-dom';

const BlogPageDetails = () => {
  const location = useLocation();
  const data = location.state;
  const {
    author,
    content,
    image,
    publishDate,
    readTime,
    title,
    updatedAt,
    _id,
  } = data;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div
        key={_id}
        className="bg-white p-6 rounded-lg shadow-lg md:flex md:items-start md:space-x-6"
      >
        {/* Image Section */}
        <div className="w-full md:w-1/3">
          <img
            src={image}
            alt={title}
            className="w-full h-60 object-cover rounded-md mb-4 md:mb-0"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <div className="text-gray-600 text-sm mb-4">
            <p>
              <span className="font-semibold">By:</span> {author}
            </p>
            <p>
              <span className="font-semibold">Published:</span> {publishDate}
            </p>
            <p>
              <span className="font-semibold">Read Time:</span> {readTime} min
            </p>
            {updatedAt && (
              <p>
                <span className="font-semibold">Updated:</span> {updatedAt}
              </p>
            )}
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPageDetails;
