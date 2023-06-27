export default function Steps(props) {

    const { Shipping, payment, checkout } = props

    return <>
        <div className="row mb-3">
            <div className="col-4 px-1">
                <div className={Shipping ? "border-4 text-warning fw-bold border-top border-warning" : "border-4 text-muted fw-bold border-top border-muted"}>
                    Shipping
                </div>
            </div>
            <div className="col-4 px-1">
                <div className={payment ? "border-4 text-warning fw-bold border-top border-warning" : "border-4 text-muted fw-bold border-top border-muted"}>
                    Payment-Method
                </div>
            </div>
            <div className="col-4 px-1">
                <div className={checkout ? "border-4 text-warning fw-bold border-top border-warning" : "border-4 text-muted fw-bold border-top border-muted"}>
                    Checkout
                </div>
            </div>
        </div>
    </>
}