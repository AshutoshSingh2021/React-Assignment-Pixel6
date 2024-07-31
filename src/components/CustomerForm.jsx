import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../store/customerSlice";
import { Link, useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [panValid, setPanValid] = useState(false);
  const [customer, setCustomer] = useState({
    id: Date.now(),
    pan: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    countryCode: "",
    addresses: [
      { addressLine1: "", addressLine2: "", postcode: "", state: "", city: "" },
    ],
  });

  /**
   * @param {*} e
   * setting the values in the customer
   * setting Pan Number in a seperate state to use it for validation
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });

    if (name === "pan") {
      setPanNumber(value);
    }

    /*
    // Alternative approach for front-end validation
      if (name === "pan") {
      const regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if (regpan.test(value)) {
        setPanNumber(value);
        setPanValid(true);
      }
    }
    */
  };

  /**
   *
   * @param {*} index
   * @param {*} e
   *
   * Setting the address in the customer
   * Setting up the postcode from the address for fetching city and state from the API
   */
  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const addresses = [...customer.addresses];
    addresses[index][name] = value;
    setCustomer({ ...customer, addresses });

    if (name === "postcode") {
      const newPostcode = [...postcode];
      newPostcode[index] = value;
      setPostcode(newPostcode);
    }
  };

  /**
   * @param {*} e
   *
   * Sending alert if the PAN is not valid
   * dispatching the customer to the redux store
   * making the fields empty
   * navigating to the customers list page
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!panValid) {
      alert("Please enter valid Pan Id!");
    }
    dispatch(addCustomer(customer));
    setCustomer({
      id: Date.now(),
      pan: "",
      fullName: "",
      email: "",
      mobileNumber: "",
      countryCode: "",
      addresses: [
        {
          addressLine1: "",
          addressLine2: "",
          postcode: "",
          state: "",
          city: "",
        },
      ],
    });
    setPanValid(false);
    navigate("/customers");
  };

  const [panNumber, setPanNumber] = useState(customer.pan);
  const [postcode, setPostcode] = useState(
    customer.addresses.map((address) => address.postcode)
  );

  /**
   * requesting the API ("https://lab.pixel6.co/api/verify-pan.php") for PAN validation
   * setting the state if the PAN is valid
   */
  const validatePan = async () => {
    try {
      const data = {
        panNumber: panNumber,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "https://lab.pixel6.co/api/verify-pan.php",
        data,
        config
      );
      setPanValid(response.data.isValid);
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  /**
   * requesting the API ("https://lab.pixel6.co/api/get-postcode-details.php") for fetching the city and state
   * setting the value of input field to the fetched city and state (only if the postcode field have some value)
   */
  const getPostcodeAddress = async () => {
    try {
      if (postcode.every((pc) => pc)) {
        const data = { postcode: postcode };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          "https://lab.pixel6.co/api/get-postcode-details.php",
          data,
          config
        );

        const { city, state } = response.data;
        const addresses = [...customer.addresses];
        addresses.forEach((address, index) => {
          if (address.postcode === postcode[index]) {
            address.city = city[0].name;
            address.state = state[0].name;
          }
        });
        setCustomer({ ...customer, addresses });
      }
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  useEffect(() => {
    validatePan();
  }, [customer.pan]);

  useEffect(() => {
    getPostcodeAddress();
  }, [postcode]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">
          Customer CRUD Application
        </h1>
        <Link to="/customers">
          <span className="material-symbols-outlined cursor-pointer mt-3">
            arrow_circle_right
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            PAN:
          </label>
          <input
            type="text"
            name="pan"
            value={customer.pan}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              panValid ? "border-lime-600" : "border-red-600"
            }`}
            required
            maxLength={10}
          />
          {panValid ? (
            ""
          ) : (
            <span className="text-red-600 text-xs">Enter valid Pan Id</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={customer.fullName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            maxLength={140}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          maxLength={255}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Mobile Number:
        </label>
        <div className="flex">
          <input
            type="text"
            name="countryCode"
            value={customer.countryCode || "+91"}
            onChange={handleChange}
            className="shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="text"
            name="mobileNumber"
            value={customer.mobileNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded-r w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            maxLength={10}
          />
        </div>
      </div>
      {customer.addresses.map((address, index) => (
        <div key={index}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Line 1:
              </label>
              <input
                type="text"
                name="addressLine1"
                value={address.addressLine1}
                onChange={(e) => handleAddressChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Line 2:
              </label>
              <input
                type="text"
                name="addressLine2"
                value={address.addressLine2}
                onChange={(e) => handleAddressChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Postcode:
              </label>
              <input
                type="text"
                name="postcode"
                value={address.postcode}
                onChange={(e) => handleAddressChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength={6}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State:
              </label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => handleAddressChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City:
              </label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => handleAddressChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="bg-slate-700 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default CustomerForm;
