import { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard"
import apiHelper from "../Commen/ApiHelper";
import Loader from "../Component/Loader";
import Message from "../Component/Message";

export default function HomeScreen() {
    const [products, setproduct] = useState([]);
    const [error, seterror] = useState("");
    const [loading, setloading] = useState(true);


    const getProducts = async () => {
        try {
            setloading(true)
            const result = await apiHelper.fetchProduct()
            setloading(false)
            if (result.status === 200) {
                setproduct(result.data.products)
            }
        } catch (error) {
            setloading(false)
            if(error){
                seterror(error.message)
            }
        }
    }



    useEffect(() => {
        getProducts()
    }, []);


    return (
        <>
            {
                error ? (
                    <Message error={true} >{error}</Message>
                ) : (
                    <div className="container py-3">
                        <Loader loading={loading} />
                        <h4>Feture Products</h4>
                        <div className="d-flex justify-content-center flex-wrap gap-3">
                            {
                                products && products.map((product) => {
                                    return <ProductCard key={product._id} product={product} />
                                })
                            }
                        </div>

                    </div>
                )
            }
        </>


    )
}