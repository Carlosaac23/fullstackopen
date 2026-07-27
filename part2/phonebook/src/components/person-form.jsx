export default function PersonForm({
  onSubmit,
  newName,
  newPhone,
  handleNameOnChange,
  handlePhoneOnChange,
}) {
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameOnChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneOnChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}
