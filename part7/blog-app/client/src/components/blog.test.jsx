import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, describe } from 'vitest'

import { updateBlogService, deleteBlogService } from '../services/blogs'
import Blog from './blog'

vi.mock('../services/blogs', () => ({
  updateBlogService: vi.fn(),
  deleteBlogService: vi.fn(),
}))

const blog = {
  id: 'abc',
  title: 'Test title',
  author: 'John Doe',
  url: 'www.johndoe.com',
  likes: 10,
  user: {
    username: 'johndoe',
  },
}

const userMock = { username: 'johndoe' }

const renderBlog = (props = {}) =>
  render(
    <MemoryRouter>
      <Blog blog={blog} user={userMock} setBlogs={vi.fn()} setNotification={vi.fn()} {...props} />
    </MemoryRouter>,
  )

describe('<Blog />', () => {
  test('renders blog title, author, url and likes', () => {
    const { container } = renderBlog()

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Test title')
    expect(div).toHaveTextContent('John Doe')
    expect(div).toHaveTextContent('www.johndoe.com')
    expect(div).toHaveTextContent('likes')
  })

  test('shows the like button only when a user is logged in', () => {
    renderBlog({ user: null })

    expect(screen.queryByText('Like')).toBeNull()
  })

  test('calls updateBlogService with the increased likes each time "like" is clicked', async () => {
    updateBlogService.mockResolvedValue({ ...blog, likes: 11 })

    renderBlog()

    const user = userEvent.setup()
    const likeButton = screen.getByText('Like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlogService).toHaveBeenCalledTimes(2)
    expect(updateBlogService).toHaveBeenNthCalledWith(
      1,
      'abc',
      expect.objectContaining({ likes: 11 }),
    )
    expect(updateBlogService).toHaveBeenNthCalledWith(
      2,
      'abc',
      expect.objectContaining({ likes: 11 }),
    )
  })

  test('shows the delete button only to the blog author', () => {
    renderBlog({ user: { username: 'someone-else' } })

    expect(screen.queryByText('Delete')).toBeNull()

    renderBlog()

    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  test('removes the blog from the list after confirming deletion', async () => {
    deleteBlogService.mockResolvedValue()

    const setBlogsMock = vi.fn()
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    renderBlog({ setBlogs: setBlogsMock })

    const user = userEvent.setup()
    await user.click(screen.getByText('Delete'))

    expect(deleteBlogService).toHaveBeenCalledWith('abc')

    const prevBlogs = [{ id: 'abc' }, { id: 'def' }]
    const updater = setBlogsMock.mock.calls[0][0]
    expect(typeof updater).toBe('function')
    expect(updater(prevBlogs)).toEqual([{ id: 'def' }])

    window.confirm.mockRestore()
  })
})
