import { Link, useNavigate } from "react-router-dom";

export default function Header({cartItems, setcartItems}) {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const LogOut = () => {
        localStorage.removeItem("userInfo")
        localStorage.removeItem("cartItems")
        localStorage.removeItem("token")
        setcartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
        navigate("/login")
        return
    }


    return (
        <header style={{ zIndex: "100", position: 'relative' }} className='bg-dark d-flex p-2 text-light justify-content-between align-items-center'>
            <div className="logo">
                <Link to="/" className="text-light">
                    <h3 className='fw-bold'>amazona</h3>
                </Link>
            </div>
            <div className="icons d-flex align-items-center gap-4">
                <Link className="link_hover text-light" to={"/cart"}>
                    <span className="position-relative">
                        <i className="fa-brands link text-light fa-opencart fs-4"></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{background:"#ff8000"}}>
                            {cartItems.length}
                        </span>
                    </span>
                </Link>
                <button onClick={token ? LogOut : () => navigate("/login")} className='btn fw-bold btn-warning bg-gradient'>{token ? "SignOut" : 'SingIn'}</button>
            </div>
        </header>
    )
}