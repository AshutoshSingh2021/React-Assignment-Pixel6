/* eslint-disable react/prop-types */
function CustomerItem({
  customer,
  handleEdit,
  handleDelete,
  editingCustomerId,
}) {
  return (
    <ul className="bg-white shadow-md rounded-lg p-4">
      <li className="flex justify-between items-center mb-4">
        <div>
          <strong>Name: </strong>
          <span className="text-gray-800 mr-6">{customer.fullName}</span>
          <strong>Email: </strong>
          <span className="text-gray-600">{customer.email}</span>
          <div>
            <span className="text-gray-600 mr-6">
              <strong>PAN: </strong>
              {customer.pan}
            </span>
            <strong>Contact: </strong>
            <span className="text-gray-600">{customer.mobileNumber}</span>
          </div>
          {customer.addresses.map((address, index) => (
            <div className="mt-4" key={index}>
              <strong>Address:</strong>
              <p className="text-gray-600">{address.addressLine1}</p>
              <p className="text-gray-600">{address.addressLine2}</p>
              <span className="text-gray-600 mr-6">{address.postcode}</span>
              <span className="text-gray-600 mr-6">{address.state}</span>
              <span className="text-gray-600">{address.city}</span>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(customer)}
            className="bg-slate-700 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={
              editingCustomerId !== null && editingCustomerId !== customer.id
            }
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(customer.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  );
}

export default CustomerItem;
