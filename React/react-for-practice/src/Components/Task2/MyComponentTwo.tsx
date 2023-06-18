import React from "react";
import LoadingIndicatorWithReq from "./Hoc-loader-fetch";

export const fetchUsers = (): Promise<Users[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, name: "Kostya", email: "kostya@itrum.com" },
          { id: 2, name: "Anya", email: "anya@itrum.com" },
          { id: 3, name: "Alina", email: "alina@itrum.com" },
          { id: 4, name: "Timur", email: "timur@itrum.com" },
          { id: 5, name: "Diana", email: "diana@itrum.com" },
          { id: 6, name: "Olga", email: "olga@itrum.com" },
          { id: 7, name: "Roman", email: "roman@itrum.com" },
        ]),
      2000
    )
  );

interface Users {
  id: number;
  name: string;
  email: string;
}

interface Props {
  data: Users[];
}

const MyComponentTwo: React.FC<Props> = ({ data }) => {
  
  if (!data) {
    return null;
  }

  return (
    <div
      className="containerWithContent"
      style={{
        width: "30vw",
        height: "30vh",
        background: "azure",
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto"
      }}
    >
      <div style={{ width: "20vw" }}>
        <ul>
          {data.map((user: Users) => (
            <li key={user.id}>
              name: {user.name} - email: {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const UserListWithLoading = LoadingIndicatorWithReq(
  MyComponentTwo,
  fetchUsers
);
