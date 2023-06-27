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
    // image: paymentOptions.image,
    handler: async function(response) {
      if(response && response.razorpay_payment_id){
        const result = await apiHelper.paymentVerify({response, orderId:paymentOptions.orderId,razorpayOrderId:paymentOptions.razorpayOrderId})
        console.log(result)
      }else{
        alert("Payment Verification filed")
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
