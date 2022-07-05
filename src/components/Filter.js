const Filter = (props) => {
    return (
        <div>filter shown with
        <input value={props.filterName} onChange={props.handleNameFilter}/>
        </div>
    )
}

export default Filter