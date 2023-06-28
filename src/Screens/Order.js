import { useParams } from "react-router-dom"

export default function OrderScreen(){
    const {orderId} = useParams()
    return (
        <h1>This is order #{orderId}</h1>
    )
}