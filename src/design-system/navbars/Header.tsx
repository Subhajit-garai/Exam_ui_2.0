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

type api_responce_type = {
  success: boolean;
  message: string;
  data?: any;
};

export const Header = ({
  LogoUrl,
  BrandName,
  userLogoutFn,
}: {
  LogoUrl: string;
  BrandName: string;
  userLogoutFn?: () => Promise<api_responce_type>;
}) => {
  let { islogin } = useAppSelector((state) => state.user);

  return (
    <nav className=" header  top-0 right-0 left-0  border-b border-white/10 h-[5rem] max-w-full z-[8]">
      <div className="  flex  gap-2 md:gap-4 items-center justify-between p-2 md:mx-20 h-full  ">
        <div className="h-fit  flex ">
          <Logo url={LogoUrl} userLogoutFn={userLogoutFn}/>

          <p className=" self  text-primary md:whitespace-nowrap  md:text-xl font-semibold  ">
            {BrandName}
          </p>
        </div>

        <div className="button_section flex h-fit gap-1 md:gap-4 ">
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
  url,
  userLogoutFn,
}: {
  url: string;
  userLogoutFn?: () => Promise<api_responce_type>;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let { islogin, name, email } = useAppSelector(
    (state) => state.user
  );

  const userLogout = async () => {
    if (islogin) {
      dispatch(logout());

      userLogoutFn &&
        userLogoutFn()
          .then((data) => {
            data.success
              ? (toast.success(data.message, ToastConfig()),
                // persistor.purge(),
                console.log("removed  cached.."),
                navigate("/login"))
              : toast.info("processing", ToastConfig());
            window.location.reload();
          })
          .catch(() => toast.error("log out faild", ToastConfig()));
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
              className="block text-sm"
              onClick={() => navigate("/user/profile")}
            >
              {name}
            </span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={() => navigate("/home")}>
            home
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={() => navigate("/user/profile")}>
            Settings
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel onClick={userLogout}>Sign out</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
