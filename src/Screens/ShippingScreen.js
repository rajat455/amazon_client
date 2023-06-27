import { useEffect, useState } from "react";
import Loader from "../Component/Loader";
import Steps from "../Component/Steps";
import { useNavigate } from "react-router-dom";
import validation from "../Commen/Validater";
import Message from "../Component/Message";

export default function ShippingScreen() {
    const redirect = window.location.search.split("?redirect=")[1]
    const token = localStorage.getItem("token")
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    const [isSubmited, setisSubmited] = useState(false);
    const navigate = useNavigate()
    const [Err, setErr] = useState("");
    const [ValidationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        if (!token || !userInfo) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, []);


    const [Address, setAddress] = useState(JSON.parse(localStorage.getItem("userInfo") || "{}").address || {
        pincode: "",
        city: "",
        state: "",
        phone: "",
        fullName: "",
    });

    const AddressHandler = () => {
        try {
            setisSubmited(true)
            let validationResult = validation(Address, "address")
            if (validationResult.length > 0) {
                setValidationErrors(validationResult)
                return
            }
            userInfo.address = Address
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
            if (!redirect) {
                navigate("/")
            } else {
                navigate(`/${redirect}`)
            }
        } catch (error) {
            setErr(error.message)
        }
    }






    return (
        <>
            {
                Err && Err.length > 0 ? (
                    <Message>{Err}</Message>
                ) : (
                    <div className="container pt-5 pb-3">
                        {
                            redirect && <Steps Shipping={true} />
                        }
                        <Loader loading={false} />
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-6">
                                <div className="shadow rounded p-3">
                                    <h5 className="fs-2 fw-normal mb-4">Shipping Info</h5>
                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-2">
                                            <label htmlFor="fullName">Fullname</label>
                                            <input value={Address.fullName} type="text" id="fullName" className="input rounded" onChange={(e) => {
                                                setAddress({ ...Address, fullName: e.target.value })
                                                if(isSubmited){
                                                   const validationResult =  validation({...Address, fullName:e.target.value}, "address")
                                                    setValidationErrors(validationResult)
                                                }


                                            }} />
                                            {
                                                ValidationErrors.find((x) => x.key === "fullName") ? (
                                                    <span className="text-danger">{
                                                        ValidationErrors.find((x) => x.key === "fullName")?.message
                                                    }</span>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="col-12 col-md-6 mb-2">
                                            <label htmlFor="phone">Phone</label>
                                            <div className="position-relative d-flex align-items-center">
                                                <span className="text-center d-flex align-items-center px-1" style={{ position: 'absolute', left: "2px", borderRight: "1px solid gray", height: "100%" }}>+91</span>
                                                <input value={Address.phone} type="text" id="phone" className="input rounded" style={{ paddingLeft: "3rem" }} maxLength={10} onChange={(e) => {
                                                    setAddress({ ...Address, phone: e.target.value })
                                                    if(isSubmited){
                                                        const validationResult =  validation({...Address, phone:e.target.value},"address")
                                                         setValidationErrors(validationResult)
                                                     }
                                                }} />
                                            </div>
                                            {
                                                ValidationErrors.find((x) => x.key === "phone") ? (
                                                    <span className="text-danger">{
                                                        ValidationErrors.find((x) => x.key === "phone")?.message
                                                    }</span>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="col-12 col-md-6 mb-2">
                                            <label htmlFor="city">City</label>
                                            <input value={Address.city} type="text" id="city" className="input rounded" onChange={(e) => {
                                                setAddress({ ...Address, city: e.target.value })
                                                if(isSubmited){
                                                    const validationResult =  validation({...Address, city:e.target.value},"address")
                                                     setValidationErrors(validationResult)
                                                 }
                                            }} />
                                            {
                                                ValidationErrors.find((x) => x.key === "city") ? (
                                                    <span className="text-danger">{
                                                        ValidationErrors.find((x) => x.key === "city")?.message
                                                    }</span>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="col-12 col-md-6 mb-2">
                                            <label htmlFor="state">State</label>
                                            <input value={Address.state} type="text" id="state" className="input rounded" onChange={(e) => {
                                                setAddress({ ...Address, state: e.target.value })
                                                if(isSubmited){
                                                    const validationResult =  validation({...Address, state:e.target.value}, "address")
                                                     setValidationErrors(validationResult)
                                                 }
                                            }} />
                                            {
                                                ValidationErrors.find((x) => x.key === "state") ? (
                                                    <span className="text-danger">{
                                                        ValidationErrors.find((x) => x.key === "state")?.message
                                                    }</span>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="pincode">Pincode</label>
                                            <input value={Address.pincode} type="text" id="pincode" maxLength={6} className="input rounded" onChange={(e) => {
                                                setAddress({ ...Address, pincode: e.target.value })
                                                if(isSubmited){
                                                    const validationResult =  validation({...Address, pincode:e.target.value},"address")
                                                     setValidationErrors(validationResult)
                                                 }
                                            }} />
                                            {
                                                ValidationErrors.find((x) => x.key === "pincode") ? (
                                                    <span className="text-danger">{
                                                        ValidationErrors.find((x) => x.key === "pincode")?.message
                                                    }</span>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="address">Address</label>
                                            <textarea value={Address.address} className="input rounded" rows="5" id="address" onChange={(e) => {
                                                setAddress({ ...Address, address: e.target.value })
                                                if(isSubmited){
                                                    const validationResult =  validation({...Address, address:e.target.value},"address")
                                                     setValidationErrors(validationResult)
                                                 }
                                            }} />
                                            {
                                                ValidationErrors.find((x) => x.key === "address") ? (
                                                    <span className="text-danger">{
                                                        ValidationErrors.find((x) => x.key === "address")?.message
                                                    }</span>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-3">
                                            <button onClick={AddressHandler} className="bg-gradient w-100 border border-secondary btn btn-warning">
                                                Submit
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