/* eslint-disable react/prop-types */
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const EditCustomerForm = ({ customer, onUpdate }) => {
  const [updatedCustomer, setUpdatedCustomer] = useState(customer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const addresses = [...updatedCustomer.addresses];
    const updatedAddress = { ...addresses[index], [name]: value };
    addresses[index] = updatedAddress;
    setUpdatedCustomer({ ...updatedCustomer, addresses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedCustomer);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={updatedCustomer.fullName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            maxLength={140}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={updatedCustomer.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            maxLength={255}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Mobile Number:
        </label>
        <div className="flex">
          <input
            type="text"
            name="countryCode"
            value={updatedCustomer.countryCode || "+91"}
            onChange={handleChange}
            className="shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="mobileNumber"
            value={updatedCustomer.mobileNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded-r w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            maxLength={10}
          />
        </div>
      </div>
      {updatedCustomer.addresses.map((address, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mb-4">
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
            />
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update
      </button>
    </form>
  );
};

export default EditCustomerForm;
