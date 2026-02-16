import Address from "@/components/shop/Address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import CartContent from "@/components/shop/CartContent";
import { Button } from "@/components/ui/button";

function ShopCheckout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);

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

  return (
    <div className="flex flex-col">
      <div className="relative h-75 w-full overflow-hidden">
        <img src={img} className="w-full h-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
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
            <Button className="w-full">Checkout with PayPal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCheckout;
