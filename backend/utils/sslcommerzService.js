import SSLCommerzPayment from "sslcommerz-lts";

const store_id = "unkno66fd5d43eb6c2"
const store_pass = "unkno66fd5d43eb6c2@ssl"
const is_live = false

const sslcommerz = new SSLCommerzPayment(store_id,store_pass,is_live)

const initialPaymentSession = async (billingData)=> {
    const transactionData = {
        total_amount: billingData.amount,
        currency: 'BDT',
        tran_id: "dfaskdfjaskdjf", 
        success_url: `http://localhost:5000/billings/success/${billingData._id}?user=${billingData.user}`,
        fail_url: `http://localhost:5000/billings/fail/${billingData._id}?booking=${billingData.booking}`,
        cancel_url: `http://localhost:5000/billings/cancel/${billingData._id}`,
        ipn_url: 'http://localhost:5000/ipn',
        shipping_method: 'Courier',
        product_name: billingData.booking.toString(),
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: billingData.user.toString(),
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: billingData.mobileNo,
        cus_fax: '01711111111',
        ship_name: billingData.user.toString(),
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    }

    try {
        const response = await sslcommerz.init(transactionData);
        if (response.GatewayPageURL) {
            return { success: true, payment_url: response.GatewayPageURL };
        } else {
            return { success: false, message: 'Failed to create payment session' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export {initialPaymentSession};