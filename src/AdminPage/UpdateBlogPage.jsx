import { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, message, DatePicker } from 'antd'
import useAxiosSecure from '../Components/Hook/useAxiosSecure'
import moment from 'moment'

function UpdateBlogPage () {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [form] = Form.useForm()
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosSecure.get('/blogs')
        setBlogs(response.data)
      } catch (err) {
        setError('Error fetching blogs', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const showModal = blog => {
    setSelectedBlog(blog)
    form.setFieldsValue({
      author: blog.author,
      title: blog.title,
      image: blog.image,
      readTime: blog.readTime,
      publishDate: moment(blog.publishDate),
      content: blog.content
    })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedBlog(null)
  }

  const handleSubmit = async values => {
    try {
      const updatedData = {
        ...values,
        publishDate: values.publishDate
          ? values.publishDate.format('YYYY-MM-DD')
          : ''
      }

      await axiosSecure.put(`/blogs/${selectedBlog._id}`, updatedData)
      message.success('Blog updated successfully')
      setIsModalVisible(false)
      setSelectedBlog(null)
      const response = await axiosSecure.get('/blogs')
      setBlogs(response.data)
    } catch (err) {
      message.error('Error updating blog')
    }
  }

  if (loading) {
    return <div>Loading blogs...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      {blogs.map(blog => (
        <div
          key={blog._id}
          className='bg-white flex items-start gap-2 md:items-center flex-col md:flex-row mt-3 justify-between p-4 rounded-lg border-2'
        >
          <div>
            <img
              src={blog.image}
              alt={blog.title}
              className='w-12 h-12 object-cover rounded-md mb-4'
            />
            <h2>{blog.title}</h2>
          </div>
          <button onClick={() => showModal(blog)} className='btn btn-sm'>
            Update
          </button>
        </div>
      ))}

      <Modal
        title='Update Blog'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} initialValues={selectedBlog}>
          <Form.Item
            label='Author'
            name='author'
            rules={[
              { required: true, message: 'Please input the blog author!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Title'
            name='title'
            rules={[
              { required: true, message: 'Please input the blog title!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Image URL'
            name='image'
            rules={[
              { required: true, message: 'Please input the blog image URL!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Read Time'
            name='readTime'
            rules={[{ required: true, message: 'Please input the read time!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Publish Date'
            name='publishDate'
            rules={[
              { required: true, message: 'Please select the publish date!' }
            ]}
          >
            <DatePicker format='YYYY-MM-DD' />
          </Form.Item>

          <Form.Item
            label='Content'
            name='content'
            rules={[
              { required: true, message: 'Please input the blog content!' }
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Update Blog
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UpdateBlogPage
