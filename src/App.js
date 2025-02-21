import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { clearAuthToken, setUserAuthApproved, setUserRole, setuserToken } from "./Redux-Toolkit/AuthSlice";

const toastConfig = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};  

function App() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAuthToken());
    dispatch(setUserAuthApproved(false));
    dispatch(setuserToken(""));
    dispatch(setUserRole(""));

    localStorage.removeItem("isFirstTimeUser");
    localStorage.removeItem("persist:auth");

    /**
     * Clear all intervals
     */
    navigate("/login");

    toast.error("Please login to continue", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  let lastError = null;
  let lastErrorTime = 0;

  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      // Default error message
      let errorMessage = "An unknown error occurred";
      const currentTime = new Date().getTime();

      // Ensure error object is defined
      if (error?.response) {
        /**
         * The request was made and the server responded with a status code outside of the range of 2xx
         */
        errorMessage =
          error?.response?.data?.message ||
          error?.response?.statusText ||
          errorMessage;

        // Check for 401 Unauthorized error
        if (error.response.status === 401) {
          logout();
          window.location.reload();
        }
      } else if (error?.request) {
        /**
         * The request was made but no response was received
         */
        errorMessage = "No response received from server";
      } else if (error?.message) {
        /**
         * Something happened in setting up the request that triggered an error
         */
        errorMessage = error?.message;
      }

      if (errorMessage !== lastError || currentTime - lastErrorTime > 1000) {
        // 1 second gap
        toast.error(error?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        lastError = errorMessage;
        lastErrorTime = currentTime;
      }
      // Construct an Error object for rejection
      return Promise.reject(new Error(errorMessage));
    }
  );

  // Function to handle visibility changes
  // const handleVisibilityChange = () => {
  //   if (document.visibilityState === "visible") {
  //     retrieveNotificationsAndDispatch();
  //   }
  // };

  // // Function to retrieve and handle notifications
  // const retrieveNotificationsAndDispatch = async () => {
  //   try {
  //     const notifications = await retrieveNotificationData();
  //     notifications.forEach(() => {
  //     });
  //     clearIndexedDBNotificationData();
  //   } catch (error) {
  //     console.error("Error retrieving notifications:", error);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  /**
   * retrieve the background notifications data from indexedDB
   */

  // function retrieveNotificationData() {
  //   return new Promise((resolve, reject) => {
  //     const request = indexedDB.open("notificationsDB", 1);

  //     request.onupgradeneeded = handleUpgradeNeeded;
  //     request.onsuccess = (event) => handleSuccess(event, resolve, reject);
  //     request.onerror = (event) => handleOpenError(event, reject);
  //   });
  // }

  // // Function to handle the upgrade of the database
  // function handleUpgradeNeeded(event) {
  //   const db = event.target.result;

  //   if (!db.objectStoreNames.contains("notifications")) {
  //     const objectStore = db.createObjectStore("notifications", {
  //       keyPath: "id",
  //       autoIncrement: true,
  //     });
  //     objectStore.createIndex("payload", "payload", { unique: false });
  //   }
  // }

  // // Function to handle successful database open and fetching of data
  // function handleSuccess(event, resolve, reject) {
  //   const db = event.target.result;
  //   const transaction = db.transaction(["notifications"], "readonly");
  //   const objectStore = transaction.objectStore("notifications");
  //   const request = objectStore.getAll();

  //   request.onsuccess = (event) => resolve(event.target.result);
  //   request.onerror = (event) => handleRetrieveError(event, reject);
  // }

  // // Function to handle errors when retrieving data
  // function handleRetrieveError(event, reject) {
  //   reject(`Error retrieving notification data: ${event.target.errorCode}`);
  // }

  // // Function to handle errors when opening the database
  // function handleOpenError(event, reject) {
  //   reject(`Error opening IndexedDB: ${event.target.errorCode}`);
  // }

  // function clearIndexedDBNotificationData() {
  //   const request = indexedDB.open("notificationsDB", 1);

  //   request.onupgradeneeded = (event) => {
  //     const db = event.target.result;

  //     if (!db.objectStoreNames.contains("notifications")) {
  //       const objectStore = db.createObjectStore("notifications", {
  //         keyPath: "id",
  //         autoIncrement: true,
  //       });
  //       objectStore.createIndex("payload", "payload", { unique: false });
  //     }
  //   };

  //   request.onsuccess = (event) => {
  //     const db = event.target.result;
  //     const transaction = db.transaction(["notifications"], "readwrite");
  //     const objectStore = transaction.objectStore("notifications");
  //     const clearRequest = objectStore.clear();

  //     clearRequest.onsuccess = () => {};

  //     clearRequest.onerror = (event) => {
  //       console.error("Error clearing IndexedDB:", event.target.errorCode);
  //     };
  //   };

  //   request.onerror = (event) => {
  //     console.error("Error opening IndexedDB:", event.target.errorCode);
  //   };
  // }

  return (
    <>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Login />} path="*" />
        </Routes>

      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
