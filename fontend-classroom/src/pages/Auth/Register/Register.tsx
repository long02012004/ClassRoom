import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Envelope, 
  Lock, 
  SignIn, 
  UserPlus,
  CalendarCheck,
  GraduationCap,
  Notebook,
  Sparkle
} from "phosphor-react";
import { useToast } from "../../../components/Styles/ToastContext.tsx";
import styles from "./Register.module.scss";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  // Trạng thái chuyển đổi Đăng ký / Đăng nhập
  const [isLogin, setIsLogin] = useState(true);

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
        // Giả lập Đăng nhập và phân vai trò thông qua Email (để tiện Demo)
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem("isLoggedIn", "true");
          
          if (email.toLowerCase().includes("teacher")) {
            // Đăng nhập vai trò Giáo viên
            localStorage.setItem("username", "Thầy Nguyễn Văn A");
            localStorage.setItem("userRole", "TEACHER");
            toast.success("Chào mừng thầy cô quay trở lại giảng dạy!", 3000);
          } else if (email.toLowerCase().includes("admin")) {
            // Đăng nhập vai trò Admin
            localStorage.setItem("username", "Quản trị viên");
            localStorage.setItem("userRole", "ADMIN");
            toast.success("Chào mừng quay trở lại, Quản trị viên hệ thống!", 3000);
          } else {
            // Đăng nhập vai trò Học sinh
            const savedName = localStorage.getItem("registeredName") || "Học sinh A";
            localStorage.setItem("username", savedName);
            localStorage.setItem("userRole", "STUDENT");
            toast.success(`Chào mừng học sinh ${savedName} quay trở lại học tập!`, 3000);
          }
          
          navigate("/dashboard");
        }, 1200);
      } else {
        // Giả lập Đăng ký vai trò Học sinh lớp học thêm
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem("registeredName", name);
          localStorage.setItem("registeredEmail", email);
          localStorage.setItem("registeredPassword", password);
          toast.success("Đăng ký tài khoản học viên lớp học thêm thành công! Hãy đăng nhập.", 3000);
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
    <main className={styles.authMain}>
      <div className={styles.authContainer}>
        {/* Cánh trái: Thông tin giới thiệu */}
        <div className={styles.authLeft}>
          <div className={styles.leftContentBox}>
            <div className={styles.logo}>
              <span>
                Classroom<span className={styles.accentText}>Manager</span>
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-info" : "register-info"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {isLogin ? (
                  <>
                    <h1 className={styles.gradientText}>Hệ thống Quản lý <br /> Lớp học thêm.</h1>
                    <p className={styles.description}>
                      Kênh liên lạc học tập, điểm danh chuyên cần, giao nộp bài tập và tra cứu điểm số giữa Giáo viên và Học sinh lớp học thêm.
                    </p>
                    <ul className={styles.authFeatures}>
                      <li>
                        <div className={styles.featureIcon}><CalendarCheck weight="duotone" /></div>
                        <span>Xem lịch sử điểm danh chuyên cần hàng tuần</span>
                      </li>
                      <li>
                        <div className={styles.featureIcon}><GraduationCap weight="duotone" /></div>
                        <span>Tra cứu điểm số & nhận xét của giáo viên</span>
                      </li>
                      <li>
                        <div className={styles.featureIcon}><Notebook weight="duotone" /></div>
                        <span>Theo dõi bài tập & thông báo lớp học thêm</span>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h1 className={styles.gradientText}>Tham gia lớp học thêm <br /> của thầy cô.</h1>
                    <p className={styles.description}>
                      Đăng ký tài khoản học viên để bắt đầu tham gia lớp học thêm, nhận đề ôn luyện, nộp bài tập về nhà và theo dõi kết quả chuyên cần.
                    </p>
                    <ul className={styles.authFeatures}>
                      <li>
                        <div className={styles.featureIcon}><Sparkle weight="duotone" /></div>
                        <span>Vào lớp học thêm bằng mã code giáo viên cấp</span>
                      </li>
                      <li>
                        <div className={styles.featureIcon}><UserPlus weight="duotone" /></div>
                        <span>Nhận tài liệu ôn tập & nộp bài tập về nhà tiện lợi</span>
                      </li>
                      <li>
                        <div className={styles.featureIcon}><Notebook weight="duotone" /></div>
                        <span>Xem lịch sử chuyên cần & bảng điểm kiểm tra</span>
                      </li>
                    </ul>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Cánh phải: Form Đăng nhập/Đăng ký */}
        <div className={styles.authRight}>
          <div className={styles.formWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-form" : "register-form"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={styles.formContainer}
              >
                <div className={styles.header}>
                  <h2>{isLogin ? "Đăng nhập" : "Đăng ký học viên"}</h2>
                  <p>{isLogin ? "Nhập thông tin đăng nhập của bạn" : "Tạo tài khoản học viên để tham gia lớp học thêm"}</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  {!isLogin && (
                    <div className={styles.inputGroup}>
                      <label htmlFor="name">Họ và tên học sinh</label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}><User size={18} /></span>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Văn A"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Địa chỉ Email</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}><Envelope size={18} /></span>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="student@classroom.com (Hoặc email giáo viên/admin)"
                        value={email}
                        onChange={(e) => emailSet(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className={styles.passwordGroupWrap}>
                    <div className={styles.labelRow}>
                      <label htmlFor="password">Mật khẩu</label>
                      {isLogin && <a href="#" className={styles.forgotPass}>Quên mật khẩu?</a>}
                    </div>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}><Lock size={18} /></span>
                      <input
                        id="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button type="submit" className={styles.btnSubmit} disabled={loading}>
                    {loading ? (
                      <span className={styles.spinner} />
                    ) : isLogin ? (
                      <>
                        <SignIn size={18} weight="bold" />
                        Đăng nhập ngay
                      </>
                    ) : (
                      <>
                        <UserPlus size={18} weight="bold" />
                        Đăng ký học sinh
                      </>
                    )}
                  </button>
                </form>

                <div className={styles.footer}>
                  {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản học sinh?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    disabled={loading}
                  >
                    {isLogin ? "Đăng ký học sinh" : "Đăng nhập tại đây"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
