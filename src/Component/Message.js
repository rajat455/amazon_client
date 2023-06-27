export default function Message({ children }) {
    if (children) {
        return (
            <div  style={{ color: "#a7002e", background: "#fcd8e2",width:"99%", margin:"0.5rem auto" }} className="d-block p-2 rounded-3">
                <div dangerouslySetInnerHTML={{__html:children}} className="mb-0"/>
            </div>
        )
    }
    return <></>
}