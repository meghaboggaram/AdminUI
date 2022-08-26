import React from "react";

type HeaderRowProps = {
  selected: boolean;
  toggleSelection: (val: boolean) => void;
};

const HeaderRow = (props: HeaderRowProps) => {
  const { selected, toggleSelection } = props;
  return (
    <div className="Admin-row">
      <input
        type="checkbox"
        value="all"
        checked={selected}
        style={{ flex: 1 }}
        onChange={() => toggleSelection(!selected)}
      />
      <input
        disabled={false}
        value="Name"
        style={{ flex: 1, border: "none", fontWeight: "bold" }}
      />
      <input
        disabled={false}
        value="Email"
        style={{ flex: 1, border: "none", fontWeight: "bold" }}
      />
      <input
        disabled={false}
        value="Role"
        style={{ flex: 1, border: "none", fontWeight: "bold" }}
      />
      <input
        disabled={false}
        value="Actions"
        style={{ flex: 1, border: "none", fontWeight: "bold" }}
      />
    </div>
  );
};
export default HeaderRow;
