import logo from "./logo.svg";
import "./App.css";
import AlumniForm from "./Pages/AlumniForm";
import StudentIDCard from "./Pages/StudentIdCard";

function App() {
  const studentInfo = {
    studentName: "John Doe",
    joiningYear: "2010",
    passingYear: "2015",
    phoneNumber: "123-456-7890",
    profession: "Software Engineer",
    workingLocation: "Bangalore, India",
    permanentAddress: "123 Main Street, Kaushambi, UP, India",
    email: "john.doe@example.com",
    photo: "https://via.placeholder.com/150", // Replace with actual photo URL
  };
  return (
    <div>
      <AlumniForm />
      {/* <StudentIDCard student={studentInfo} /> */}
    </div>
  );
}

export default App;
