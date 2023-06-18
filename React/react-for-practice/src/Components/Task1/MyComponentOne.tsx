import withLoadingIndicator from "./Hoc-loader";

interface Users {
  id: number;
  name: string;
  email: string;
}

interface Props {
  data: Users[];
}

const MyComponentOne: React.FC = ({ data }: any) => {
  console.log('data', data);
  
  if (!data) {
    return null;
  }

  return (
    <div
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
      <div style={{ width: "15vw" }}>
        <ul>
          {data.map((user: any) => (
            <li key={user.name}>
              {user.name} - mass: {user.mass}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withLoadingIndicator(MyComponentOne);
