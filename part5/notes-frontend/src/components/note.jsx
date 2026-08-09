import { useNavigate, useParams } from 'react-router-dom'

export default function Note({ note, toggleImportance, deleteNote }) {
  const { id } = useParams()
  const navigate = useNavigate()

  if (!note) return null

  const label = note.important ? 'make not important' : 'make important'

  const handleDelete = () => {
    const isConfirm = window.confirm(`Delete note "${note.content}"? `)
    if (isConfirm) {
      deleteNote(id)
      navigate('/notes')
    }
  }

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button type='button' onClick={() => toggleImportance(id)}>
        {label}
      </button>
      <button type='button' onClick={handleDelete}>
        delete
      </button>
    </li>
  )
}
