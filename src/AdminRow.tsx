import { ChangeEvent, useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import "./styles.css";

export type User = {
  id: string;
  name: string;
  role: string;
  email: string;
};

type AdminRowProps = {
  user: User;
  setUser: (id: string, user?: User) => void;
  selected: boolean;
  setSelected: (id: string, val: boolean) => void;
};

const AdminRow = (props: AdminRowProps) => {
  const { user, setUser, selected, setSelected } = props;
  const { id, name, email, role } = user;
  const [editable, setEditable] = useState(false);
  return (
    <div className={`Admin-row ${selected ? "Admin-row-selected" : ""}`}>
      <input
        type="checkbox"
        value={id}
        checked={selected}
        onClick={() => setSelected(id, !selected)}
        style={{ flex: 1 }}
      />
      <input
        type="text"
        value={name}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUser(id, { ...user, name: event.target.value })
        }
        disabled={!editable}
        style={{ flex: 1 }}
      />
      <input
        type="text"
        value={email}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUser(id, { ...user, email: event.target.value })
        }
        disabled={!editable}
        style={{ flex: 1 }}
      />
      <input
        type="text"
        value={role}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUser(id, { ...user, role: event.target.value })
        }
        disabled={!editable}
        style={{ flex: 1 }}
      />
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setEditable((val) => !val)}
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          <p>{editable ? <FiSave /> : <FiEdit />}</p>
        </button>
        <button
          onClick={() => setUser(id, undefined)}
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          <p>
            <MdDeleteOutline color="red" />
          </p>
        </button>
      </div>
    </div>
  );
};
export default AdminRow;
