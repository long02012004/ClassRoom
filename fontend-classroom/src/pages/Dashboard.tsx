import TeacherDashboard from "./Teacher/Dashboard/TeacherDashboard.tsx";
import StudentDashboard from "./Student/Dashboard/StudentDashboard.tsx";

export default function Dashboard() {
  const userRole = localStorage.getItem("userRole") || "TEACHER";

  if (userRole === "STUDENT") {
    return <StudentDashboard />;
  }

  return <TeacherDashboard />;
}
