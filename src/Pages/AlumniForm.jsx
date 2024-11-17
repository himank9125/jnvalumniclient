import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PhotoCamera, FileUpload, Close } from "@mui/icons-material";
import Webcam from "react-webcam";
import logo from "../asset/jnv.png";
import axios from "axios";
import MuiPhoneNumber from "mui-phone-number";
import StudentIDCard from "./StudentIdCard";
import CircularProgress from "@mui/material/CircularProgress";

const AlumniForm = () => {
  const [joinings, setJoinings] = useState([]);
  const [passings, setPassings] = useState([]);
  const [isRegistered, setIsregistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const todayIs = new Date();
  const currentYear = todayIs?.getFullYear();

  useEffect(() => {
    let start = 2002;
    const joiningsArr = [];
    const passingsArr = [];
    while (start <= currentYear) {
      if (start <= currentYear - 7) {
        joiningsArr.push(start);
      }
      if (start >= 2009) {
        passingsArr.push(start);
      }
      start++;
    }
    setJoinings(joiningsArr);
    setPassings(passingsArr);
  }, [currentYear]);

  const [formData, setFormData] = useState({
    studentName: "",
    joiningYear: "",
    passingYear: "",
    phoneNumber: "",
    profession: "",
    workingLocation: "",
    permanentAddress: "",
    email: "",
    photo: null,
  });

  const [photoError, setPhotoError] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log("File Base64:", base64String);
        setFormData((prev) => ({ ...prev, photo: base64String }));
        setOpenCamera(false);
      };
      reader.readAsDataURL(file); // Converts the file to Base64
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imageSrc", imageSrc);
    setFormData((prev) => ({ ...prev, photo: imageSrc }));
    setOpenCamera(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData?.photo) {
      setPhotoError(true);
      return;
    }

    const payload = {
      studentName: formData?.studentName,
      joiningYear: formData?.joiningYear,
      passingYear: formData?.passingYear,
      phoneNumber: formData?.phoneNumber,
      profession: formData?.profession,
      workingLocation: formData?.workingLocation,
      permanentAddress: formData?.permanentAddress,
      email: formData?.email,
      photo: formData?.photo,
    };
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}/alumni/register`, payload)
      .then(() => {
        console.log("success");
        setIsregistered(true);
        setLoading(false);
      })
      .catch(() => {
        setIsregistered(false);
        setLoading(false);
        console.log("failed");
      });
  };

  const handlePhoneNumber = (value, data) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  return (
    <Box>
      {isRegistered ? (
        <StudentIDCard student={formData} />
      ) : (
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 5,
            p: 3,
            border: { sm: "0.5px solid #ddd" },
            borderRadius: 2,
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <img
              src={logo} // Replace with the correct logo path
              alt="Logo"
              style={{ maxWidth: "150px", height: "auto" }}
            />
          </Box>

          {/* Title */}
          <Typography variant="h5" gutterBottom textAlign="center">
            JNV Kaushambi Alumni Registration
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Joining Year</InputLabel>
                  <Select
                    label="Joining Year"
                    name="joiningYear"
                    value={formData.joiningYear}
                    onChange={handleChange}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    {joinings?.map((year) => (
                      <MenuItem value={year} key={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Passing Year</InputLabel>
                  <Select
                    label="Passing Year"
                    name="passingYear"
                    value={formData.passingYear}
                    onChange={handleChange}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    {passings?.map((year) => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            /> */}
                <FormControl fullWidth>
                  <MuiPhoneNumber
                    defaultCountry={"in"}
                    fullWidth
                    variant="outlined"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                    onChange={(value, countryData) =>
                      handlePhoneNumber(value, countryData)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Working Location"
                  name="workingLocation"
                  value={formData.workingLocation}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Permanent Address"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email ID"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Upload or Capture Photo*:
                </Typography>
                {photoError && (
                  <Typography sx={{ fontSize: 10, color: "red" }} gutterBottom>
                    Please upload your recent photo:
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  onClick={() => {
                    setOpenCamera(true);
                    setPhotoError(false);
                  }}
                  sx={{ mt: 1, borderRadius: 2 }}
                >
                  Open Camera
                </Button>
              </Grid>
              <Grid item xs={12}>
                {formData.photo && (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "200px",
                      marginTop: "10px",
                      borderRadius: "8px",
                      objectFit: "contain",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: 6, textTransform: "none" }}
                  disabled={loading}
                >
                  Submit {loading && <CircularProgress size={16} />}
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Camera Modal */}
          <Dialog
            open={openCamera}
            fullScreen
            onClose={() => setOpenCamera(false)}
          >
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#000",
                color: "#fff",
                position: "relative",
              }}
            >
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{
                  width: "100%",
                  maxHeight: "70vh",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Fab
                  color="primary"
                  aria-label="capture"
                  onClick={handleCapture}
                  sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)" }}
                >
                  <PhotoCamera />
                </Fab>
                <label htmlFor="file-upload">
                  <input
                    type="file"
                    id="file-upload"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Fab
                    color="secondary"
                    aria-label="upload"
                    component="span"
                    sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)" }}
                  >
                    <FileUpload />
                  </Fab>
                </label>
              </Box>
              <IconButton
                onClick={() => setOpenCamera(false)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <Close />
              </IconButton>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default AlumniForm;
