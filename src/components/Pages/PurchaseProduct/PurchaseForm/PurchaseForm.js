import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const PurchaseForm = ({ OrderQuantity, tool, Order }) => {
  const minimumOrder = tool?.min_quantity;
  const AvailableQuantity = tool?.available_quantity;
  const [user, loading, error] = useAuthState(auth);
  const [Error, setError] = useState("");
  const [Disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const user_name = user?.displayName;
  const user_email = user?.email;

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = user_name;
    const email = user_email;
    const orderQuantity = event.target.orderQuantity.value;
    const phone = event.target.number.value;
    const address = event.target.address.value;

    event.target.reset();

    if (orderQuantity < tool.min_quantity) {
      setError("You Can Not Purchase Less Than Minimum Order Quantity");
      setDisable(true);
      toast.error(`You Have To Purchase Minimum ${tool.min_quantity} Pieces!`);
    } else if (orderQuantity > tool.available_quantity) {
      setError("You Can Not Purchase More Than Available Products Quantity");
      setDisable(true);
      toast.error(
        `You Can Not Order More Than ${tool.available_quantity} Pieces!`
      );
    } else {
      const order = {
        productName: tool.name,
        username: name,
        email: email,
        orderQuantity: orderQuantity,
        phone: phone,
        address: address,
        totalBill: orderQuantity * tool.price,
        paymentStatus: "unpaid",
        shipmentCondition: null,
      };

      fetch("https://pure-atoll-42866.herokuapp.com/order-placing", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast("Order Placed Successfully!");
          navigate(`/dashboard/payment/${tool._id}`);
        });
    }

    console.log(name, email, orderQuantity, phone, address);
  };

  return (
    <div className="pb-20 flex justify-center">
      <div className="card bg-orange-500 shadow-xl w-4/6">
        <div className="card-body">
          <h2 className="text-center font-bold text-4xl">Order Details</h2>
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="form-control place-order-form">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={user?.displayName}
                  readOnly
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered "
                  value={user?.email}
                  readOnly
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered "
                  value={tool?.name}
                  readOnly
                  disabled
                />
              </div>

              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Order Quantity</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered "
                  placeholder="Your Quantity"
                  name="orderQuantity"
                  value={Order ? OrderQuantity : tool?.min_quantity}
                  required
                />
                <p className="text-white">{Error || error}</p>
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Contact Number</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered "
                  placeholder="Your Phone Number"
                  name="number"
                  required
                />
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Billing Address</span>
                </label>
                <textarea
                  type="textarea"
                  className="input input-bordered "
                  placeholder="Your Detail Address"
                  name="address"
                  required
                />
              </div>

              <div className="form-control  mt-4">

                <button
                  disabled={
                    OrderQuantity < minimumOrder ||
                      AvailableQuantity < OrderQuantity
                      ? true
                      : false
                  }
                  type="submit"
                  value="purchase"
                  className="btn btn-outline"
                >PURCHASE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
