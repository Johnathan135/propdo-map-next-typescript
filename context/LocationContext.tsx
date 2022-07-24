import { createContext, useState } from "react";
import { DefaultValues } from "../types/location.types";
import { Props } from "../types/common.types";

const locationDefaultValues: DefaultValues = {
  location: { lat: 32.08709336675098, lng: 34.819433767338296 },
  setLocation: () => {},
};

const DataContext = createContext<DefaultValues>(locationDefaultValues);

export const DataProvider = ({ children }: Props) => {
  const [location, setLocation] = useState({
    lat: 32.08709336675098,
    lng: 34.819433767338296,
  });

  return (
    <DataContext.Provider
      value={{
        location,
        setLocation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
