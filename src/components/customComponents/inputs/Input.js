import PropTypes from "prop-types";

export const LoginInput = ({
    onChange,
    value,
    name,
    id,
    InputType,
    placeholder
  }) => {
    return (
        <>
          <input 
            id={id}  
            className="form-control form-control-xl"
            name={name}
            type={InputType}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
          
            />
          </>
     
    );
  }
  
  LoginInput.propTypes = {
    //labelText: PropTypes.string,
    //defaultSelectText: PropTypes.string,
    //arrayData: PropTypes.array.isRequired,
    // btnClass: PropTypes.string,
    // isLoading: PropTypes.bool,
    // btnColor: PropTypes.string.isRequired,
  };

export const Input1 = ({
    onChange,
    value,
    name,
    id,
    InputType,
    placeholder
  }) => {
    return (
        <>
          <input 
            id={id}  
            className="form-control"
            name={name}
            type={InputType}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
          
            />
          </>
     
    );
  }
  
  Input1.propTypes = {
    //labelText: PropTypes.string,
    //defaultSelectText: PropTypes.string,
    //arrayData: PropTypes.array.isRequired,
    // btnClass: PropTypes.string,
    // isLoading: PropTypes.bool,
    // btnColor: PropTypes.string.isRequired,
  };


export const TextArea = ({
    onChange,
    value,
    name,
    id,
    placeholder,
    label,
    rows
  }) => {
    return (
        <>
        <div className="form-group">
         <label htmlFor="basicInput"><h6>{label}</h6></label>
         <br/>
          <textarea 
            id={id}  
            className="form-control"
            name={name}
            type="textarea"
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            rows={rows}
          
            ></textarea>
            </div>
          </>
     
    );
  }
  
  TextArea.propTypes = {
    //labelText: PropTypes.string,
    //defaultSelectText: PropTypes.string,
    //arrayData: PropTypes.array.isRequired,
    // btnClass: PropTypes.string,
    // isLoading: PropTypes.bool,
    // btnColor: PropTypes.string.isRequired,
  };

 

export const ModalInput = ({
  onChange,
  value,
  name,
  id,
  InputType,
  placeholder,
  label

}) => {
  return (
        
         <div className="form-group">
         <label htmlFor="basicInput"><h6>{label}</h6></label>
         <input 
               type={InputType}
               className="form-control" 
               value={value} 
               onChange={onChange} 
               id={id} name={name} 
               placeholder={placeholder}
               />
        </div>
      
   
  );
}

ModalInput.propTypes = {
  //labelText: PropTypes.string,
  //defaultSelectText: PropTypes.string,
  //arrayData: PropTypes.array.isRequired,
  // btnClass: PropTypes.string,
  // isLoading: PropTypes.bool,
  // btnColor: PropTypes.string.isRequired,
};

export const ModalSelect = ({
  label,
  arrayData,
  defaultSelectText,
  onChange,
  value,
  name,
  id,
  

}) => {
  return (
        

        <>
        <label className="form-label" htmlFor={label}><h6>{label}</h6></label>
          <select 
            id={id}  
            className="select2 form-select"
            name={name}
            //type="select"
            onChange={onChange}
            value={value}
          >
            <option>
              {defaultSelectText
                ? `---------${defaultSelectText}--------`
                : "----------Select---------"}
            </option>
            {arrayData.map((data, index) => (
              <option key={index} value={data.value || data.label}>
                {data.label}
              </option>
            ))}
          </select>
          </>
      
   
  );
}

ModalSelect.propTypes = {
  //labelText: PropTypes.string,
  //defaultSelectText: PropTypes.string,
  //arrayData: PropTypes.array.isRequired,
  // btnClass: PropTypes.string,
  // isLoading: PropTypes.bool,
  // btnColor: PropTypes.string.isRequired,
};

