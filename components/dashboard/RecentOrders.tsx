interface Order {
  _id?: string
  orderNumber: string
  customer: {
    name: string
  }
  total: number
  status: string
}

interface RecentOrdersProps {
  orders?: Order[]
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const defaultOrders = [
    { orderNumber: '#1234', customer: { name: 'John Doe' }, total: 129.99, status: 'delivered' },
    { orderNumber: '#1235', customer: { name: 'Jane Smith' }, total: 89.50, status: 'processing' },
    { orderNumber: '#1236', customer: { name: 'Mike Johnson' }, total: 249.00, status: 'pending' },
    { orderNumber: '#1237', customer: { name: 'Sarah Williams' }, total: 179.99, status: 'delivered' },
  ]

  const displayOrders = orders || defaultOrders

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
      
      <div className="space-y-3">
        {displayOrders.map((order, idx) => (
          <div key={order.orderNumber || idx} className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div>
              <p className="font-medium text-gray-900">{order.orderNumber}</p>
              <p className="text-sm text-gray-500">{order.customer.name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <a href="/dashboard/orders" className="block w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium text-center">
        View All Orders →
      </a>
    </div>
  )
}