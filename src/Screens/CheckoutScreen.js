import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiHelper from "../Commen/ApiHelper";
import Message from "../Component/Message";
import Loader from "../Component/Loader";
import handlePayment from "../Commen/LoadRazorpay";

export default function CheckoutScreen({ cartItems, setcartItems }) {
    const [Cart, setCart] = useState([]);
    const [loading, setloading] = useState(false);
    const [SummaryDetails, setSummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0
    });
    const [error, seterror] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    const navigate = useNavigate()
    const location = useLocation()
    const paymentMethod = location.search.split("paymentMethod=")[1]

    useEffect(() => {
        if (!userInfo.address) {
            navigate("/shipping?redirect=checkout")
        }
        // eslint-disable-next-line
    }, []);

    const getCart = async () => {
        try {
            setloading(true)
            const products = await cartItems.map((x) => x.product)
            const result = await apiHelper.fetchCart(products)
            const inStockItems = result.data?.cart?.filter((x) => {
                return x.countInStock > 0
            })
            for (let i in inStockItems) {
                for (let j in cartItems) {
                    if (cartItems[j].product === inStockItems[i]._id) {
                        inStockItems[i].qty = cartItems[j].qty
                    }
                }
            }
            setCart(inStockItems)
            setloading(false)
        } catch (error) {
            setloading(false)
            if (error.response && error.response.data && error.response.data.message) {
                seterror(error.response.data.message)
                return
            }
            seterror(error.message)
            return
        }
    }

    useEffect(() => {
        getCart()
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalItems = 0
        let totalProducts = 0
        while (i < Cart.length) {
            if (Cart[i].countInStock > 0) {
                totalItems += Cart[i].qty
                totalPrice += (Cart[i].qty * Cart[i].price)
                totalProducts++
            }
            i++
        }
        setSummaryDetails({ ...SummaryDetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })
        // eslint-disable-next-line
    }, [Cart]);


    const PlaceOrder = async () => {
        try {
            setloading(true)
            const products = Cart.map((x) => {
                return {
                    _id: x._id,
                    qty: x.qty,
                    price: x.price
                }
            })
            const orderDetails = {
                products: products,
                totalPrice: SummaryDetails.totalAmount,
                paymentMethod: paymentMethod,
                shippingAddress: userInfo.address
            }
            const result = await apiHelper.createOrder(orderDetails)
             localStorage.removeItem("cartItems")
            setcartItems([])
            setloading(false)
            if (!result.data.order.RazorpayDetails) {
                return navigate(`/order/${result.data.order._id}`)
            } else {
                const Options = {
                    name:result.data.order.shippingAddress.fullName,
                    phone:result.data.order.shippingAddress.phone,
                    email:result.data.order.user.email,
                    address:result.data.order.shippingAddress,
                    apikey:result.data.order.RazorpayDetails.apikey,
                    amount:result.data.order.RazorpayDetails.amount,
                    currency:result.data.order.RazorpayDetails.currency,
                    razorpayOrderId:result.data.order.RazorpayDetails.id,
                    orderId:result.data.order._id,
                    showError:seterror,
                    navigate:navigate
                }
                handlePayment(Options)
            }
            setloading(false)
        } catch (error) {
            setloading(false)
            if (error.response && error.response.data && error.response.data.message) {
                seterror(error.response.data.message)
                return
            }
            seterror(error.message)
        }
    }


    return (
        <>
            {
                error ? <Message>{error}</Message> : (
                    <>
                        <Loader loading={loading} />
                        <div className="container py-3">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="fw-normal">Review Your Order</h3>
                                    <hr />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-9 mb-3">
                                    <div className="shadow p-3 rounded-2">
                                        <div className="row">
                                            <div className="col-12 col-md-6 mb-3">
                                                <h5 className="fw-bold">Shipping Information</h5>
                                                <hr />
                                                <p className="mb-0" style={{ fontSize: "1.1rem" }}>Customer Name</p>
                                                <span>{userInfo.address.fullName},</span><br />
                                                <span>{userInfo.address.address}</span> <br />
                                                <span>{userInfo.address.city}, {userInfo.address.state} ,{userInfo.address.pincode}</span> <br />
                                                <span>Phone: {userInfo.address.phone}</span> <br />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <h5 className="fw-bold">Payment Information</h5>
                                                <hr />
                                                <p className="mb-0" style={{ fontSize: "1.1rem" }}>
                                                    Payment Method:
                                                    <span className="fw-bold" style={{ fontSize: "0.9rem", color: "#b12704" }}> {paymentMethod.toUpperCase()} </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shadow p-3 rounded-2 mt-4">
                                        <h5 className="fw-bold mb-3" style={{ textDecoration: "underline" }}>Order Information</h5>
                                        <div className="row">
                                            <div className="col-12">
                                                {
                                                    Cart.map((x, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <div className="row">
                                                                    <div className="col-md-3 col-5">
                                                                        <Link className={"link"} to={`/product/${x._id}`}  >
                                                                            <img src={x.image} width={"100%"} alt={x.name} />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-md-9 col-7">
                                                                        <Link className={"link"} to={`/product/${x._id}`}  >
                                                                            <h6 className="fw-bold">{x.name}</h6>
                                                                        </Link>
                                                                        <p className="mb-1">Brand: {x.brand}</p>
                                                                        <p className="mb-1">Category: {x.category}</p>
                                                                        <p className="mb-1">Quontity: {x.qty}</p>
                                                                        <p className="mb-1">Price: <span className="fw-bold" style={{ color: "#b12704" }}>${x.price}</span></p>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    index < (Cart.length - 1) && <hr className="mt-0" />
                                                                }

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="card">
                                        <div className="card-header py-3">
                                            <h5 className="m-0 fw-bold">Order Summary</h5>
                                        </div>
                                        <div className="p-3">
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-1">Items:</p>
                                                <p className="mb-1">${SummaryDetails.totalAmount}.00</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-1">Delivery:</p>
                                                <p className="mb-1">${SummaryDetails.delivery}.00</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-1">Total:</p>
                                                <p className="mb-1">${SummaryDetails.totalAmount}.00</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-1">Discount:</p>
                                                <p className="mb-1">-${0}.00</p>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <p className="fs-5 fw-bold">Order Total:</p>
                                                <p className="fs-5 fw-bold" style={{ color: "#b12704" }}>${SummaryDetails.totalAmount}.00</p>
                                            </div>
                                            <button onClick={PlaceOrder} className="shadow border-secondary btn btn-warning w-100 bg-gradient">Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>

    )
}