import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, describe } from 'vitest'

import Blog from './blog'

describe('<Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Test title',
      author: 'John Doe',
      url: 'www.johndoe.com',
      likes: 10,
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Test title')
    expect(div).not.toHaveTextContent('John Doe')
    expect(div).not.toHaveTextContent('www.johndoe.com')
    expect(div).not.toHaveTextContent('likes')
  })

  test('url and number of likes are shown when clicking view button', async () => {
    const blog = {
      title: 'Test title',
      author: 'John Doe',
      url: 'www.johndoe.com',
      likes: 10,
      user: {
        username: 'johndoe',
      },
    }

    const userMock = { username: 'johndoe' }

    render(<Blog blog={blog} user={userMock} />)

    expect(screen.queryByText('www.johndoe.com')).toBeNull()
    expect(screen.queryByText(/likes/i)).toBeNull()

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    expect(screen.getByText('www.johndoe.com')).toBeInTheDocument()
    expect(screen.getByText(/likes/i)).toBeInTheDocument()
  })

  test('clicking two times "like" button', async () => {
    const blog = {
      title: 'Test title',
      author: 'John Doe',
      url: 'www.johndoe.com',
      likes: 10,
      user: {
        username: 'johndoe',
      },
    }

    const userMock = { username: 'johndoe' }
    const mockHandler = vi.fn()

    render(<Blog blog={blog} user={userMock} handleLikes={mockHandler} />)

    expect(screen.queryByText('Like')).toBeNull()

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    expect(screen.getByText('Like')).toBeInTheDocument()

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
