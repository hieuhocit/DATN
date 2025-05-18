import { Box, Typography, Paper, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Payment } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { deletePayment, getAllPayments } from "@/services/paymentService";
import ConfirmDialog from "./ConfirmDialog";
import PaymentUpdateForm from "./PaymentUpdateForm";

export default function PaymentTable() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const { data: res, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
  });
  const [editedPayment, setEditedPayment] = useState<Payment | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const res = await deletePayment(id);
      if (res.statusCode === 200) {
        await refetch();
        toast.success(res.message);
        setConfirmDialog(null);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error("Lỗi kết nối API:", err);
      toast.error("Có lỗi xảy ra khi xóa thanh toán");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: GridColDef<Payment>[] = [
    { field: "stt", headerName: "STT", width: 70 },
    {
      field: "amount",
      headerName: "Số tiền (VNĐ)",
      flex: 1,
      renderCell: (params) => {
        const amount = params.value as number;
        return (
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(amount)}
          </span>
        );
      },
    },
    {
      field: "name",
      headerName: "Người mua",
      flex: 1,
    },
    {
      field: "vnp_BankCode",
      headerName: "Ngân hàng",
      flex: 1,
      renderCell: (params) => {
        const bankCode = params.row.paymentDetails.vnp_BankCode as string;
        return <span>{bankCode}</span>;
      },
    },
    {
      field: "vnp_OrderInfo",
      headerName: "Nội dung thanh toán",
      flex: 1,
      renderCell: (params) => {
        const orderInfo = params.row.paymentDetails.vnp_OrderInfo as string;
        return <span>{orderInfo}</span>;
      },
    },
    {
      field: "transactionId",
      headerName: "Mã giao dịch",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 120,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton onClick={() => setEditedPayment(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
            {!params.row.user?.[0] && (
              <IconButton onClick={() => setConfirmDialog(params.row._id)}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            )}
          </Box>
        );
      },
    },
  ];

  const payments = (res?.data || []) as Payment[];

  const rows = payments.map((p, index) => ({
    ...p,
    id: p._id,
    stt: index + 1,
    name: p.user[0]?.name,
    vnp_BankCode: p.paymentDetails.vnp_BankCode,
    vnp_OrderInfo: p.paymentDetails.vnp_OrderInfo,
    quantity: p.paymentItem.length,
    createdAt: new Date(p.createdAt).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  }));

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Quản lý thanh toán
      </Typography>

      <Paper elevation={3} sx={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]}
        />
      </Paper>

      {editedPayment && (
        <PaymentUpdateForm
          payment={editedPayment}
          open={!!editedPayment}
          onClose={() => setEditedPayment(null)}
          refetch={refetch}
        />
      )}

      {/* Dialog xác nhận xóa người dùng */}
      {confirmDialog && (
        <ConfirmDialog
          open={!!confirmDialog}
          title="Xác nhận xóa thanh toán"
          content="Bạn có chắc chắn muốn xóa thanh toán này không?"
          confirmText="Xóa"
          color="error"
          isLoading={isDeleting}
          onClose={() => setConfirmDialog(null)}
          onConfirm={async () => {
            await handleDelete(confirmDialog);
          }}
        />
      )}
    </Box>
  );
}
