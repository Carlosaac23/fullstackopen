import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, describe } from 'vitest'

import BlogForm from './blog-form'

describe('<BlogForm />', () => {
  test('creates a new blog', async () => {
    const newBlog = { title: 'new blog', author: '', url: 'www.test.com' }

    const handlerMock = vi.fn()

    const { container } = render(<BlogForm createBlog={handlerMock} />)

    const user = userEvent.setup()
    const titleInput = container.querySelector('#title')
    const urlInput = container.querySelector('#url')

    await user.type(titleInput, 'new blog')
    await user.type(urlInput, 'www.test.com')

    const addButton = screen.getByText('add')
    await user.click(addButton)

    expect(titleInput.value).toBe('')
    expect(urlInput.value).toBe('')

    expect(handlerMock).toHaveBeenCalledWith(newBlog)
  })
})
