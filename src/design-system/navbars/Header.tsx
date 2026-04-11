import { Avatar_one } from "@repo/design-system/avatar/avatar";
import { Button } from "@repo/ui/button";

import ThemeToggler from "../theme/ThemeToggler";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@repo/store/slice/userSlice";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
export const Header = ({
  LogoUrl,
  BrandName,
}: {
  LogoUrl: string;
  BrandName?: string;
}) => {
  let { islogin, academicProfile } = useAppSelector((state) => state.user);
  return (
    <nav className=" header  top-0 right-0 left-0  border-b border-[var(--header-border)] h-[5rem] max-w-full z-[8]">
      <div className="  flex  gap-2 md:gap-4 items-center justify-between p-2 md:mx-20 h-full  ">
        <div className="h-fit  flex ">
          <Logo url={LogoUrl} />

          <p className=" self md:whitespace-nowrap  md:text-xl font-semibold text-[var(--text-primary)]  ">
            {academicProfile?.exam ?? BrandName}
          </p>
        </div>

        <div className="button_section flex h-fit gap-1 md:gap-4 ">
          {/* <div className="currency">
            <Suspense fallback={<LoaderFive text="loading ..."/>}></Suspense>
          </div> */}
          <ThemeToggler />
          {!islogin && (
            <div className="flex gap-2">
              <NavLink to={"/signup"}>
                <Button className=" ">Sign up</Button>
              </NavLink>
              <NavLink to={"/login"}>
                <Button color="blue">Login</Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;

export const Logo = ({
  url
}: {
  url: string;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { api } = useApi()

  let { islogin, name, email } = useAppSelector(
    (state) => state.user
  );

  const userLogout = async () => {
    if (islogin) {
      dispatch(logout());
      let response = await api.user.userLogout()

      if (
        response.success
      ) {
        toast.success(response.message, ToastConfig());
        console.log("removed  cached.."),
          navigate("/login")
      } else {
        toast.info("processing", ToastConfig());
        window.location.reload();
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Avatar_one url={url} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <span
              className="block text-sm text-[var(--text-primary)] "
              onClick={() => navigate("/user/profile")}
            >
              {name}
            </span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={() => navigate("/home")}>
            Home
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={() => navigate("/user/profile")}>
            Profile
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={() => navigate("/user/balance")}>
            Balance
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={() => navigate("/user/activityhistory")}>
            Activity History
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={() => navigate("/user/validation")}>
            Validation
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel onClick={userLogout}>Sign out</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
