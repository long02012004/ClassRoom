import StudentResults from "./Student/Results/StudentResults";
import TeacherGradebook from "./Teacher/Gradebook/TeacherGradebook";

export default function Gradebook() {
  const userRole = localStorage.getItem("userRole") || "TEACHER";

  if (userRole === "STUDENT") {
    return <StudentResults />;
  }

  return <TeacherGradebook />;
}
