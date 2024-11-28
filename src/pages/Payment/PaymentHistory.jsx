import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/Hook/useAxiosSecure';
import useAuth from '../../Components/Hook/useAuth';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="px-4 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        Total Payments: {payments.length}
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="table-auto w-full text-left border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-gray-600 font-medium">#</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Price</th>
              <th className="px-4 py-2 text-gray-600 font-medium">
                Transaction ID
              </th>
              <th className="px-4 py-2 text-gray-600 font-medium">Status</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">${payment.price.toFixed(2)}</td>
                <td className="px-4 py-2">{payment.transitionId}</td>
                <td className="px-4 py-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
