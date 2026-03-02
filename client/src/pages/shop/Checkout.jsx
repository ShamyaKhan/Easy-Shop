import Address from "@/components/shop/Address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import CartContent from "@/components/shop/CartContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";

function ShopCheckout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrder);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (acc, curr) =>
            acc +
            (curr?.salePrice > 0 ? curr?.salePrice : curr?.price) *
              curr.quantity,
          0,
        )
      : 0;

  function handleInitiatePayment() {
    if (currentSelectedAddress === null) {
      toast("Please select one address to proceed", { variant: "destructive" });
      return;
    }

    if (cartItems.length === 0) {
      toast("Please add product to cart!", { variant: "destructive" });
    }

    const orderData = {
      userId: user?.id,
      carId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        salePrice: item?.salePrice,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStarted(true);
      } else {
        setIsPaymentStarted(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-75 w-full overflow-hidden">
        <img src={img} className="w-full h-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item, idx) => (
                <CartContent cartItem={item} key={idx} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={() => handleInitiatePayment()} className="w-full">
              {isPaymentStarted
                ? "Processing payment..."
                : "Checkout with stripe"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCheckout;
