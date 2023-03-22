import React from "react"

export default function LogoutModal({ setModal, handleLogout }) {
  return (
    <div className=" flex-col space-y-4 min-w-screen h-screen animated fadeIn  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none  ">
      <div className="flex flex-col p-8 bg-gray-800 shadow-md hover:shodow-lg rounded-2xl ">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 rounded-2xl p-3 border border-gray-800 text-blue-400 bg-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="flex flex-col ml-3">
              <div className="font-medium leading-none text-gray-100">
                Are you Sure to Logout ?
              </div>
              <p className="text-sm text-gray-500 leading-none mt-1">
                Your current session will be destroyed!
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div>
            <button
              className="flex-no-shrink  text-center bg-green-500  ml-4 py-2 px-4 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-500 text-white rounded-full"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
            <button
              className="flex-no-shrink  bg-red-500  text-center  ml-4 py-2 px-4 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
