import { Link, useNavigate, useParams } from "react-router-dom"
import Rating from "../Component/Rating"
import { useEffect, useState } from "react"
import apiHelper from "../Commen/ApiHelper"
import Loader from "../Component/Loader"
import Message from "../Component/Message"

export default function ProductScreen(props) {
    const { setcartItems, cartItems } = props
    const navigate = useNavigate()
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const { id } = useParams()
    const [Product, setProduct] = useState({});
    const [qty, setqty] = useState(1);
    const GetProduct = async () => {
        try {
            setloading(true)
            const result = await apiHelper.fetchProductbyId(id)
            setloading(false)
            if (result.data && result.data.product && result.data.product.countInStock && result.data.product.countInStock > 0) {
                setqty(1)
            } else {
                setqty(0)
            }
            setProduct(result.data.product)
            return
        } catch (error) {
            setloading(false)
            if (error.response && error.response.data && error.response.data.message) {
                return seterror(error.response.data.message)
            }
            seterror(error.message)
            return
        }
    }

    useEffect(() => {
        GetProduct()
        // eslint-disable-next-line
    }, []);


    const CartHandler = async () => {
        try {
            const findIndex = cartItems.findIndex((x) => x.product === id)
            if (findIndex > -1) {
                cartItems[findIndex].qty = qty
            } else {
                cartItems.push({ product: id, qty: qty })
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            setcartItems(cartItems)
            navigate("/cart")
        } catch (error) {
            seterror(error.message)
            return
        }
    }


    return (
        <>
            {
                error ? <Message>{error}</Message> : (
                    <div className="px-3">
                        <Loader loading={loading} />
                        <Link to={".."} className="link" style={{ fontWeight: "600" }} >Back to result</Link>
                        <div className="container pt-2">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-2 mb-md-0">
                                    <img src={Product.image} width={"100%"} alt={Product.name} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 mb-2 mb-0 px-0-sm">
                                            <h4 className="fw-bold">
                                                {Product.name}
                                            </h4>
                                            <div className="d-flex align-items-center mb-1">
                                                <Rating rating={Product.rating} />
                                                <span>&nbsp; {Product.numReviews} reviews</span>
                                            </div>
                                            <p className="mb-1">Price : <span className="fw-bold" style={{color:"#b12704"}}>${Product.price}</span></p>
                                            <p className="mb-1">Description:</p>
                                            <p>heigh quolity product</p>
                                        </div>
                                        <div className="col-12 col-lg-6 mb-2">
                                            <div className="card-body card">
                                                <div className="d-flex justify-content-between">
                                                    <h6>Price</h6>
                                                    <span>${Product.price}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h6>Quantity</h6>
                                                    <select onChange={(e) => setqty(Number(e.target.value))} value={qty} disabled={Product.countInStock <= 0} className="rounded">
                                                        {
                                                            [...new Array(Product.countInStock).keys()].map((x) => {
                                                                return <option key={x} value={x+1}>{x+1}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h6>Status</h6>
                                                    <h6 className={Product.countInStock > 0 ? "text-success" : "text-danger"} >{Product.countInStock > 0 ? "In Stock" : "Out of Stock"}</h6>
                                                </div>
                                                <button disabled={Product.countInStock <= 0} className="btn border border-secondary btn-warning w-100" onClick={CartHandler}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}