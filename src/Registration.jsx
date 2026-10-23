    import { useState } from 'react';
    import './Registration.css';
    import logo from "./assets/New Logo1.png";
    function Registration(){
        const[formData,setFormData]=useState({
            name:"",
            lastname:"mathi",
            dob:"",
            gender:"",
            email:"",
            mobile:"",
            tenth:"",
            tenthyear:"",
            twelfth:"",
            twelfthyear:""
        });
        const [errors, setErrors] = useState({});
        const [submitted,setSubmitted]=useState(false);  
        function handleChange(event){
            const{id,value} = event.target;
            console.log(id,value);
            setFormData({
                ...formData,
                [id]:value,
            });
            /*if(id==="name"){
                console.log("First Name:",value);
            }
            if(id==="lastname"){
                console.log("Last Name:",value);
            }
            if(id==="dob"){
                console.log("Date of Birth:",value);
            }
           if(id==="gender"){
            console.log("Gender:",value);
           }
          if(id==="email"){
            console.log("Email Id:",value);
          }
          if(id==="mobile"){
            console.log("Mobile Number:",value);
          }*/
        }
        function validateForm(){
        let newErrors = {};
        const{
            name,lastname,dob,gender,email,mobile,tenth,tenthyear,twelfth,twelfthyear,
        }=formData;
        /* First Name Validation*/
        const firstname = name.trim();
        if(firstname===""){
            newErrors.name="Name is Required";
        }
        else if(!/^[A-Za-z]+$/.test(firstname)){
            newErrors.name="Name should contain only Alphabets"
        }
        /* Last Name Validation*/
        if(lastname===""){
            newErrors.lastname="Last Name is Required ";
        }
        else if(!/^[A-Za-z]+$/.test(lastname)){
            newErrors.lastname="Last Name should contain only Alphabets"
        }
        /* Date of Birth Validation*/
        if(dob===""){
            newErrors.dob="Date of Birth is Required";
        }
        else{
            const birthdate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear();
            const monthDifference= today.getMonth() -birthdate.getMonth();
            if(
                monthDifference < 0 ||(monthDifference === 0 &&today.getDate < birthdate.getDate())
            ){
                age--;
            }
            if(age < 17 || age > 25){
                newErrors.dob="Age Must be between 17 to 25"
            }
        }
        /* Gender Validation*/
        if(gender===""){
            newErrors.gender="Please Select Your Gender";
        }
        /*Email Validation*/
        if(email===""){
            newErrors.email="Email is Required";
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            newErrors.email="Enter a Valid Email Address";
        }
        /* Mobile Number validation*/
        if(mobile===""){
            newErrors.mobile="Mobile Number is Required";
        }
        else if(!/^[6-9][0-9]{9}$/.test(mobile)){
            newErrors.mobile="Enter a Valid 10 Digit Number"
        }
        /* 10th Percentage Validation */
        if(tenth===""){
            newErrors.tenth="Xth Percentage is Required";
        }
        else if(tenth < 45 || tenth > 100){
            newErrors.tenth="Percentage must be between 45 to 100";
        }
        /* 10th Year of Passing Validation */
        if(tenthyear===""){
            newErrors.tenthyear="Xth Passing Year is Required";
        }
        else if(dob!==""){
            const tenthpassingyear = Number(tenthyear.substring(0,4));
            const birthyear = new Date(dob).getFullYear();
            const ageat10th = tenthpassingyear - birthyear;
            const currentyear = new Date().getFullYear();
            if(ageat10th < 15){
                newErrors.tenthyear ="Student must be atleast 15 years old when passing 10th";
            }
            else if(tenthpassingyear > currentyear){
                newErrors.tenthyear="10th Passing Year cannot be in future";
            }
        }
        /* 12th Percentage Validation */
        if(twelfth===""){
            newErrors.twelfth="XIIth Percentage is Required";
        }
        else if(twelfth < 45 || twelfth > 100){
            newErrors.twelfth="Percentage must be between 45 to 100";
        }
        /* 12th Year of Passing Validation*/
        if(twelfthyear===""){
            newErrors.twelfthyear="XIIth Passing Year is Required";
        }
        else if(dob!=="" && tenthyear!==""){
            const twelfthpassingyear = Number(twelfthyear.substring(0,4));
            const tenthpassingyear = Number(tenthyear.substring(0,4));
            const birthyear = new Date(dob).getFullYear();
            const ageat12th = twelfthpassingyear - birthyear;
            const currentyear = new Date().getFullYear();
            if(twelfthpassingyear <= tenthpassingyear){
                newErrors.twelfthyear="12th Passing Year must be after 10th Passing year";
            }
            else if(ageat12th < 17){
                newErrors.twelfthyear="Student must be atleast 17 Years old when Passing 12th";
            }
            else if(twelfthpassingyear > currentyear){
                newErrors.twelfthyear="12th Passing Year cannot be in future";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
        function handleSubmit(event){
            event.preventDefault();
            const isValid = validateForm();
            if(isValid){
                setSubmitted(true);
            }
        }
        function handleReset(){
            setFormData({
                name:"",
                lastname:"",
                dob:"",
                gender:"",
                email:"",
                mobile:"",
                tenth:"",
                tenthyear:"",
                twelfth:"",
                twelfthyear:""
                });
                setErrors({});
                setSubmitted(false);
        }
        function formatDate(date){
            if(!date){
                return "";
            }
            const parts =date.split("-");
            if(parts.length !== 3){
                return date;
            }
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        function formatMonth(month){
            if(!month){
                return "";
            }
            const parts =month.split("-");
            if(parts.length !== 2){
                return month;
            }
            return `${parts[1]}/${parts[0]}`;
        }
        if(submitted){
            return(
                <div className='details-page'>
                    <div className='details-card'>
                        <div className='details-header'>
                            <img src={logo} alt='DSA College Logo'/>
                            <h1>DSA COLLEGE</h1>
                            <p>Student Registration Details</p>
                        </div>
                        <hr/>
                        <h2>Personal Details</h2>
                        <div className='details-grid'>
                            <div>
                                <strong>First Name</strong>
                                <p>{formData.name}</p>
                            </div>
                            <div>
                                <strong>Last Name</strong>
                                <p>{formData.lastname}</p>
                            </div>
                            <div>
                                <strong>Date of Birth</strong>
                                <p>{formatDate(formData.dob)}</p>
                            </div>
                            <div>
                                <strong>Gender</strong>
                                <p>{formData.gender}</p>
                            </div>
                            <div>
                                <strong>Email Id</strong>
                                <p>{formData.email}</p>
                            </div>
                            <div>
                                <strong>Mobile Number</strong>
                                <p>{formData.mobile}</p>
                            </div>
                        </div>
                        <h2>Academic Information </h2>
                        <div className='details-grid'>
                            <div>
                                <strong>Xth Percentage</strong>
                                <p>{formData.tenth}</p>
                            </div>
                            <div>
                                <strong>Xth Year of Passing</strong>
                                <p>{formatMonth(formData.tenthyear)}</p>
                            </div>
                            <div>
                                <strong>XIIth Percentage</strong>
                                <p>{formData.twelfth}</p>
                            </div>
                            <div>
                                <strong>XIIth Year of Passing</strong>
                                <p>{formatMonth(formData.twelfthyear)}</p>
                            </div>
                        </div>
                        <div className='details-footer'>
                            <p>Student Registration Successfully Completed</p>
                        </div>
                        <div className='details-buttons'>
                            <button onClick={()=> window.print()}>Print/Save as PDF</button>
                            <button onClick={()=>setSubmitted(false)}>Back to Form</button>
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <>
            <section className="page-heading">
                <h1>Student Registration</h1>
                <p>Welcome to DSA College Admission Portal</p>
            </section>
            <div className="formcontainer">
                <form id="studentform" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h2 className="formsection-title"><span className="formsection-number">1</span>Personal Details</h2>
                        <div className="form-grid">
                            {/*First Name Field*/}
                            <div className="field">
                                <label><span className='required'>*</span>First Name</label>
                                <input type="text" id="name" placeholder="Enter Your First Name" value={formData.name} onChange={handleChange}/>
                                <span className='error'>{errors.name}</span>
                            </div>
                            {/*Last Name Field*/}
                            <div className="field">
                                <label><span className='required'>*</span>Last Name</label>
                                <input type="text" id="lastname" placeholder="Enter Your Last Name"value={formData.lastname} onChange={handleChange}/>
                                <span className='error'>{errors.lastname}</span>
                            </div>
                            {/*Date of Birth Field*/}
                            <div className='field'>
                                <label><span className='required'>*</span>Date of Birth</label>
                                <input type='date' id='dob'value={formData.dob} onChange={handleChange}/>
                                <span>{errors.dob}</span>
                            </div>
                            {/*Gender Field*/}
                            <div className='field'>
                                <label><span className='required'>*</span>Gender</label>
                                <select id='gender' value={formData.gender} onChange={handleChange}>
                                    <option value={""}>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                                <span className='error'>{errors.gender}</span>
                            </div>
                            {/*Email Id Field*/}
                            <div className='field'>
                                <label><span className='required'>*</span>Email Id</label>
                                <input type='email' id='email' placeholder='Enter Your Email' value={formData.email} onChange={handleChange}/>
                                <span className='error'>{errors.email}</span>
                            </div>
                            {/*Moblie Number Field*/}
                            <div className='field'>
                                <label><span className='required'>*</span>Mobile Number</label>
                                <input type='tel' id='mobile' placeholder='Enter 10 Digit Mobile Number' value={formData.mobile} onChange={handleChange}/>
                                <span className='error'>{errors.mobile}</span>
                            </div>
                        </div>
                    </div>
                    <div className='form-section'>
                        <h2 className='formsection-title'><span className='formsection-number'>2</span>Academic Information</h2>
                        <div className='form-grid'>
                            {/*10th Percentage*/}
                            <div className='field'>
                                <label><span className='required'>*</span>Xth Percentage</label>
                                <input type='number' id='tenth' placeholder='Enter Your 10th Percentage' min={0} step={0.01} value={formData.tenth} onChange={handleChange}/>
                                <span className='error'>{errors.tenth}</span>
                            </div>
                            {/*10th Year of Passing Field*/}
                            <div className='field'>
                                <label><span className='required'>*</span>Xth Year of Passing</label>
                                <input type='month' id='tenthyear'value={formData.tenthyear} onChange={handleChange}/>
                                <span className='error'>{errors.tenthyear}</span>
                            </div>
                            {/*12th Percentage*/}
                            <div className='field'>
                                <label><span className='required'>*</span>XIIth Percentage</label>
                                <input type='number' id='twelfth' placeholder='Enter Your 12th Percentage' min={0} step={0.01} value={formData.twelfth} onChange={handleChange}/>
                                <span className='error'>{errors.twelfth}</span>
                            </div>
                            {/*12th Year of Passing Field*/}
                            <div className='field'>
                                <label><span className='required'>*</span>XIIth Year of Passing</label>
                                <input type='month' id='twelfthyear' value={formData.twelfthyear} onChange={handleChange}/>
                                <span className='error'>{errors.twelfthyear}</span>
                            </div>
                        </div>
                    </div>
                    <div className='button-area'>
                        <button type='submit'>Submit Application</button>
                        <button type='button' onClick={handleReset}>Reset</button>
                    </div>  
                </form>
            </div>  
            </>
        )
    }
    export default Registration;