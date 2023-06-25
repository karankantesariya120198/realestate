import React, { useState, useMemo } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PageviewIcon from '@material-ui/icons/Pageview';

const useSortableData = (users, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { users: sortedUsers, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
  const { users, requestSort, sortConfig } = useSortableData(props.users);
  const { viewUser, editUser, deleteUser } = props;
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  let updateUsers = users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key]
        .toString()
        .toLowerCase()
    );
  });

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("name")}
                  className={getClassNamesFor("name")}
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("real_state_type")}
                  className={getClassNamesFor("real_state_type")}
                >
                  Type
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("city")}
                  className={getClassNamesFor("city")}
                >
                  City
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("country")}
                  className={getClassNamesFor("country")}
                >
                  Country
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updateUsers.length > 0 ? (
              updateUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.real_state_type}</td>
                  <td>{user.city}</td>
                  <td>{user.country}</td>
                  <td>
                    <IconButton
                      aria-label="view"
                      onClick={() => {
                        viewUser(user);
                      }}
                    >
                      <PageviewIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        editUser(user);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Users</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DirectoryTable;
