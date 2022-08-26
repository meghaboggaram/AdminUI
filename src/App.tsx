import { useCallback, useEffect, useState } from "react";
import AdminRow, { User } from "./AdminRow";
import HeaderRow from "./HeaderRow";
import {
  AiOutlineSearch,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight
} from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./styles.css";

type PageNumber = {
  totalPages: number;
  curPage: number;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState<PageNumber>({ totalPages: 1, curPage: 1 });
  function setUser(id: string, user?: User) {
    let newUsers = users.filter((val) => val.id !== id);

    if (user) {
      setUsers([...newUsers, user]);
    } else {
      setUsers(newUsers);
    }
  }

  function editSelected(id: string, val: boolean) {
    if (val) {
      setSelected((curVal) => [...curVal, id]);
    } else {
      setSelected((curVal) => curVal.filter((item) => item !== id));
    }
  }

  function toggleSelection(val: boolean) {
    if (val) {
      setSelected(
        filteredUsers
          .map((user) => user.id)
          .filter(
            (_, index) =>
              index >= (page.curPage - 1) * 10 && index < page.curPage * 10
          )
      );
    } else {
      setSelected([]);
    }
  }

  const deleteSelected = useCallback(() => {
    setUsers((curUsers) =>
      curUsers.filter((user) => !selected.includes(user.id))
    );
  }, [selected]);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    if (searchText) {
      const result = users.filter((user) => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        const role = user.role.toLowerCase();
        const searchTerm = searchText.toLowerCase().trim();
        return (
          name.includes(searchTerm) ||
          email.includes(searchTerm) ||
          role.includes(searchTerm)
        );
      });
      setFilteredUsers(result);
    } else setFilteredUsers(users);
  }, [searchText, users]);

  useEffect(() => {
    let newPage: PageNumber = {
      totalPages: Math.ceil(filteredUsers.length / 10),
      curPage: 1
    };
    setPage(newPage);
  }, [filteredUsers]);

  const changePage = (pageNum: number) => {
    setPage((page) => ({ ...page, curPage: pageNum }));
  };

  return (
    <div className="App">
      <h1>Admin UI</h1>
      <div className="Search-bar" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <AiOutlineSearch />
      </div>
      <div>
        <HeaderRow
          selected={filteredUsers
            .filter(
              (_, index) =>
                index >= (page.curPage - 1) * 10 && index < page.curPage * 10
            )
            .every((user) => selected.includes(user.id))}
          toggleSelection={toggleSelection}
        />
      </div>
      {filteredUsers
        .sort((a, b) => +a.id - +b.id)
        .slice((page.curPage - 1) * 10, page.curPage * 10)
        .map((user) => (
          <div key={user.id}>
            <AdminRow
              user={user}
              setUser={setUser}
              selected={selected.indexOf(user.id) > -1}
              setSelected={editSelected}
            />
          </div>
        ))}
      <div
        className="Footer"
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "25% 75%"
        }}
      >
        <div>
          <button onClick={deleteSelected} disabled={selected.length < 1}>
            Delete
          </button>
        </div>
        <div className="Page-number-list" style={{ display: "flex" }}>
          <button className="Page-number" onClick={() => changePage(1)}>
            <AiOutlineDoubleLeft />
          </button>
          <button
            className={`Page-number ${
              page.curPage === 1 ? "Disabled-page" : ""
            }`}
            onClick={() => changePage(page.curPage - 1)}
            disabled={page.curPage === 1}
          >
            <IoIosArrowBack />
          </button>
          {new Array(page.totalPages).fill(0).map((_, index) => (
            <button
              className={`Page-number ${
                page.curPage === index + 1 ? "Current-page" : ""
              }`}
              onClick={() => changePage(index + 1)}
            >
              <p style={{ margin: "auto" }}>{index + 1}</p>
            </button>
          ))}
          <button
            className={`Page-number ${
              page.curPage === page.totalPages ? "Disabled-page" : ""
            }`}
            onClick={() => changePage(page.curPage + 1)}
            disabled={page.curPage === page.totalPages}
          >
            <IoIosArrowForward />
          </button>
          <button className="Page-number">
            <AiOutlineDoubleRight onClick={() => changePage(page.totalPages)} />
          </button>
        </div>
      </div>
    </div>
  );
}
