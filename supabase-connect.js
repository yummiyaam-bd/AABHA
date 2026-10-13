// Supabase লাইভ কাস্টমার কানেকশন সেটআপ
const SUPABASE_URL = "https://supabase.co";
const SUPABASE_KEY = "sb_publishable_vyOh8uTL-GUcuPD4PevQ5w_qIbNJ8fm";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// কাস্টমার পেমেন্ট সিলেকশন হ্যান্ডেলার (বিকাশ, নগদ লোগো ও COD অগ্রিম নোটিশ)
document.addEventListener('change', function(e) {
    if (e.target && (e.target.id === 'payment-cod' || e.target.value === 'cod')) {
        // প্রিমিয়াম অ্যালার্ট ডায়ালগ
        alert("📌 কুরিয়ার অগ্রিম ফি পলিসি:\n\nঅর্ডারটি নিশ্চিত করতে কুরিয়ার ডেলিভারি চার্জটি (৳১২০) আপনাকে অগ্রিম বিকাশ বা নগদে পে করতে হবে। বাকি টাকা পণ্য হাতে পেয়ে পরিশোধ করবেন।");
    }
});

// লাইভ অর্ডার সাবমিশন ট্র্যাকিং ফাংশন (ডাটাবেসে পাঠানোর জন্য)
async function submitOrderToSupabase(customerName, phone, address, totalAmount, paymentMethod) {
    const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .insert([
            { 
                customer_name: customerName, 
                phone: phone, 
                delivery_address: address, 
                total_amount: totalAmount, 
                payment_method: paymentMethod,
                status: 'Pending'
            }
        ]);
        
    if (error) {
        console.error("Order submission failed:", error.message);
    } else {
        alert("🎉 আপনার অর্ডারটি সফলভাবে ডাটাবেসে জমা হয়েছে! কুরিয়ার ফি পরিশোধ করলেই অ্যাডমিন কনফার্ম করবেন।");
    }
}
