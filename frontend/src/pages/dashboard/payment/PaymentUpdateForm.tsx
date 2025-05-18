/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Payment } from "@/types";
import { updatePayment } from "@/services/paymentService";
import { toast } from "react-toastify";

interface PaymentUpdateFormProps {
  open: boolean;
  payment: Payment;
  onClose: () => void;
  refetch: () => Promise<any>;
}

const PaymentUpdateForm: React.FC<PaymentUpdateFormProps> = ({
  open,
  payment,
  onClose,
  refetch,
}) => {
  const [form, setForm] = useState({
    userId: payment.userId || "",
    amount: payment.amount.toString() || 0,
    paymentMethod: payment.paymentMethod || "",
    transactionId: payment.transactionId || "",
    vnp_OrderInfo: payment.paymentDetails.vnp_OrderInfo || "",
    vnp_BankCode: payment.paymentDetails.vnp_BankCode || "",
  });

  const [loading, setLoading] = useState(false);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdatePayment = async () => {
    try {
      setLoading(true);
      const updatedPayment: Payment = {
        ...payment,
        amount: Number(form.amount),
        paymentDetails: {
          ...payment.paymentDetails,
          vnp_OrderInfo: form.vnp_OrderInfo,
        },
      };
      const res = await updatePayment(payment._id, updatedPayment);

      if (res.statusCode === 200) {
        toast.success(res.message);
        await refetch();
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thanh toán");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cập nhật thanh toán</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="ID người dùng"
            fullWidth
            value={form.userId}
            disabled
          />
          <TextField
            label="Số tiền"
            fullWidth
            type="number"
            value={form.amount}
            onChange={(e) => handleFormChange("amount", e.target.value)}
          />
          <TextField
            label="Mã ngân hàng"
            fullWidth
            disabled
            value={form.vnp_BankCode}
          />
          <TextField
            label="Phương thức"
            fullWidth
            disabled
            value={form.paymentMethod}
          />
          <TextField
            label="Mã giao dịch"
            fullWidth
            disabled
            value={form.transactionId}
          />
          <TextField
            label="Thông tin đơn hàng"
            fullWidth
            value={form.vnp_OrderInfo}
            onChange={(e) => handleFormChange("vnp_OrderInfo", e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Hủy
        </Button>
        <Button
          disabled={loading}
          variant="contained"
          onClick={handleUpdatePayment}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentUpdateForm;
