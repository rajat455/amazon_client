import { useEffect, useState } from "react";
import validation from "../Commen/Validater";
import apiHelper from "../Commen/ApiHelper";
import { useLocation, useNavigate } from "react-router-dom";
import Message from "../Component/Message";
import Loader from "../Component/Loader";

export default function RegisterScreen() {
    const navigate = useNavigate()
    const location = useLocation()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token) {
            navigate(-1)
            return
        }
        // eslint-disable-next-line
    }, [navigate]);
    const [isLoading, setisLoading] = useState(false);
    document.title = "Register"
    const [userInfo, setuserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const [RegisterErrors, setRegisterErrors] = useState([]);
    const [isSubmited, setisSubmited] = useState(false);
    const [err, seterr] = useState("");
    const ChangeHandler = (e) => {
        const tmp = { ...userInfo }
        tmp[e.target.id] = e.target.value
        setuserInfo({ ...tmp })
        if (isSubmited) {
            const validationResult = validation(tmp, "register")
            setRegisterErrors(validationResult)
        }
        return
    }


    const RegisterHandler = async () => {
        try {
            setisSubmited(true)
            const validationResult = validation(userInfo, "register")
            if (validationResult.length > 0) {
                return setRegisterErrors(validationResult)
            }
            setisLoading(true)
            const result = await apiHelper.RegisterUser(userInfo)
            const user = result.data.user
            localStorage.setItem("userInfo", JSON.stringify(user))
            localStorage.setItem("token", user.token)
            if(!location.search){
                navigate("/")
                return
            }else{
                const path = location.search.split("?redirect=")[1]
                navigate(`/${path}?redirect=paymentMethod`)
            }
            setisLoading(false)

        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.status === 400 && error.response.data) {
                if (error.response.data.errors) {
                    setRegisterErrors(error.response.data.errors)
                    return
                } else {
                    seterr(error.response.data.message)
                    return
                }
            } else {
                seterr(error.message)
            }
        }
    }


    return (
        <>
            {
                err ? (
                    <Message error={true} >{err}</Message>
                ) : (
                    <div className="container pt-2 pb-3">
                        <Loader loading={isLoading} />
                        <h3 className="fw-bold text-center" style={{ textDecoration: "underline", textDecorationColor: "#ffc107" }}>amazona</h3>
                        <hr className="mb-3" />
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-6">
                                <div className="shadow rounded p-3">
                                    <h5 className="fs-2 fw-normal mb-4">Create account</h5>
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <label htmlFor="firstName">Firstname</label>
                                            <input onKeyUp={ChangeHandler} type="text" id="firstName" className="input rounded" />
                                            {
                                                RegisterErrors.find((x) => x.key === "firstName") ? <span className="text-danger">{RegisterErrors.find((x) => x.key === "firstName").message}</span> : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="lastName">Lastname</label>
                                            <input onChange={ChangeHandler} type="text" id="lastName" className="input rounded" />
                                            {
                                                RegisterErrors.find((x) => x.key === "lastName") ? <span className="text-danger">{RegisterErrors.find((x) => x.key === "lastName").message}</span> : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="email">Email</label>
                                            <input onChange={ChangeHandler} type="text" id="email" className="input rounded" />
                                            {
                                                RegisterErrors.find((x) => x.key === "email") ? <span className="text-danger">{RegisterErrors.find((x) => x.key === "email").message}</span> : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="password">Password</label>
                                            <input onChange={ChangeHandler} type="password" id="password" className="input rounded" />
                                            {
                                                RegisterErrors.find((x) => x.key === "password") ? <span className="text-danger">{RegisterErrors.find((x) => x.key === "password").message}</span> : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="confirm_password">Confirm-Password</label>
                                            <input onChange={ChangeHandler} type="password" id="confirm_password" className="input rounded" />
                                            {
                                                RegisterErrors.find((x) => x.key === "confirm_password") ? <span className="text-danger">{RegisterErrors.find((x) => x.key === "confirm_password").message}</span> : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-3">
                                            <button onClick={RegisterHandler} className="bg-gradient w-100 border border-secondary btn btn-warning">
                                                Sign Up
                                            </button>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="d-flex gap-1 justify-content-center align-items-center">
                                                <hr className="d-block" style={{ width: "2rem" }} />
                                                <i className="fw-normal" style={{ fontSize: "0.9rem" }}>
                                                    Allready have an account?
                                                </i>
                                                <hr className="d-block" style={{ width: "2rem" }} />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <button onClick={() => navigate("/login")} className="bg-gradient w-100 border border-secondary btn btn-light">
                                                Sing In
                                            </button>
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