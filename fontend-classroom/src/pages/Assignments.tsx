import StudentAssignments from "./Student/Assignments/StudentAssignments";
import TeacherAssignments from "./Teacher/Assignments/TeacherAssignments";

export default function Assignments() {
  const userRole = localStorage.getItem("userRole") || "TEACHER";

  if (userRole === "STUDENT") {
    return <StudentAssignments />;
  }

  return <TeacherAssignments />;
}
