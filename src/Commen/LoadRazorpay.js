import apiHelper from "./ApiHelper";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(window.Razorpay);
    };
    document.body.appendChild(script);
  });
};


const handlePayment = async (paymentOptions) => {
  const razorpay = await loadRazorpay();

  const options = {
    key: paymentOptions.apikey, // Replace with your actual API key
    amount: paymentOptions.amount, // Replace with the actual amount in paise
    currency: paymentOptions.currency,
    name: 'Amazon',
    description: 'Test Payment',
    order_id: paymentOptions.razorpayOrderId,
    // image: paymentOptions.image,
    handler: async function (response) {
      if (response && response.razorpay_payment_id) {
        try {
          const result = await apiHelper.paymentVerify({ razorpay_payment_id: response.razorpay_payment_id, orderId: paymentOptions.orderId, razorpayOrderId: paymentOptions.razorpayOrderId })
          if (result && result.status === 200) {
            paymentOptions.navigate(`/order/${result.data.orderId}`)
          }
        } catch (error) {
          if (error && error.response && error.response.data && error.response.data.message) {
            paymentOptions.showError(error)
          }
        }
      } else {
        return alert("Payment Verification filed")
      }
    },
    prefill: {
      name: paymentOptions.name,
      email: paymentOptions.email,
      contact: paymentOptions.phone,
    },
    notes: {
      address: paymentOptions.address,
    },
    theme: {
      color: '#000',
    },
    payment_method: {
      card: true,
      netbanking: true,
      wallet: true,
      upi: true,
    },
  };

  const paymentObject = new razorpay(options);
  paymentObject.open();
};



export default handlePayment
