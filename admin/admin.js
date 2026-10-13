const SUPABASE_URL = "https://supabase.co";
const SUPABASE_KEY = "sb_publishable_vyOh8uTL-GUcuPD4PevQ5w_qIbNJ8fm";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkSecurityGateway() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
        window.location.replace("login.html");
        return;
    }
    document.getElementById('admin-email-display').innerText = `👤 Active: ${user.email}`;
    loadDashboardData();
}

async function loadDashboardData() {
    const { data: orders } = await supabaseClient
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    const tbody = document.getElementById('order-table-body');
    if(tbody) {
        tbody.innerHTML = '';
        if(!orders || orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #9ca3af; padding: 20px;">কোনো কাস্টমার এখনো অর্ডার করেনি।</td></tr>`;
            return;
        }

        let totalSalesCalculation = 0;
        orders.forEach(order => {
            if(order.status === 'Delivered') {
                totalSalesCalculation += Number(order.total_amount || 0);
            }
            tbody.innerHTML += `
                <tr>
                    <td><strong>${order.customer_name || 'Anonymous'}</strong></td>
                    <td>${order.phone || 'N/A'}</td>
                    <td>৳${order.total_amount || 0}</td>
                    <td><span style="background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600;">${order.payment_method ? order.payment_method.toUpperCase() : 'COD'}</span></td>
                    <td>${order.delivery_charge_paid ? '✅ paid' : '❌ pending'}</td>
                    <td>
                        <select onchange="updateOrderStatus('${order.id}', this.value)">
                            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                            <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </td>
                </tr>
            `;
        });
        document.getElementById('total-sales').innerText = `৳${totalSalesCalculation}`;
        document.getElementById('total-orders').innerText = `${orders.length} টি`;
    }

    const { data: lowStockProducts } = await supabaseClient.from('products').select('*').lt('stock_count', 4);
    if (lowStockProducts && lowStockProducts.length > 0) {
        document.getElementById('low-stock-alert').style.display = 'block';
        document.getElementById('low-stock-count').innerText = `${lowStockProducts.length} টি`;
    }
}

async function updateOrderStatus(orderId, newStatus) {
    await supabaseClient.from('orders').update({ status: newStatus }).eq('id', orderId);
    loadDashboardData();
}

window.onload = checkSecurityGateway;
