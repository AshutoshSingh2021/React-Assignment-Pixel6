import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteCustomer, updateCustomer } from "../store/customerSlice";
import EditCustomerForm from "./EditCustomerForm";
import CustomerItem from "./CustomerItem";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const customers = useSelector((state) => state.customers.customers);
  const dispatch = useDispatch();
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  /**
   *
   * @param {*} id
   *
   * Asking for confirmation from the user before deleting the customer from the global state
   */
  const handleDelete = (id) => {
    const confirmation = confirm(
      "Are you sure you want to delete the Customer?"
    );
    if (confirmation) {
      dispatch(deleteCustomer(id));
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomerId(customer.id);
  };

  const handleUpdate = (updatedCustomer) => {
    dispatch(updateCustomer(updatedCustomer));
    setEditingCustomerId(null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-start items-center mb-4">
        <Link to="/">
          <span className="material-symbols-outlined cursor-pointer mt-2">
            arrow_circle_left
          </span>
        </Link>
        <h2 className="text-xl font-bold ml-4">Customer List</h2>
      </div>
      {customers.map((customer) => (
        <div key={customer.id} className="max-w-2xl mx-auto mt-8">
          {editingCustomerId === customer.id ? (
            <EditCustomerForm customer={customer} onUpdate={handleUpdate} />
          ) : (
            <CustomerItem
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              customer={customer}
              editingCustomerId={editingCustomerId}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
