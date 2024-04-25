import { Outlet} from "react-router-dom";
import ButtonAppBar from "./ButtonAppBar";
import { Stack } from "@mui/material";

const NavBar = () => {
  return (
      <Stack spacing={8}>
        <ButtonAppBar ></ButtonAppBar>
          <Outlet />
      </Stack>
  )
};

export default NavBar;
