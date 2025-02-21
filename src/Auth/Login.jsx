import React, { useEffect, useState } from "react";
import { MdOutlineVpnKey } from "react-icons/md";
import { RxEnvelopeOpen, RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import {
  setUserRole,
  setUserAuthApproved,
  setuserToken,
  setUserName,
  clearAuthToken,
  setFcmTokenSent,
  setUserID,
} from "../Redux-Toolkit/AuthSlice";
import { postLogin } from "../ApiMethods/Api";
import { setlocaluserToken } from "../Redux-Toolkit/NewUserPasswordChangeSlice";

const Login = ({dataTestId}) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const previousLocation = React.useRef(location);
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUserRole, setLoggedUserRole] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fcmTokengenerated, setFcmTokengenerated] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);

  const notificationPermission =
    useSelector((state) => state?.notifications?.notificationPermission) ||
    false;
  const isUserAuthenticated =
    useSelector((state) => state?.auth?.userAuthApproved) || false;
  const userFcmToken = useSelector((state) => state?.auth?.fcmToken) || null;

  /**
   * This function calls the requestNotificationPermission function to request the user for notification permission
   * Also calls the generateFcmToken function to generate the FCM token taking device_id and fcm_key from local storage
   */

  useEffect(() => {
    dispatch(setlocaluserToken(null));
    if (isUserAuthenticated) {
      navigate("/");
    }
  }, []);

  /**
   * Method to call login api with body
   * @param {string} email
   * @param {string} password
   * It checks if the user is first time or not, absed on that it routes and dispatches data in redux Auth
   */

  const loginAdmin = async (email, password) => {
    userFcmToken
      ? dispatch(setFcmTokenSent(true))
      : dispatch(setFcmTokenSent(false));
    const loginBody = {
      username: email,
      password: password,
      userFcmToken: userFcmToken || "",
      userDeviceID: localStorage.getItem("device_id") || "",
    };

    try {
      setLoginLoading(false);
      const response = await postLogin("/login", loginBody);
      if (response?.data?.status === false) {
        toast.error("Invalid credentials. Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        if (response?.data?.data?.isFcmUpdated === 0) {
          dispatch(setFcmTokenSent(false));
        }
        if (response?.data?.data?.isFirstTimeUser === 0) {
          localStorage.setItem("isFirstTimeUser", false);
          toast.success("Welcome!", {
            position: toast.POSITION.TOP_CENTER,
          });

          /**
           * @param {String} Token
           * Decode the token and get the role
           */

          tokenDecode(response?.data?.data?.authToken);
          navigate("/");
        } else if (response?.data?.data?.isFirstTimeUser === 1) {
          dispatch(setlocaluserToken(response?.data?.data?.authToken));
          navigate("/reset-password");
        }
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (signInClicked && !notificationPermission) {
      signInLoader();
    } else if (signInClicked && notificationPermission) {
      signInLoader();
    }
  }, [signInClicked, fcmTokengenerated, notificationPermission]);

  const signInLoader = () => {
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setSignInClicked(false);
      loginAdmin(email, password);
    }, 3000);
  };

  /**
   * **Get the token from response and Decode the token**
   * * **check the token expired or not**
   * * **Set the user role in redux**
   * @param {authToken} authToken
   */

  const tokenDecode = async (authToken) => {
    dispatch(setuserToken(authToken));

    /**
     * Decode the token
     */
    const decodedToken = jwtDecode(authToken);

    /*
     * replace 'role' with the actual key in your token
     */
    const role = decodedToken?.role;
    const userID = decodedToken?.UserID;
    dispatch(setUserID(userID));
    dispatch(setUserRole(role));
    setLoggedUserRole(role);

    /**
     * check if token is expired
     */
    const tokenExpired = await isTokenExpired(authToken);
    if (tokenExpired) {
      dispatch(setUserAuthApproved(false));
    } else if (!tokenExpired) {
      dispatch(setUserAuthApproved(true));
      dispatch(setUserName(decodedToken?.name));
    }
  };

  /**
   * **Check if token is expired to set isUserAuthApproved**
   * @param {string} token
   */

  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
      return true; // If the token can't be decoded, it's not valid
    }

    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentUnixTimestamp;
  }

  useEffect(() => {
    if (loggedUserRole) {
      dispatch(setUserRole(loggedUserRole));
    }
  }, [loggedUserRole]);

  return (
    <div
      className="flex justify-center items-center w-full h-screen md:py-0 py-5 bg-no-repeat bg-fixed object-cover object-top"
    >
      <div className=" grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 bg-[#f7f7f7] shadow-lg rounded-xl 2xl:w-6/12 lg:w-7/12 md:w-9/12 w-11/12 overflow-hidden">
        <div className="p-5 lg:col-span-3">
          <p className=" text-lg font-semibold"> Sign In to Your Account</p>
          <div className="mt-5">
            <form
              onSubmit={(e) => {
                setSignInClicked(true);
                e.preventDefault();
              }}
            >
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text font-semibold">
                    Your Email/User ID
                  </span>
                </label>
                <div className="input-group">
                  <span className=" bg-[#000]">
                    <RxEnvelopeOpen className=" text-[#63b0e0]" />
                  </span>
                  <input
                    id="emailid"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    className="input w-full border-[#000] focus:outline-none"
                  />
                </div>
              </div>
              <div className="form-control mt-2">
                  <span className="label-text font-semibold mb-2">
                    Your Password
                  </span>
                <label className="input-group">
                  <span className=" bg-[#000]">
                    <MdOutlineVpnKey className=" text-[#63b0e0]" />
                  </span>
                  <input
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    className="input w-full border-[#000] focus:outline-none border-r-0"
                  />

                  <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"} // Accessible label for screen readers
                      className="bg-transparent cursor-pointer border-[#000] border border-l-0"
                      onClick={() => setShowPassword(!showPassword)}
                      data-testid={`${dataTestId}-newPassword`}
                    >
                      {showPassword ? (
                        <RxEyeOpen className="text-[#000] mr-3 ml-3" />
                      ) : (
                        <RxEyeClosed className="text-[#000] mr-3 ml-3" />
                      )}
                    </button>

                </label>
              </div>
              <label className="label flex justify-center space-x-1 mt-5 ">
                <Link
                  onClick={(e) => setRememberMe(!rememberMe)}
                  to="/forgot-password"
                >
                  <p className="text-[#63b0e0] hover:underline">
                    Forgot password?
                  </p>
                </Link>
              </label>
              <div className="flex justify-center">
                {!loginLoading ? (
                  <button
                    type="submit"
                    name="Sign In"
                    className="mt-5 btn w-[50%] bg-[#63b0e0] hover:bg-[#000] text-[#000] hover:text-[#63b0e0] font-semibold border-none"
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mt-5 btn w-full bg-[#000] hover:bg-[#000] text-[#63b0e0] hover:text-[#63b0e0] font-semibold border-none flex justify-center items-center gap-4"
                  >
                    <svg
                      className="animate-spin mr-1 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
