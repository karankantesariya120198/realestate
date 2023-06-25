import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import useModal from "../hooks/useModal";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);
  const { isShowing, toggle } = useModal();
  
  const initialFormState = {
    name: props.currentUser.name,
    real_state_type: props.currentUser.real_state_type,
    street: props.currentUser.street,
    external_number: props.currentUser.external_number,
    internal_number: props.currentUser.internal_number,
    neighborhood: props.currentUser.neighborhood,
    city: props.currentUser.city,
    country: props.currentUser.country,
    rooms: props.currentUser.rooms,
    bathrooms: props.currentUser.bathrooms,
    comments: props.currentUser.comments,
  };

  
  const userSchema = Yup.object({
    name: Yup.string()
                    .max(128,"Name must be at least 128 characters")
                    .required("Name is required")
                    .matches(/^[A-Za-z0-9 ]+$/, "Only Alphabets, Number and Space are allowed for this field"),

    real_state_type: Yup.string()
                    .required("Real state type is required"),

    street: Yup.string()
                    .required("Please enter street")
                    .max(128, "Street must be at least 128 characters"),

    external_number: Yup.number()
                .min(12, "External number must be 12 number")
                .required("Please enter external number"),

    internal_number: Yup.number()
                  .when('real_state_type', {
                    is: (v) => v == "department" || v == "commercial_ground",
                    then: (schema) => schema.required("Please enter internal number")
                  })
                  .min(12, "External number must be 12 number"),

    
    neighborhood: Yup.string()
                  .required("Please enter neighborhood")
                  .max(128, "Neighborhood must be 12 characters"),
    
    city: Yup.string()
              .required("Please enter city")
              .max(64, "City must be 64 characters"),

    country: Yup.string()
                .required("Please select country"),

    rooms: Yup.number()
              .required("Please enter rooms"),
    
    bathrooms: Yup.number()
                  .when('real_state_type', {
                    is: (v) => v != "house" || v != "commercial_ground",
                    then: (schema) => schema.required("Please enter bathrooms")
                  }), 

    comments: Yup.string(),

  });
  
  const { values, errors, touched, setFieldValue , handleBlur, handleChange, handleSubmit } =
  useFormik({
      initialValues: initialFormState,
      validationSchema: userSchema,
      onSubmit: async (values) => {
          axios.post('http://127.0.0.1:8000/api/v1/properties/'+user.id, values).then((res)=>{
            props.updateUser(user.id, res);
          }).catch((err)=>{
            alert(err.response.data.message);
          })
      },
  });

  return (
    <form>
      <h2>Edit Properties</h2>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          maxLength={128}
          required
        />
        {errors.name && touched.name && (
            <small className='text-danger'>{errors.name}</small>   
        )}
      </div>
      <div className="form-group">
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
          maxLength={128}
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
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          maxLength={12}
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
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          maxLength={12}
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
          maxLength={128}
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
          maxLength={64}
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
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          maxLength={2}
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
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          maxLength={2}
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
          maxLength={128}
          required
        />
        {errors.comments && touched.comments && (
            <small className='text-danger'>{errors.comments}</small>   
        )}
      </div>
      <button className="modal-button" onClick={handleSubmit}>Save</button>
    </form>
  );
};

export default EditUserForm;
