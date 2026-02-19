import { useEffect, useState } from "react";
import Form from "../common/Form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditId, setCurrentEditId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);

  function handleManageAddress(e) {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditId === null) {
      toast("You can add maximum 3 addresses", { variant: "destructive" });
      setFormData(initialAddressFormData);
      return;
    }

    currentEditId !== null
      ? dispatch(
          editAddress({ userId: user?.id, addressId: currentEditId, formData }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditId(null);
            setFormData(initialAddressFormData);
            toast("Address Updated!");
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              setFormData(initialAddressFormData);
              toast("Address Added!");
            }
          },
        );
  }

  function handleDeleteAddress(currentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: currentAddress._id }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast("Address Deleted!");
      }
    });
  }

  function handleEditAddress(currentAddress) {
    setCurrentEditId(currentAddress?._id);
    setFormData({
      ...formData,
      address: currentAddress?.address,
      city: currentAddress?.city,
      phone: currentAddress?.phone,
      pincode: currentAddress?.pincode,
      notes: currentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((item, idx) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                key={idx}
                addressInfo={item}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isButtonDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
