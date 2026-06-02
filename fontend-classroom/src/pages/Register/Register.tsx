import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Envelope, 
  Lock, 
  ChalkboardTeacher, 
  SignIn, 
  UserPlus 
} from "phosphor-react";
import { useToast } from "../../components/Styles/ToastContext.tsx";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  // Trạng thái chuyển đổi Đăng ký / Đăng nhập
  const [isLogin, setIsLogin] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, emailSet] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Giả lập Đăng nhập
        setTimeout(() => {
          setLoading(false);
          toast.success(`Chào mừng trở lại, Thầy Long!`, 3000);
          navigate("/dashboard");
        }, 1200);
      } else {
        // Giả lập Đăng ký
        setTimeout(() => {
          setLoading(false);
          toast.success("Đăng ký tài khoản giáo viên thành công!", 3000);
          setIsLogin(true); // Chuyển sang màn hình đăng nhập
          // Reset form
          setName("");
          emailSet("");
          setPassword("");
        }, 1200);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Đã xảy ra lỗi, vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative overflow-hidden">
      {/* Các hình tròn trang trí nền */}
      <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#FE6747]/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#3BF3BB]/10 blur-3xl" />

      {/* Container chính */}
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 p-8 shadow-xl shadow-gray-200/50 backdrop-blur-md relative z-10">
        
        {/* Header Thương hiệu */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FE6747]/10 text-[#FE6747] text-3xl mb-4">
            🏫
          </div>
          <h2 className="text-2xl font-extrabold text-[#171B27] tracking-tight">
            Classroom <span className="text-[#FE6747]">Manager</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Hệ thống quản lý chuyên cần và học tập cho giáo viên
          </p>
        </div>

        {/* Tab Đăng ký / Đăng nhập */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button
            type="button"
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
              isLogin ? "text-gray-600 hover:text-gray-900" : "bg-white text-[#171B27] shadow-sm"
            }`}
            onClick={() => setIsLogin(false)}
          >
            <UserPlus size={16} />
            Đăng ký
          </button>
          <button
            type="button"
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
              !isLogin ? "text-gray-600 hover:text-gray-900" : "bg-white text-[#171B27] shadow-sm"
            }`}
            onClick={() => setIsLogin(true)}
          >
            <SignIn size={16} />
            Đăng nhập
          </button>
        </div>

        {/* Form Nhập Liệu */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-[#171B27] uppercase tracking-wider mb-2">
                Họ và tên giáo viên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thầy Nguyễn Văn A"
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FE6747] focus:border-[#FE6747] transition duration-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#171B27] uppercase tracking-wider mb-2">
              Địa chỉ Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Envelope size={18} />
              </div>
              <input
                type="email"
                required
                placeholder="teacher@classroom.com"
                className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FE6747] focus:border-[#FE6747] transition duration-200"
                value={email}
                onChange={(e) => emailSet(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171B27] uppercase tracking-wider mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FE6747] focus:border-[#FE6747] transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Vai trò cố định */}
          {!isLogin && (
            <div className="bg-[#3BF3BB]/5 border border-[#3BF3BB]/20 rounded-xl p-3.5 flex items-start gap-3">
              <div className="text-[#3BF3BB] mt-0.5">
                <ChalkboardTeacher size={20} weight="fill" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#171B27]">Vai trò mặc định: Giáo viên</h4>
                <p className="text-xxs text-gray-500 mt-0.5">
                  Tài khoản của bạn sẽ được cấp quyền khởi tạo, chỉnh sửa lớp học và quản lý học sinh.
                </p>
              </div>
            </div>
          )}

          {/* Nút bấm Gửi */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#FE6747] hover:bg-[#e0583b] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#FE6747]/20 hover:shadow-[#FE6747]/30 transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : isLogin ? (
              <>
                <SignIn size={18} weight="bold" />
                Đăng nhập ngay
              </>
            ) : (
              <>
                <UserPlus size={18} weight="bold" />
                Khởi tạo tài khoản
              </>
            )}
          </button>
        </form>

        {/* Chuyển nhanh bằng Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản giáo viên?"}{" "}
            <button
              type="button"
              className="text-[#FE6747] font-bold hover:underline bg-transparent border-none cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Đăng ký tại đây" : "Đăng nhập tại đây"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
