import React, { useState } from "react";

const ViewUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  return (
    <form>
      <h2>View Properties</h2>
      <div className="container">
        <div className="row">
            <div className="col">
                <label>Name: </label> {user.name}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>Real State Type: </label> {user.real_state_type}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>Street: </label> {user.street}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>External number: </label> {user.external_number}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>Internal number: </label> {user.internal_number}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>Neighborhood: </label> {user.neighborhood}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>City: </label> {user.city}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>Country: </label> {user.country}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>Rooms: </label> {user.rooms}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>Bathrooms: </label> {user.bathrooms}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>Comments: </label> {user.comments}
            </div>
        </div>
      </div>
      {/* <div className="form-group">
        <label 
          className="form-label" 
          id="realStateType"
        >
          Real State Type
        </label>
        <select 
          className="form-select" 
          htmlFor="realStateType" 
          onChange={handleChange}
          name="real_state_type"
          defaultValue={values.real_state_type}
        >
          <option value="">--Select--</option>
          <option value="house">House</option>
          <option value="department">Department</option>
          <option value="land">Land</option>
          <option value="commercial_ground">Commercial Ground</option>
        </select>
        {errors.real_state_type && touched.real_state_type && (
            <small className='text-danger'>{errors.real_state_type}</small>   
        )}
      </div>
      <div className="form-group">
        <label>Street</label>
        <input
          type="text"
          name="street"
          value={values.street}
          onChange={handleChange}
          pattern="[a-zA-Z0-9-]+"
          maxLength="128"
          required
        />
        {errors.street && touched.street && (
            <small className='text-danger'>{errors.street}</small>   
        )}
      </div>
      <div className="form-group">
        <label>External Number</label>
        <input
          type="text"
          name="external_number"
          value={values.external_number}
          onChange={handleChange}
          pattern="/^(\+\d{1,3}[- ]?)?\d{10}$/"
          maxLength="12"
          required
        />
        {errors.external_number && touched.external_number && (
            <small className='text-danger'>{errors.external_number}</small>   
        )}
      </div>
      <div className="form-group">
        <label>Internal Number</label>
        <input
          type="text"
          name="internal_number"
          value={values.internal_number}
          onChange={handleChange}
          pattern="/^(\+\d{1,3}[- ]?)?\d{10}$/"
          maxLength="12"
          required
        />
        {errors.internal_number && touched.internal_number && (
            <small className='text-danger'>{errors.internal_number}</small>   
        )}
      </div>
      <div className="form-group">
        <label>Neighborhood</label>
        <input
          type="text"
          name="neighborhood"
          value={values.neighborhood}
          onChange={handleChange}
          pattern="[a-zA-Z0-9-]+"
          maxLength="128"
          required
        />
        {errors.neighborhood && touched.neighborhood && (
            <small className='text-danger'>{errors.neighborhood}</small>   
        )}
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
          pattern="[a-zA-Z0-9-]+"
          maxLength="64"
          required
        />
        {errors.city && touched.city && (
            <small className='text-danger'>{errors.city}</small>   
        )}
      </div>
      <div className="form-group">
        <label 
          className="form-label" 
          id="country"
        >
          Country
        </label>
        <select 
          className="form-select" 
          name="country" 
          htmlFor="Country" 
          onChange={handleChange} 
          defaultValue={values.country} 
        >
          <option>--Select--</option>
          <option value="IN">India</option>
          <option value="AF">Afghanistan</option>
          <option value="AL">Albania</option>
          <option value="DZ">Algeria</option>
        </select>
        {errors.country && touched.country && (
            <small className='text-danger'>{errors.country}</small>   
        )}
      </div>
      <div className="form-group">
        <label>Rooms</label>
        <input
          type="number"
          name="rooms"
          value={values.rooms}
          onChange={handleChange}
          required
        />
        {errors.rooms && touched.rooms && (
            <small className='text-danger'>{errors.rooms}</small>   
        )}
      </div>
      <div className="form-group">
        <label>Bathrooms</label>
        <input
          type="number"
          name="bathrooms"
          value={values.real_state_type == 'land' || values.real_state_type == 'commercial_ground' ? 0 : values.bathrooms}
          onChange={handleChange}
          required
          disabled={values.real_state_type == 'land' || values.real_state_type == 'commercial_ground' ? 0 : ''}
        />
        {errors.bathrooms && touched.bathrooms && (
            <small className='text-danger'>{errors.bathrooms}</small>   
        )}
      </div>
      <div className="form-group">
        <label>Comments</label>
        <input
          type="text"
          name="comments"
          value={values.comments}
          onChange={handleChange}
          pattern="[a-zA-Z0-9-]+"
          maxLength="128"
          required
        />
        {errors.comments && touched.comments && (
            <small className='text-danger'>{errors.comments}</small>   
        )}
      </div> */}
    </form>
  );
};

export default ViewUserForm;
