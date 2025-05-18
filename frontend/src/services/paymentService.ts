import axios from "@/configs/axiosConfig";

export const getAllPayments = async () => {
  const response = await axios.get("/payments");
  return response.data;
};

export const deletePayment = async (paymentId: string) => {
  const response = await axios.delete(`/payments/${paymentId}`);
  return response.data;
};

export const updatePayment = async (paymentId: string, data: object) => {
  const response = await axios.put(`/payments/${paymentId}`, data);
  return response.data;
};
