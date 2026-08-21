import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { EDIT_NUMBER } from "../queries";

export default function PhoneForm({ setError }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber] = useMutation(EDIT_NUMBER, {
    onCompleted: (data) => {
      if (!data.editNumber) {
        setError("person not found");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Change phone number</h2>

      <form onSubmit={handleSubmit}>
        <div>
          name{" "}
          <input value={name} onChange={({ target }) => setName(target.value)} data-1p-ignore />
        </div>
        <div>
          phone{" "}
          <input value={phone} onChange={({ target }) => setPhone(target.value)} data-1p-ignore />
        </div>

        <button type="submit">Change number</button>
      </form>
    </div>
  );
}
