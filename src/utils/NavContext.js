import { createContext, useContext } from "react";

export const NavContext = createContext({
  navPosition: "top",
  setNavPosition: () => { },
});

export const useNavContext = () => useContext(NavContext);
