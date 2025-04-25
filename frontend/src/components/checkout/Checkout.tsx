/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPaymentUrl, getResultPayment } from "@/services/checkoutService";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

declare global {
  interface Window {
    handleAfterPayment: (href: string) => void;
  }
}

export default function Checkout() {
  const [bankCode, setBankCode] = useState("VNBANK");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    if(vnp_ResponseCode === "00") {
      handleAfterPayment(window.location.href);
    }
  }, []);

  const handlePay = async () => {
    const res: any = await getPaymentUrl({
      bankCode,
    });

    // const outerWidth = window.outerWidth > 1000 ? window.outerWidth : 1000;
    // const outerHeight = window.outerHeight;

    const data = res.data;

    window.handleAfterPayment = handleAfterPayment;

    window.open(data.url,'_self')
  };

  const handleAfterPayment = async (href: string) => {
    console.log("handleAfterPayment", href);
    const params = new URL(href).searchParams;
    const res: any = await getResultPayment(params);
    const data = res.data;
    toast.success("Thanh toán thành công");
    console.log(data);
    navigate('/cart')
  };

  return (
    <>
      <div></div>
      <div>
        <label>Chọn phương thức thanh toán:</label>
        <br />
        <label>
          <input
            type="radio"
            name="bankCode"
            checked={bankCode === "VNBANK"}
            value={"VNBANK"}
            onChange={(e) => setBankCode(e.target.value)}
          />
          <span>Thanh toán qua ATM-Tài khoản ngân hàng nội địa</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="bankCode"
            checked={bankCode === "INTCARD"}
            value={"INTCARD"}
            onChange={(e) => setBankCode(e.target.value)}
          />
          <span>Thanh toán qua thẻ quốc tế</span>
        </label>
      </div>
      <div>
        <button onClick={handlePay}>Thanh toán</button>
      </div>
    </>
  );
}
