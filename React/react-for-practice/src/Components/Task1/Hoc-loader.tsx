import React, { FC, useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import axios from "axios";

const withLoadingIndicator = (WrappedComponent: any) => {
  return () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dataFromRequest, setDataFromRequest] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios("https://swapi.dev/api/people/?page=1");
          setDataFromRequest(response.data.results)
        } catch (error) {
          console.error("error from one task", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);
    return <>{isLoading ? <Grid /> : <WrappedComponent data={dataFromRequest} />}</>;
  };
};

export default withLoadingIndicator;
