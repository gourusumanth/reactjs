import React from 'react';
const Select = ({name, label, error, options, ...rest}) => {
    return ( 
        <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} id={name} {...rest} className="form-control">
          <option value=""/>
          {options.map((option) => (
            <option key={option._id} value={option._id}>{option.name}</option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
        {/* <select  onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select> */}
      </div>
     );
}
 
export default Select;