import React, { useState } from "react";


// Định nghĩa kiểu dữ liệu cho một Lớp học (TypeScript Interface)
interface Classroom {
  id: string;
  className: string;
  subject: string;
  classCode: string;
  studentCount: number;
}

export default function Dashboard() {
  // Giả lập dữ liệu danh sách lớp học (Mock Data) dựa trên DATABASE_MAU.json
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: "1",
      className: "Lớp Toán 10A",
      subject: "Toán học",
      classCode: "TOAN10A",
      studentCount: 35,
    },
    {
      id: "2",
      className: "Lớp Vật Lý 11B",
      subject: "Vật lý",
      classCode: "LY11B",
      studentCount: 42,
    },
    {
      id: "3",
      className: "Lớp Hóa Học 12C",
      subject: "Hóa học",
      classCode: "HOA12C",
      studentCount: 38,
    },
  ]);

  // State quản lý việc ẩn/hiển thị Form tạo lớp mới
  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({ className: "", subject: "" });

  // Hàm sinh mã lớp ngẫu nhiên (Giả lập logic của tầng Service ở Backend sau này)
  const generateClassCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.className || !newClass.subject) return;

    const createdClass: Classroom = {
      id: Date.now().toString(),
      className: newClass.className,
      subject: newClass.subject,
      classCode: generateClassCode(), // Tự động sinh mã lớp
      studentCount: 0, // Lớp mới tạo mặc định có 0 học sinh
    };

    setClassrooms([...classrooms, createdClass]);
    setNewClass({ className: "", subject: "" });
    setShowModal(false); // Đóng biểu mẫu
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 2. Vùng nội dung chính (Main Content) */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Lớp học do bạn quản lý
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Chọn một lớp học để xem chi tiết, điểm danh hoặc giao bài tập.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold shadow-sm transition duration-200"
          >
            + Tạo Lớp Học Mới
          </button>
        </div>

        {/* 3. Danh sách các Lớp học dạng Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((cls) => (
            <div
              key={cls.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                    {cls.subject}
                  </span>
                  <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Mã: {cls.classCode}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {cls.className}
                </h3>
                <p className="text-sm text-gray-500">
                  {cls.studentCount} Học sinh đang theo học
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 text-center py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
                  Vào Lớp
                </button>
                <button className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition">
                  ⚙️
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Biểu mẫu Pop-up (Modal) để tạo lớp học mới */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl animate-fade-in">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Tạo cấu trúc lớp học mới
            </h3>
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên lớp học
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lớp Toán 10A"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={newClass.className}
                  onChange={(e) =>
                    setNewClass({ ...newClass, className: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Môn học
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Toán học, Tiếng Anh..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={newClass.subject}
                  onChange={(e) =>
                    setNewClass({ ...newClass, subject: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
                >
                  Xác nhận tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
