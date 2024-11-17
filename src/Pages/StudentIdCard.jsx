import React, { useRef } from "react";
import { Box, Typography, Avatar, Divider, Button } from "@mui/material";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import logo from "../asset/jnv.png";

const StudentIDCard = ({ student }) => {
  const cardRef = useRef();

  const downloadAsJpg = () => {
    if (cardRef.current) {
      domtoimage
        .toJpeg(cardRef.current, { quality: 0.95 })
        .then((dataUrl) => {
          saveAs(dataUrl, `${student.studentName}_ID_Card.jpg`);
        })
        .catch((err) => {
          console.error("Error generating image:", err);
        });
    }
  };

  const {
    studentName,
    joiningYear,
    passingYear,
    phoneNumber,
    profession,
    workingLocation,
    permanentAddress,
    email,
    photo,
  } = student;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f1f1f1",
        padding: "16px",
      }}
    >
      {/* ID Card */}
      <Box
        ref={cardRef}
        sx={{
          maxWidth: 350,
          width: "100%",
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          background: "#f9f9f9",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "#0047AB",
            color: "#fff",
            paddingX: "6px",
            paddingY: "10px",
            borderRadius: "8px 8px 0 0",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              backgroundColor: "#0047AB",
              color: "#fff",
              borderRadius: "8px 8px 0 0",
            }}
          >
            {/* Logo */}
            <Avatar src={logo} alt="JNV Logo" sx={{ width: 40, height: 40 }} />

            {/* Heading */}
            <Typography variant="h6" fontWeight="bold">
              JNV Kaushambi Alumni
            </Typography>
          </Box>
          <Typography variant="subtitle2">Alumni ID Card</Typography>
        </Box>

        {/* Profile Section */}
        <Avatar
          src={photo || "/path/to/default-avatar.png"}
          alt={studentName}
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto",
            border: "2px solid #0047AB",
          }}
        />
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          {studentName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {profession || "Not specified"}
        </Typography>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Student Details */}
        <Box sx={{ textAlign: "left", px: 1 }}>
          <Typography variant="body2">
            <strong>Joining Year:</strong> {joiningYear || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Passing Year:</strong> {passingYear || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {email || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> {phoneNumber || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Working Location:</strong> {workingLocation || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Address:</strong> {permanentAddress || "N/A"}
          </Typography>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: "#0047AB",
            color: "#fff",
            padding: "5px",
            borderRadius: "0 0 8px 8px",
            marginTop: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="caption">
            © JNV Kaushambi Alumni Association
          </Typography>
        </Box>
      </Box>

      {/* Download Button */}
      <Button
        variant="contained"
        onClick={downloadAsJpg}
        sx={{
          mt: 3,
          background: "linear-gradient(90deg, #1a73e8, #0047ab)",
          color: "#fff",
          fontWeight: "bold",
          textTransform: "uppercase",
          borderRadius: "20px",
          paddingX: "20px",
          paddingY: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease-in-out",
          textTransform: "none",
          "&:hover": {
            background: "linear-gradient(90deg, #0047ab, #1a73e8)",
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
          },
          "&:active": {
            transform: "translateY(1px)",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        📄 Download as JPG
      </Button>
    </Box>
  );
};

export default StudentIDCard;
