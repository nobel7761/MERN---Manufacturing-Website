import React, { useState } from "react";
import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../../Hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const Dashboard = () => {
  const [user] = useAuthState(auth)
  const [admin] = useAdmin(user)


  return (
    <div className="container">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <h2 className="text-3xl text-center font-extrabold border-b-4 border-black">
            DASHBOARD
          </h2>
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content sidebar">
            {/* <!-- Sidebar content here --> */}

            {admin ?
              <>
                <li>
                  <Link to="/dashboard">
                    <button className="btn bg-[#F97316] text-white border-0 hover:bg-black hover:text-[#F97316] w-full">My Profile</button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-all-orders">
                    <button className="btn bg-[#F97316] text-white border-0 hover:bg-black hover:text-[#F97316] w-full">
                      Manage All Orders
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-new-product">
                    <button className="btn bg-[#F97316] text-white border-0 hover:bg-black hover:text-[#F97316] w-full">
                      Add New Product
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/make-new-admin">
                    <button className="btn bg-[#F97316] text-white border-0 hover:bg-black hover:text-[#F97316] w-full">
                      Make New Admin
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-products">
                    <button className="btn bg-[#F97316] text-white border-0 hover:bg-black hover:text-[#F97316] w-full">
                      Manage Products
                    </button>
                  </Link>
                </li>

              </>

              :

              <>
                <li>
                  <Link to="/dashboard">
                    <button className="btn bg-[#F97316] text-white border-0 hover:bg-black hover:text-[#F97316] w-full">My Profile</button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-orders">
                    <button className="btn bg-[#F97316] text-white border-0 hover:bg-black hover:text-[#F97316] w-full">My Orders</button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-review">
                    <button className="btn bg-[#F97316] text-white border-0 hover:bg-black hover:text-[#F97316] w-full">Add Review</button>
                  </Link>
                </li>
              </>

            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
