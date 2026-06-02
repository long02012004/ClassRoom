import StudentClassrooms from "./Student/Classrooms/StudentClassrooms.tsx";
import TeacherClassrooms from "./Teacher/Classrooms/TeacherClassrooms.tsx";

export default function Classrooms() {
  const userRole = localStorage.getItem("userRole") || "TEACHER";

  if (userRole === "STUDENT") {
    return <StudentClassrooms />;
  }

  return <TeacherClassrooms />;
}
