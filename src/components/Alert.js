const Alert = ({type , text}) => {
    return <div className={`alert alert-${type} mb-0 fs-5 text-center`}>{text}</div>
}
export default Alert;