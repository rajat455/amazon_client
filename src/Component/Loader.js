
export default function Loader({loading}){
    if(loading){
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{position:"fixed",minWidth:"100%",minHeight:"100vh", top:"0px", left:0, zIndex:10,background:"#fff"}}>
                <div className="loader">Loading...</div>
                <h2 className="fs-5 fw-bold" >Please Wait..</h2>
            </div>
        )
    }
    return <></>
}