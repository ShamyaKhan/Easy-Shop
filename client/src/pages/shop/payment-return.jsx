import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaymentReturn() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("session_id");

  useEffect(() => {
    if (paymentId) {
      const currentOrderId = JSON.parse(
        sessionStorage.getItem("currentOrderId"),
      );
      console.log(currentOrderId);
      dispatch(capturePayment({ paymentId, orderId: currentOrderId })).then(
        (data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          }
        },
      );
    }
  }, [dispatch, paymentId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment...please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaymentReturn;
