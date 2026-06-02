# Đặc Tả Chức Năng Hệ Thống Quản Lý Lớp Học

Tài liệu này mô tả các chức năng được phân loại từ cơ bản đến nâng cao dành cho hệ thống quản lý lớp học của giáo viên.

---

## I. Các Chức Năng Cốt Lõi (Must-Have)
*Đây là nhóm tính năng bắt buộc phải có để hệ thống vận hành ổn định.*

### 1. Quản lý tài khoản (Authentication)
* [cite_start]**Giáo viên:** Có thể đăng ký tài khoản mới và đăng nhập vào hệ thống bảo mật bằng mật khẩu được mã hóa[cite: 6, 50].
* [cite_start]**Phân quyền:** Hệ thống phân rõ vai trò của Giáo viên để quản trị lớp học (có khả năng mở rộng cho Học sinh/Phụ huynh sau này)[cite: 6].

### 2. Quản lý danh sách lớp học (Classroom Management)
* [cite_start]**Thao tác:** Giáo viên có thể Tạo, Sửa thông tin, hoặc Xóa các lớp học do mình phụ trách[cite: 7].
* [cite_start]**Mã tham gia:** Mỗi khi tạo một lớp mới, hệ thống tự động sinh ra một **mã code ngẫu nhiên và duy nhất** để học sinh sử dụng khi tham gia lớp học[cite: 8].

### 3. Quản lý học sinh (Student Roster)
* [cite_start]**Thành viên:** Giáo viên có thể chủ động thêm học sinh mới hoặc xóa học sinh ra khỏi lớp học[cite: 9].
* [cite_start]**Hồ sơ:** Xem danh sách toàn bộ lớp kèm theo thông tin liên hệ cơ bản (Họ tên, mã học sinh, số điện thoại phụ huynh)[cite: 10].

### 4. Điểm danh điện tử (Attendance Tracking)
* [cite_start]**Nhập dữ liệu:** Giao diện điểm danh theo ngày cho phép tích chọn nhanh trạng thái của từng học sinh: `Có mặt` (Present), `Vắng` (Absent), hoặc `Muộn` (Late)[cite: 11].
* [cite_start]**Báo cáo:** Thống kê tổng số buổi vắng của từng học sinh để giáo viên dễ dàng theo dõi chuyên cần[cite: 12].

---

## II. Quản Lý Học Tập & Tương Tác (Should-Have)
[cite_start]*Nhóm tính năng giúp tăng hiệu quả tương tác và giao bài tập giữa giáo viên và học sinh[cite: 13].*

### 1. Bảng tin / Thông báo (Announcements)
* [cite_start]Giáo viên đăng tải các thông báo quan trọng, dặn dò bài tập về nhà[cite: 14].
* [cite_start]Cho phép phản hồi thông qua tính năng để lại bình luận công khai (comment)[cite: 15].

### 2. Quản lý bài tập & Tài liệu (Assignments & Materials)
* [cite_start]**Kho lưu trữ:** Giáo viên tải lên các file tài liệu bài học định dạng PDF, Word, hoặc đính kèm link Drive, video Youtube[cite: 15].
* [cite_start]**Giao bài:** Tạo bài tập về nhà yêu cầu cài đặt thời hạn nộp bài (Deadline)[cite: 16].
* **Chấm điểm:** Học sinh nộp bài dưới dạng tệp tin hoặc văn bản chữ. [cite_start]Giáo viên tiến hành chấm điểm và đưa ra nhận xét trực tiếp trên hệ thống[cite: 17].

### 3. Sổ điểm điện tử (Gradebook)
* [cite_start]Hỗ trợ lưu trữ điểm số theo các đầu điểm thành phần: Điểm miệng, Điểm 15 phút, Điểm giữa kỳ, và Điểm cuối kỳ[cite: 18].
* [cite_start]Hệ thống tự động tính toán Điểm trung bình môn dựa trên hệ số được thiết lập sẵn[cite: 19].

---

## III. Các Tính Năng Nâng Cao (Nice-to-Have)
[cite_start]*Các tính năng giúp nâng cấp hệ thống tối ưu và chuyên nghiệp hơn[cite: 20].*

### 1. Trực quan hóa dữ liệu (Dashboard & Analytics)
* [cite_start]Biểu đồ hình cột hoặc hình tròn thể hiện phổ điểm tổng quan của lớp học (Tỷ lệ học sinh đạt Giỏi, Khá, Trung bình)[cite: 20].
* [cite_start]Biểu đồ thống kê tỷ lệ chuyên cần của lớp học theo từng tháng[cite: 21].

### 2. Tạo đề trắc nghiệm Online (Quiz System)
* [cite_start]Giáo viên biên soạn ngân hàng câu hỏi trắc nghiệm và thiết lập thời gian làm bài cụ thể (ví dụ: 15 phút)[cite: 22].
* [cite_start]Học sinh thực hiện làm bài trực tuyến, hệ thống tự động khóa bài khi hết giờ, tự động chấm điểm và đồng bộ kết quả vào Sổ điểm[cite: 23].

### 3. Gửi thông báo tự động (Notifications)
* [cite_start]Tự động gửi email nhắc nhở học sinh khi sắp đến thời hạn nộp bài tập (Deadline)[cite: 24].
* [cite_start]Gửi báo cáo kết quả học tập, bảng điểm định kỳ trực tiếp tới email của phụ huynh[cite: 24].