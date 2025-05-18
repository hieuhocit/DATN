import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function PaymentCreateForm() {
  return (
    <Dialog
      open={addOpen}
      onClose={() => setAddOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Thêm thanh toán</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="ID người dùng"
            fullWidth
            value={form.userId}
            onChange={(e) => handleFormChange("userId", e.target.value)}
          />
          <TextField
            label="Số tiền"
            fullWidth
            type="number"
            value={form.amount}
            onChange={(e) => handleFormChange("amount", e.target.value)}
          />
          <TextField
            label="Phương thức"
            fullWidth
            value={form.paymentMethod}
            onChange={(e) => handleFormChange("paymentMethod", e.target.value)}
          />
          <TextField
            label="Mã giao dịch"
            fullWidth
            value={form.transactionId}
            onChange={(e) => handleFormChange("transactionId", e.target.value)}
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
        <Button onClick={() => setAddOpen(false)}>Hủy</Button>
        <Button variant="contained" onClick={handleAddPayment}>
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
