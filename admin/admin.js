// Supabase লাইভ কানেকশন সেটআপ
const SUPABASE_URL = "https://supabase.co";
const SUPABASE_KEY = "sb_publishable_vyOh8uTL-GUcuPD4PevQ5w_qIbNJ8fm";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ১. ড্যাশবোর্ডের লাইভ ডেটা এবং অর্ডার লোড করার মেইন ফাংশন
async function loadDashboardData() {
    // ডাটাবেস থেকে সব অর্ডারের তথ্য ক্রমানুসারে আনা
    const { data: orders, error: orderError } = await supabaseClient
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (orderError) {
        console.error("Error fetching orders:", orderError);
        return;
    }

    const tbody = document.getElementById('order-table-body');
    if(tbody) {
        tbody.innerHTML = '';
        
        if(orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #94a3b8;">এখনো কোনো নতুন অর্ডার আসেনি।</td></tr>`;
        }

        let totalSalesCalculation = 0;

        orders.forEach(order => {
            // শুধুমাত্র সফলভাবে ডেলিভারি হওয়া অর্ডারের টাকা সেলে যোগ হবে
            if(order.status === 'Delivered') {
                totalSalesCalculation += Number(order.total_amount || 0);
            }

            tbody.innerHTML += `
                <tr>
                    <td><strong>${order.customer_name || 'Anonymous'}</strong></td>
                    <td>${order.phone || 'N/A'}</td>
                    <td>৳${order.total_amount || 0}</td>
                    <td><span style="background: #334155; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${order.payment_method ? order.payment_method.toUpperCase() : 'COD'}</span></td>
                    <td>${order.delivery_charge_paid ? '✅ অগ্রিম পেইড' : '❌ বাকি আছে'}</td>
                    <td>
                        <select onchange="updateOrderStatus('${order.id}', this.value)" style="border: 1px solid ${getStatusColor(order.status)};">
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

        // মোট সেলস এবং অর্ডার সংখ্যা স্ক্রিনে আপডেট করা
        document.getElementById('total-sales').innerText = `৳${totalSalesCalculation}`;
        document.getElementById('total-orders').innerText = `${orders.length} টি`;
    }

    // ২. লো স্টক অ্যালার্ট চেক (কোনো পণ্যের স্টক ৩ বা তার কম হলে)
    const { data: lowStockProducts } = await supabaseClient
        .from('products')
        .select('*')
        .lt('stock_count', 4);

    if (lowStockProducts && lowStockProducts.length > 0) {
        document.getElementById('low-stock-alert').style.display = 'block';
        document.getElementById('low-stock-count').innerText = `${lowStockProducts.length} টি`;
    } else {
        document.getElementById('low-stock-alert').style.display = 'none';
        document.getElementById('low-stock-count').innerText = `০ টি`;
    }
}

// স্ট্যাটাস অনুযায়ী বর্ডারের রং ঠিক করার হেল্পার ফাংশন
function getStatusColor(status) {
    switch(status) {
        case 'Pending': return '#eab308';
        case 'Confirmed': return '#3b82f6';
        case 'Processing': return '#a855f7';
        case 'Shipped': return '#06b6d4';
        case 'Delivered': return '#22c55e';
        case 'Cancelled': return '#ef4444';
        default: return '#475569';
    }
}

// ৩. অ্যাডমিন প্যানেল থেকে লাইভ অর্ডার স্ট্যাটাস পরিবর্তন করার ফাংশন
async function updateOrderStatus(orderId, newStatus) {
    const { error } = await supabaseClient
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

    if (error) {
        alert("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে: " + error.message);
    } else {
        alert("🎯 অর্ডারের স্ট্যাটাস সফলভাবে পরিবর্তন হয়েছে: " + newStatus);
        loadDashboardData(); // ড্যাশবোর্ড রিফ্রেশ করা
    }
}

// পেজ লোড হওয়ার সাথে সাথে ডেটা নিয়ে আসার নির্দেশ
window.onload = loadDashboardData;
