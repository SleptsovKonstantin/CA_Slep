import React, { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  data: User[];
}

type FetchData = () => Promise<User[]>;

const LoadingIndicatorWithReq = (
  WrappedComponent: React.FC<Props>,
  fetchData: FetchData
): React.FC => {
  const WithLoading: React.FC = () => {
    const [dataFromRequest, setDataFromRequest] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      fetchData()
        .then((result: User[]) => {
          setDataFromRequest(result);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log("Fetch error:", e);
          setIsLoading(false);
        });
    }, []);

    return (
      <>
        {isLoading ? (
          <Grid />
        ) : (
          <>
            <WrappedComponent data={dataFromRequest} />
          </>
        )}
      </>
    );
  };

  return WithLoading;
};

export default LoadingIndicatorWithReq;
