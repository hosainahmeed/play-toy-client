import { useState, useEffect } from 'react';
import axios from 'axios';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blogs from the server
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs');
        setBlogs(response.data);
      } catch (err) {
        setError('Error fetching blogs',err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Blogs on Kids' Toys</h1>
      {blogs.length > 0 ? (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 mb-4">By {blog.author} | {blog.publishDate}</p>
              <p className="text-gray-800">{blog.content.substring(0, 150)}...</p>
              <a
                href={`/blog/${blog.id}`}
                className="text-blue-500 mt-4 inline-block"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available at the moment.</p>
      )}
    </div>
  );
};

export default BlogsPage;
