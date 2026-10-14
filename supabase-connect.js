// Supabase লাইভ কাস্টমার কানেকশন সেটআপ
const SUPABASE_URL = "https://xjwuozdfuflfoqiuucik.supabase.co";
const SUPABASE_KEY = "sb_publishable_vyOh8uTL-GUcuPD4PevQ5w_qIbNJ8fm";
const supabaseClient = (typeof supabase !== 'undefined')
    ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

if (!supabaseClient) {
    console.error("Supabase লাইব্রেরি লোড হয়নি। index.html-এ লাইব্রেরির লিংক আগে দিতে হবে।");
}

// কাস্টমার পেমেন্ট সিলেকশন হ্যান্ডেলার (বিকাশ, নগদ লোগো ও COD অগ্রিম নোটিশ)
document.addEventListener('change', function(e) {
    if (e.target && (e.target.id === 'payment-cod' || e.target.value === 'cod')) {
        alert("📌 কুরিয়ার অগ্রিম ফি পলিসি:\n\nঅর্ডারটি নিশ্চিত করতে কুরিয়ার ডেলিভারি চার্জটি (৳১২০) আপনাকে অগ্রিম বিকাশ বা নগদে পে করতে হবে। বাকি টাকা পণ্য হাতে পেয়ে পরিশোধ করবেন।");
    }
});

// ডাটাবেসের এরর কোডকে বাংলা মেসেজে রূপান্তর
function orderErrorMessage(msg) {
    const m = String(msg || '');
    if (m.includes('LOGIN_REQUIRED')) return "অর্ডার করতে আগে ইমেইল দিয়ে লগইন করুন।";
    if (m.includes('BAD_NAME')) return "সঠিক নাম লিখুন।";
    if (m.includes('BAD_PHONE')) return "সঠিক মোবাইল নম্বর দিন (যেমন 01712345678)।";
    if (m.includes('BAD_ADDRESS')) return "সঠিক ঠিকানা লিখুন।";
    if (m.includes('BAD_ITEMS') || m.includes('BAD_QTY')) return "কার্টে পণ্য ঠিক নেই। আবার চেষ্টা করুন।";
    if (m.includes('PRODUCT_NOT_FOUND')) return "একটি পণ্য আর পাওয়া যাচ্ছে না।";
    if (m.includes('OUT_OF_STOCK')) return "দুঃখিত, একটি পণ্যের স্টক শেষ। " + m.replace(/.*OUT_OF_STOCK:?\s*/, '');
    if (m.includes('NO_PROFILE')) return "প্রোফাইল পাওয়া যায়নি। আবার লগইন করুন।";
    return "অর্ডার হয়নি: " + m;
}

// লাইভ অর্ডার সাবমিশন (ডাটাবেসের place_order ফাংশন দিয়ে)
// items = [{ product_id: 1, size: "M", color: "Red", qty: 1 }, ...]
async function submitOrderToSupabase(customerName, phone, address, totalAmount, paymentMethod, items, note, promo) {
    if (!supabaseClient) { alert("সংযোগে সমস্যা হয়েছে। পেজ রিফ্রেশ করুন।"); return null; }
    if (!Array.isArray(items) || items.length === 0) {
        alert("কার্টে কোনো পণ্য নেই।");
        return null;
    }

    const { data, error } = await supabaseClient.rpc('place_order', {
        p_name: customerName,
        p_phone: phone,
        p_address: address,
        p_mode: 'Delivery',
        p_payment: paymentMethod || 'Cash',
        p_note: note || '',
        p_promo: promo || '',
        p_items: items
    });

    if (error) {
        console.error("Order submission failed:", error.message);
        alert("⚠️ " + orderErrorMessage(error.message));
        return null;
    }

    alert("🎉 অর্ডার #" + data.order_no + " সফলভাবে জমা হয়েছে! মোট ৳" + data.total +
          (data.discount_label ? " (" + data.discount_label + ")" : "") + "।");
    return data;
}
