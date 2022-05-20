import React, { Component, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import '../Campaign/templateScroll.css'
import { isAuthenticated } from '../../Helper/Endpoints/Endpoints';
import Axios from 'axios';
import { IsoRounded } from "@material-ui/icons";
import handleDownlodButton from '../Campaign/CampaignModal'
import crossIcon from '../Images/close.png';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import TagsInput from "../TagsInput/TagsInput";
import styles from "../Signup/Signup.module.css";
import Tick from "../Images/Tick.png";
import Button from "@material-ui/core/Button";
import InputColor from "react-input-color";
import { createColor } from "material-ui-color";
import { getFormControlUnstyledUtilityClasses } from "@mui/base";
import { ToastContainer, toast } from 'react-toastify';
import Select from "react-select";
import './profile.css'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid rgba(33, 42, 64, 1)",
    backgroundColor: "#ffffff",
    color: state.isSelected
      ? "rgba(0, 0, 0, 1)"
      : "rgba(0, 0, 0, 0.3)",
    padding: 20,
  }),
  control: (_, { selectProps: { width } }) => ({
    display: "flex",
    padding: "0.5vh",
    color: "rgba(0, 0, 0, 1)",
    borderRadius: "1vh",
    backgroundColor: "#ffffff",
    height: '5.5vh',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return {
      ...provided,
      opacity,
      transition,
      color: "rgba(0, 0, 0, 0.8)",
      fontFamily: 'Montserrat',
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "rgba(36, 171, 226, 0.24)",
      color: "#24abe2",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#24abe2",
  }),
};


const { accessToken } = isAuthenticated();
export default function Profiles() {
  const [brand_name, setbrand_name] = useState("");
  const [brand_logo, setbrand_logo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [brand_colors, setbrand_colors] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  //const [industry, setIndustry] = useState("");
  const [industryOptions, setindustryOptions] = useState();
  //const [brand_font, setbrand_font] = useState("");
  const [fontOptions, setFontOptions] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");
  const [userId, setuserId] = useState("");
  const [objective, setobjectives] = useState([]);
  const [company_type, setcompany_type] = useState("Product");
  //const [tagsArray, setTagsArray] = useState([]);
  const [product, setProduct] = useState(1);
  const [color, setColor] = useState(createColor("red"));



  // const handleSelectedTags =(tags)=>{
  //   setobjectives(tags);
  // }

  const onchangeIndustry = (item) => {
    setSelectedIndustry(item);
    console.log('SELECTED INDUSTRY: ', selectedIndustry)
  };
  const onchangeFont = (item) => {
    console.log('ON CHANGE FONT: ', item)
    setSelectedFont(item);
  };

  useEffect(() => {
    const { accessToken } = isAuthenticated();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    async function getUserData() {
      fetch(`${process.env.REACT_APP_BACKEND}/get_user/`, { headers })
        .then(response => response.json())
        .then(data => {
          console.log("API CALL!")
          console.log(data)
          console.log(data.brand_colors.split(" "))

          setbrand_name(data.brand_name)
          setuserId(data.user.email)
          setbrand_colors(data.brand_colors.split(","))
          setbrand_logo(data.brand_logo)
          setLogoFile(data.brand_logo)
          setSelectedIndustry(data.industry)
          setSelectedFont(data.brand_font)
          setcompany_type(data.company_type)
          if (data.company_type === "Product") setProduct(1)
          else setProduct(0);
          setobjectives(data.objectives.split(","))
        })
    }
    getUserData();

    async function getIndustries() {
      const response_industries = await Axios.get(
        `${process.env.REACT_APP_BACKEND}/industries/`
      );
      setindustryOptions(response_industries.data);
      const response_fonts = await Axios.get(
        `${process.env.REACT_APP_BACKEND}/get_fonts/`
      );
      setFontOptions(response_fonts.data);
    }
    getIndustries();

  }, [])

  const resetUserProfile = async () => {
    const { accessToken } = isAuthenticated();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    fetch(`${process.env.REACT_APP_BACKEND}/get_user/`, { headers })
      .then(response => response.json())
      .then(data => {
        setbrand_name(data.brand_name)
        setuserId(data.user.email)
        setbrand_colors(data.brand_colors.split(","))
        setbrand_logo(data.brand_logo)
        setLogoFile(data.brand_logo)
        setSelectedIndustry(data.industry)
        setSelectedFont(data.brand_font)
        setcompany_type(data.company_type)
        if (data.company_type === "Product") setProduct(1)
        else setProduct(0);
        setobjectives(data.objectives.split(","))
        toast.success("User Profile reset successfully!", {
          position: "top-center",
          theme: "light",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })




  };


  const updateUserProfile = async () => {

    const { accessToken } = isAuthenticated();
    var industry_id = 7;
    if (selectedIndustry != null) industry_id = selectedIndustry.id;

    // var form_data = new FormData();
    // form_data.append('image_file', logoFile)
    // form_data.append('objectives', objective.toString())
    // form_data.append('brand_name', brand_name)
    // form_data.append('company_type', company_type)
    // form_data.append('industry_id', industry_id)


    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/update_user/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        'objectives': objective.toString(),
        'brand_name': brand_name,
        'company_type': company_type,
        'industry_id': industry_id,
      },

    }).then((res) => {
      console.log(res);
      toast.success("User Profile Updated successfully! Please login again for updated profile details", {
        position: "top-center",
        theme: "light",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch((err) => {
      toast.error("Error: Couldn't update user profile!", {
        position: "top-center",
        theme: "light",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    const font_ids = selectedFont.map((fontObj, index) => fontObj.id);

    var form_data2 = new FormData();
    form_data2.append('brand_colors', brand_colors.toString());
    form_data2.append('font_ids', font_ids.toString());
    form_data2.append('logo', logoFile);

    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/update_branding/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: form_data2,
    }).then((res) => {
      console.log(res);
      toast.success("User Profile Updated successfully! Please login again for updated profile details", {
        position: "top-center",
        theme: "light",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    //Commented because for update_branding the response is Account is not verified yet, even if the values are updated in admin dashboard
    // .catch((err)=>{
    //   if(err.error==="Account not approved yet"){
    //     toast.success("User Profile Updated successfully!", {
    //       position: "top-center",
    //       theme: "light",
    //       autoClose: 2500,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   }
    //   else{
    //   toast.error("Error: Couldn't update user profile!", {
    //     position: "top-center",
    //     theme: "light",
    //     autoClose: 2500,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   }
    // });
  };



  return (
    <div>
      <div style={{ width: '100%', display: 'flex', marginBottom: '4vh', justifyContent: 'space-evenly'}}>
        <div style={{ textAlign: 'left', marginTop: '10vh',  width: '40%'}}>
          <label style={{ fontFamily: 'Montserrat' }} >Brand Name</label><br></br>
          <input type="text" value={brand_name} onChange={(e) => { setbrand_name(e.target.value) }} placeholder="" style={{ height: '5.5vh', backgroundColor: '#ffffff', borderRadius: '0.7vh', border: '0vh', width: '100%', marginTop: '5px', fontFamily: 'Montserrat', paddingLeft: '1.5vh' }} />
          <br></br><br></br><br></br>

          {/* <label>Logo)</label><br></br>
                <input type="file"  value={this.state.brand_logo} onChange={(e) =>this.setState({brand_logo:e.target.value})}  placeholder="No File Chosen" style={{color:'white',padding: '5px 10px',width:'55vh',height:'6vh',backgroundColor: '#69685c',borderRadius:'1vh',border:'0vh'}}/><br></br><br></br> */}

          <label style={{ fontFamily: 'Montserrat' }} >Email</label><br></br>
          <input type="email" value={userId} onChange={(e) => setuserId(e.target.value)} placeholder="" style={{ height: '5.5vh', backgroundColor: '#ffffff', borderRadius: '0.7vh', border: '0vh', width: '100%', marginTop: '5px', fontFamily: 'Montserrat', paddingLeft: '1.5vh' }} readonly="readonly" />
          <br></br><br></br><br></br>

          <label style={{ fontFamily: 'Montserrat' }} >Your Industry</label><br></br>
          <div style={{ width: '100%', marginTop: '5px' }}>
            <Select
              styles={customStyles}
              value={selectedIndustry}
              onChange={onchangeIndustry}
              options={industryOptions}
              getOptionValue={(option) => option.industry_name}
              getOptionLabel={(option) => option.industry_name}
            />
          </div> 
          <br></br><br></br>
          
          <label style={{ fontFamily: 'Montserrat' }} > You define as a</label>
          <div style={{ marginTop: '5px' }}>
            <Button
              style={
                product === 1
                  ? {
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                    fontWeight: "100",
                    textTransform: "none",
                    height: "7vh",
                    width: "45%",
                    color: "rgba(218, 218, 218, 1)",
                    backgroundColor: "rgba(23, 31, 44, 1)",
                    borderRadius: '1vh',
                    border: "solid 1px rgba(111, 111, 111, 1)",
                    marginRight: '6.5vh',
                  }
                  : {
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                    backgroundColor: "rgba(23, 31, 44, 1)",
                    borderRadius: '1vh',
                    color: "rgba(255, 255, 255, 0.35)",
                    fontWeight: "100",
                    textTransform: "none",
                    height: "7vh",
                    width: "45%",
                    marginRight: '6.5vh',
                  }
              }
              variant="outlined"
              onClick={() => { setProduct(1); setcompany_type("Product") }}
              fullWidth={true}
            >
              {product === 1 ? (
                <img style={{ marginRight: "2vh", marginBottom: "0.5vh", height: "12px", width: "12px" }} src={Tick} alt="" />
              ) : (
                ""
              )}
              Product
            </Button>
            <Button
              style={
                product === 0
                  ? {
                    fontFamily: "Montserrat",
                    fontWeight: "100",
                    fontSize: "20px",
                    textTransform: "none",
                    height: "7vh",
                    width: "45%",
                    color: "rgba(218, 218, 218, 1)",
                    backgroundColor: "rgba(23, 31, 44, 1)",
                    borderRadius: '1vh',
                    border: "solid 1px rgba(111, 111, 111, 1)",
                  }
                  : {
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                    backgroundColor: "rgba(23, 31, 44, 1)",
                    borderRadius: '1vh',
                    color: "rgba(255, 255, 255, 0.35)",
                    fontWeight: "100",
                    textTransform: "none",
                    height: "7vh",
                    width: "45%",
                  }
              }
              variant="outlined"
              onClick={() => { setProduct(0); setcompany_type("Service") }}
              fullWidth={true}
            >
              {product === 0 ? (
                <img src={Tick} style={{ marginRight: "2vh", marginBottom: "0.5vh", height: "12px", width: "12px" }} alt="" />
              ) : (
                ""
              )}
              Service
            </Button>
          </div><br></br><br></br>

        </div>
        
        <div style={{ textAlign: 'left', marginTop: '10vh',  width: '40%' }}>

        <label style={{ fontFamily: 'Montserrat' }} >Brand Fonts</label><br></br>
          <div style={{ width: '100%', marginTop: '5px' }}>
            <Select
              styles={customStyles}
              value={selectedFont}
              onChange={onchangeFont}
              isMulti
              options={fontOptions}
              getOptionValue={(option) => option.font_name}
              getOptionLabel={(option) => option.font_name}
            />
          </div> <br></br><br></br>

          <label style={{ fontFamily: 'Montserrat' }} >Brand Color</label><br></br>
          <div style={{ marginTop: '5px', backgroundColor: '#ffffff', padding: '10px', borderRadius: '0.7vh' }}>
            <div style={{ display: "flex", flexWrap: "wrap", height: '5vh', width: '100%', overflowY: 'scroll'}}>
              {brand_colors.map((color, index) => {
                return (
                  <div style={{ width: '12vh', height: '5vh', marginRight: '2vh', backgroundColor: `${color}`, padding: '1vh', borderRadius: '7px', marginBottom: '4vh' }} key={index}>
                    <div style={{ width: '20%', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center', borderRadius: '25px', marginLeft: '80%', marginTop: '4%'}}>
                      <img src={crossIcon} width="50%" height="50%" style={{ margin: '5px 0px' }} onClick={() => {
                        var filtered = brand_colors.filter(val => val !== color)
                        setbrand_colors(filtered)
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{}}>
              <div
                style={{
                  display: "flex ",
                  marginTop: "2vh",
                  justifyContent: "space-evenly",
                }}
              >  

              <div style={{ width: '40%', display: "flex ", justifyContent: 'center', alignItems: 'center' }}>
                <InputColor
                  style={{  }}
                  initialValue="#5e72e4"
                  onChange={setColor}
                  placement="right"
                />
              </div>

              <div style={{ width: '40%', display: "flex ", justifyContent: 'center' }}>
                <Button
                  style={{
                    backgroundColor: "rgba(132, 232, 244, 1)",
                    fontFamily: 'Montserrat',
                    color: "black",
                    textTransform: "none",
                    height: "4vh",
                  }}
                  variant="contained"
                  onClick={() => {
                    if (brand_colors.indexOf(color.hex) !== -1) {
                      toast.info("Brand color already exists in user's color set!", {
                        position: "top-center",
                        theme: "light",
                        autoClose: 2500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                    else {
                      const newArray = [...brand_colors];
                      newArray.push(color.hex);
                      console.log(newArray)
                      setbrand_colors(newArray);
                      console.log(brand_colors);
                    }
                  }}
                >
                  Add
                </Button>
              </div>

              </div>
            </div>
          </div>
          <br></br><br></br>

          <label style={{ marginRight: '5%', fontFamily: 'Montserrat' }}>Brand Logo</label>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', display: 'flex', justifyContent: 'space-evenly', marginTop: '5px' }}>
            <div style={{ border: '1px solid #757576', borderRadius: '10px', width: '60%', margin: '15px 0px' }}>
              <img className="styleImage" src={brand_logo} />
            </div>

            <div style={{ width: '30%' }}>
              <div style={{ marginTop: '45%', marginLeft: '5%'}}>
                <input
                  className="Input"
                  accept="image/*"
                  id="file"
                  onChange={(e) => { setbrand_logo(URL.createObjectURL(e.target.files[0])); setLogoFile(e.target.files[0]) }}
                  multiple
                  type="file"
                />
              </div>
            </div>
          </div>

        </div>
        {/* User Tags */}
        {/* <label
                  
                  style={{ marginBottom: "1vh" }}
                >
                  Add tags to describe your brand
                </label>
                <div style={{width: '30%'}}>
                  <TagsInput selectedTags={handleSelectedTags} defaultTags={objective} />
                </div>  */}

      </div>

      <div style={{ width: '20%', textAlign: 'center', margin: '0 auto', display: 'flex' }}>
        <Button
          style={{
            backgroundColor: "rgba(132, 232, 244, 1)",
            color: 'black',
            fontFamily: "Open Sans",
            borderRadius: "5vh",
            textTransform: "none",
            height: "5vh",
            marginRight: '2vh',
          }}
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={resetUserProfile}
        >
          Reset
        </Button>
        <Button
          style={{
            backgroundColor: "rgba(132, 232, 244, 1)",
            color: "black",
            fontFamily: "Open Sans",
            borderRadius: "5vh",
            textTransform: "none",
            height: "5vh",
          }}
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={updateUserProfile}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}