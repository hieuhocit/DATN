import {
    Box,
    Typography,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton
  } from '@mui/material';
  import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
  import { useEffect, useState } from 'react';
  import AddIcon from '@mui/icons-material/Add';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  
  type Payment = {
    _id: string;
    userId: string;
    amount: number;
    transactionId: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    paymentDetails: {
      vnp_Amount: string;
      vnp_BankCode: string;
      vnp_BankTranNo: string;
      vnp_CardType: string;
      vnp_OrderInfo: string;
      vnp_PayDate: string;
      vnp_ResponseCode: string;
      vnp_TmnCode: string;
      vnp_TransactionNo: string;
      vnp_TransactionStatus: string;
      vnp_TxnRef: string;
    };
  };
  
  export default function PaymentTable() {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
    const [payments, setPayments] = useState<Payment[]>([]);
    const [editPayment, setEditPayment] = useState<Payment | null>(null);
    const [form, setForm] = useState({
      userId: '',
      amount: '',
      transactionId: '',
      paymentMethod: '',
      vnp_OrderInfo: '',
    });
  
    const [addOpen, setAddOpen] = useState(false);
  
    const handleFormChange = (field: keyof typeof form, value: string) => {
      setForm({ ...form, [field]: value });
    };
  
    const fetchPayments = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/payments', { credentials: 'include' });
        const data = await res.json();
        if (res.ok) setPayments(data.data);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu thanh toán:', err);
      }
    };
  
    useEffect(() => {
      fetchPayments();
    }, []);
  
    const handleAddPayment = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            userId: form.userId,
            amount: parseFloat(form.amount),
            transactionId: form.transactionId,
            paymentMethod: form.paymentMethod,
            paymentDetails: {
              vnp_OrderInfo: form.vnp_OrderInfo,
              vnp_Amount: '',
              vnp_BankCode: '',
              vnp_BankTranNo: '',
              vnp_CardType: '',
              vnp_PayDate: '',
              vnp_ResponseCode: '',
              vnp_TmnCode: '',
              vnp_TransactionNo: '',
              vnp_TransactionStatus: '',
              vnp_TxnRef: '',
            }
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setPayments((prev) => [...prev, data.data]);
          setAddOpen(false);
          setForm({ userId: '', amount: '', transactionId: '', paymentMethod: '', vnp_OrderInfo: '' });
        }
      } catch (err) {
        console.error('Lỗi thêm thanh toán:', err);
      }
    };
  
    const handleEditSave = async () => {
      if (!editPayment) return;
      const updated = {
        ...editPayment,
        userId: form.userId,
        amount: parseFloat(form.amount),
        transactionId: form.transactionId,
        paymentMethod: form.paymentMethod,
        paymentDetails: {
          ...editPayment.paymentDetails,
          vnp_OrderInfo: form.vnp_OrderInfo,
        },
      };
  
      try {
        const res = await fetch(`http://localhost:3000/api/payments/${editPayment._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(updated),
        });
  
        if (res.ok) {
          setPayments((prev) =>
            prev.map((p) => (p._id === updated._id ? updated : p))
          );
          setEditPayment(null);
        }
      } catch (err) {
        console.error('Lỗi cập nhật thanh toán:', err);
      }
    };
  
    const handleDelete = async (id: string) => {
      try {
        const res = await fetch(`http://localhost:3000/api/payments/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (res.ok) {
          setPayments((prev) => prev.filter((p) => p._id !== id));
        }
      } catch (err) {
        console.error('Lỗi xóa thanh toán:', err);
      }
    };
  
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
    //   { field: 'userId', headerName: 'ID người dùng', flex: 1 },
      { field: 'amount', headerName: 'Số tiền', flex: 1 },
      { field: 'paymentMethod', headerName: 'Phương thức', flex: 1 },
      { field: 'transactionId', headerName: 'Mã giao dịch', flex: 1 },
      { field: 'orderInfo', headerName: 'Thông tin đơn hàng', flex: 1 },
      { field: 'createdAt', headerName: 'Ngày tạo', width: 150 },
      {
        field: 'actions',
        headerName: 'Hành động',
        width: 120,
        renderCell: (params) => {
          const payment = payments[params.row.id - 1];
          return (
            <Box>
              <IconButton onClick={() => {
                setEditPayment(payment);
                setForm({
                  userId: payment.userId,
                  amount: payment.amount.toString(),
                  transactionId: payment.transactionId,
                  paymentMethod: payment.paymentMethod,
                  vnp_OrderInfo: payment.paymentDetails.vnp_OrderInfo || '',
                });
              }}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => handleDelete(payment._id)}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
          );
        },
      },
    ];
  
    const rows = payments.map((p, index) => ({
      id: index + 1,
      ...p,
      orderInfo: p.paymentDetails.vnp_OrderInfo,
      createdAt: new Date(p.createdAt).toLocaleDateString(),
    }));
  
    return (
      <Box p={3}>
        <Typography variant="h5" mb={2}>Quản lý thanh toán</Typography>
  
        <Box mb={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => setAddOpen(true)} startIcon={<AddIcon />}>
            Thêm thanh toán
          </Button>
        </Box>
  
        <Paper elevation={3} sx={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5]}
          />
        </Paper>
  
        {/* Modal thêm thanh toán */}
        <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Thêm thanh toán</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField label="ID người dùng" fullWidth value={form.userId} onChange={(e) => handleFormChange('userId', e.target.value)} />
              <TextField label="Số tiền" fullWidth type="number" value={form.amount} onChange={(e) => handleFormChange('amount', e.target.value)} />
              <TextField label="Phương thức" fullWidth value={form.paymentMethod} onChange={(e) => handleFormChange('paymentMethod', e.target.value)} />
              <TextField label="Mã giao dịch" fullWidth value={form.transactionId} onChange={(e) => handleFormChange('transactionId', e.target.value)} />
              <TextField label="Thông tin đơn hàng" fullWidth value={form.vnp_OrderInfo} onChange={(e) => handleFormChange('vnp_OrderInfo', e.target.value)} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddOpen(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleAddPayment}>Thêm</Button>
          </DialogActions>
        </Dialog>
  
        {/* Modal chỉnh sửa thanh toán */}
        <Dialog open={!!editPayment} onClose={() => setEditPayment(null)} fullWidth maxWidth="sm">
          <DialogTitle>Sửa thanh toán</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField label="ID người dùng" fullWidth value={form.userId} onChange={(e) => handleFormChange('userId', e.target.value)} />
              <TextField label="Số tiền" fullWidth type="number" value={form.amount} onChange={(e) => handleFormChange('amount', e.target.value)} />
              <TextField label="Phương thức" fullWidth value={form.paymentMethod} onChange={(e) => handleFormChange('paymentMethod', e.target.value)} />
              <TextField label="Mã giao dịch" fullWidth value={form.transactionId} onChange={(e) => handleFormChange('transactionId', e.target.value)} />
              <TextField label="Thông tin đơn hàng" fullWidth value={form.vnp_OrderInfo} onChange={(e) => handleFormChange('vnp_OrderInfo', e.target.value)} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditPayment(null)}>Hủy</Button>
            <Button variant="contained" onClick={handleEditSave}>Lưu</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
  