import { useNoteActions } from '../store';

export default function Filter() {
  const { setFilter } = useNoteActions();

  return (
    <div>
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('all')}
        defaultChecked
      />{' '}
      all
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('important')}
      />{' '}
      important
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('not-important')}
      />{' '}
      not important
    </div>
  );
}
