import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { 
  Image as ImageIcon, 
  Paperclip, 
  CalendarBlank, 
  PaperPlaneRight, 
  Heart, 
  ChatCircle, 
  ShareNetwork, 
  FilePdf, 
  DownloadSimple, 
  DotsThree, 
  MagnifyingGlass, 
  Bell,
  Trash
} from "phosphor-react";
import { 
  getMockDb, 
  getMockAnnouncements, 
  createMockAnnouncement, 
  addMockComment,
  saveMockDb
} from "../../../utils/mockDb.ts";
import type { Classroom, Announcement } from "../../../utils/mockDb.ts";
import { useToast } from "../../../components/Styles/ToastContext.tsx";
import styles from "./TeacherClassroomDetail.module.scss";

export default function TeacherClassroomDetail() {
  const { id: classId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") || "overview") as "overview" | "reports" | "schedule";
  const toast = useToast();
  const userRole = localStorage.getItem("userRole") || "TEACHER";
  const username = localStorage.getItem("username") || "Thầy Long";
  const userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=FE6747&color=fff&bold=true`;

  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filterChip, setFilterChip] = useState<"all" | "reminder" | "material" | "assignment">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // State cho việc đăng bài mới
  const [postText, setPostText] = useState("");
  const [postType, setPostType] = useState<"announcement" | "reminder" | "material">("announcement");
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string; url: string }[]>([]);
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  // State cho bình luận mới của từng bài đăng
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Tải dữ liệu lớp học và bảng tin
  const loadData = () => {
    if (!classId) return;
    const db = getMockDb();
    const currentClass = db.classrooms.find(c => c._id === classId);
    if (!currentClass) {
      toast.error("Lớp học không tồn tại hoặc đã bị xóa!");
      navigate("/classrooms");
      return;
    }
    setClassroom(currentClass);

    // Tải danh sách thông báo của lớp này
    const list = getMockAnnouncements(classId);
    setAnnouncements(list);
  };

  useEffect(() => {
    loadData();
  }, [classId]);

  // Bộ lọc thông báo
  const filteredAnnouncements = announcements.filter(ann => {
    // Lọc theo loại (chip)
    if (filterChip !== "all" && ann.type !== filterChip) return false;
    
    // Lọc theo nội dung tìm kiếm
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        ann.content.toLowerCase().includes(q) || 
        (ann.title && ann.title.toLowerCase().includes(q))
      );
    }
    
    return true;
  });

  // Xử lý đính kèm mock file
  const handleAttachMockFile = () => {
    const mockFiles = [
      { name: "De_cuong_on_tap_chuong_3.pdf", size: "1.8 MB", url: "#" },
      { name: "Giao_an_chi_tiet_Dao_Ham.pdf", size: "3.2 MB", url: "#" },
      { name: "BT_Tong_Hop_Hinh_Hoc.pdf", size: "2.1 MB", url: "#" }
    ];
    const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    setAttachedFiles([...attachedFiles, randomFile]);
    toast.success(`Đã đính kèm tệp: ${randomFile.name}`);
    setPostType("material"); // Đổi loại tự động khi đính kèm file
  };

  // Xử lý đính kèm mock ảnh
  const handleAttachMockImage = () => {
    const mockImages = [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80"
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setAttachedImages([...attachedImages, randomImage]);
    toast.success("Đã đính kèm ảnh minh họa");
    setPostType("material"); // Đổi loại tự động khi đính kèm ảnh
  };

  // Đăng bài mới
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classId) return;
    if (!postText.trim()) {
      toast.error("Vui lòng nhập nội dung thông báo!");
      return;
    }

    let title = "Thông báo lớp học";
    if (postType === "reminder") title = "Nhắc nhở lớp học";
    if (postType === "material") title = "Tài liệu học tập";

    try {
      createMockAnnouncement(
        classId,
        title,
        postText,
        username,
        postType,
        attachedFiles,
        attachedImages
      );
      toast.success("Đăng bài thông báo thành công!");
      
      // Reset form
      setPostText("");
      setPostType("announcement");
      setAttachedFiles([]);
      setAttachedImages([]);
      
      // Tải lại dữ liệu
      loadData();
    } catch (err) {
      toast.error("Đã xảy ra lỗi khi đăng bài!");
    }
  };

  // Xóa bài đăng
  const handleDeletePost = (annId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
      const db = getMockDb();
      db.announcements = db.announcements.filter(a => a._id !== annId);
      saveMockDb(db);
      toast.success("Đã xóa bài đăng!");
      loadData();
    }
  };

  // Thích bài đăng (Tăng lượt like giả lập)
  const handleLikePost = (annId: string) => {
    const db = getMockDb();
    const idx = db.announcements.findIndex(a => a._id === annId);
    if (idx !== -1) {
      db.announcements[idx].likes = (db.announcements[idx].likes || 0) + 1;
      saveMockDb(db);
      loadData();
    }
  };

  // Đăng bình luận
  const handleAddComment = (annId: string) => {
    const commentContent = commentInputs[annId];
    if (!commentContent || !commentContent.trim()) return;

    try {
      addMockComment(annId, username, commentContent.trim());
      setCommentInputs({ ...commentInputs, [annId]: "" });
      loadData();
    } catch (err) {
      toast.error("Không thể đăng bình luận!");
    }
  };

  // Format ngày tương đối hoặc tuyệt đối
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      
      if (diffMin < 1) return "Vừa xong";
      if (diffMin < 60) return `${diffMin} phút trước`;
      
      const diffHrs = Math.floor(diffMin / 60);
      if (diffHrs < 24) return `${diffHrs} giờ trước`;
      
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className={styles.classroomDetailContainer}>
      <div className={styles.mainContent}>
        {/* TABS 2: REPORTS VIEW */}
        {activeTab === "reports" && (
          <div className={styles.tabContentPanel}>
            <div className={styles.reportCard}>
              <h3>Báo cáo kết quả lớp học</h3>
              <p>Thống kê điểm số và tỉ lệ hoàn thành bài tập của {classroom?.className}.</p>
              <div className={styles.reportPlaceholder}>
                <div className={styles.statMetric}>
                  <span className={styles.statNum}>92%</span>
                  <span className={styles.statDesc}>Bài tập hoàn thành</span>
                </div>
                <div className={styles.statMetric}>
                  <span className={styles.statNum}>8.4</span>
                  <span className={styles.statDesc}>GPA Trung bình</span>
                </div>
                <div className={styles.statMetric}>
                  <span className={styles.statNum}>96%</span>
                  <span className={styles.statDesc}>Tỉ lệ chuyên cần</span>
                </div>
              </div>
              <button className={styles.btnSecondary} onClick={() => navigate(`/classrooms/${classId}/students`)}>
                Xem danh sách quản lý học sinh
              </button>
            </div>
          </div>
        )}

        {/* TABS 3: SCHEDULE VIEW */}
        {activeTab === "schedule" && (
          <div className={styles.tabContentPanel}>
            <div className={styles.reportCard}>
              <h3>Lịch trình học tập</h3>
              <p>Lịch dạy và các buổi học thêm được xếp lịch cho lớp {classroom?.className}.</p>
              <div className={styles.scheduleTimeline}>
                <div className={styles.timelineEvent}>
                  <span className={styles.eventTime}>Thứ 2 (08:00 - 09:30)</span>
                  <div className={styles.eventInfo}>
                    <h4>Buổi ôn tập Đại Số</h4>
                    <p>Chương Đạo hàm & Khảo sát hàm số</p>
                  </div>
                </div>
                <div className={styles.timelineEvent}>
                  <span className={styles.eventTime}>Thứ 4 (18:00 - 19:30)</span>
                  <div className={styles.eventInfo}>
                    <h4>Học chuyên đề Hình Học không gian</h4>
                    <p>Tính thể tích khối đa diện</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TABS 1: OVERVIEW (FEED VIEW - GIỐNG ẢNH MẪU) */}
        {activeTab === "overview" && (
          <div className={styles.feedLayout}>
            {/* POST COMPOSER - KHUNG ĐĂNG BÀI (Chỉ dành cho Giáo viên) */}
            {userRole === "TEACHER" && (
              <div className={styles.postComposer}>
                <div className={styles.composerTop}>
                  <img src={userAvatar} alt="Avatar" className={styles.avatarMini} />
                  <textarea 
                    placeholder="Bạn muốn thông báo gì cho cả lớp hôm nay?" 
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                </div>

                {/* Hiển thị tệp đính kèm tạm thời */}
                {(attachedFiles.length > 0 || attachedImages.length > 0) && (
                  <div className={styles.composerAttachments}>
                    {attachedFiles.map((file, index) => (
                      <div key={index} className={styles.attachedFileItem}>
                        <FilePdf size={20} weight="fill" color="#EF4444" />
                        <span>{file.name} ({file.size})</span>
                        <button 
                          type="button" 
                          onClick={() => setAttachedFiles(attachedFiles.filter((_, i) => i !== index))}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {attachedImages.map((img, index) => (
                      <div key={index} className={styles.attachedImageItem}>
                        <img src={img} alt="Attached Preview" />
                        <button 
                          type="button" 
                          onClick={() => setAttachedImages(attachedImages.filter((_, i) => i !== index))}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.composerBottom}>
                  <div className={styles.toolbar}>
                    <button 
                      type="button" 
                      className={styles.toolBtn} 
                      onClick={handleAttachMockImage}
                      title="Thêm ảnh"
                    >
                      <ImageIcon size={18} weight="bold" />
                      <span>Ảnh</span>
                    </button>
                    <button 
                      type="button" 
                      className={styles.toolBtn} 
                      onClick={handleAttachMockFile}
                      title="Đính kèm tệp"
                    >
                      <Paperclip size={18} weight="bold" />
                      <span>Tệp đính kèm</span>
                    </button>
                    <div className={styles.typeSelector}>
                      <select 
                        value={postType}
                        onChange={(e) => setPostType(e.target.value as any)}
                        className={styles.selectType}
                      >
                        <option value="announcement">Thông báo</option>
                        <option value="reminder">Nhắc nhở</option>
                        <option value="material">Tài liệu</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    className={styles.postBtn}
                    onClick={handleCreatePost}
                    disabled={!postText.trim()}
                  >
                    Đăng bài
                  </button>
                </div>
              </div>
            )}

            {/* FILTER CHIPS BAR */}
            <div className={styles.filterBar}>
              <button 
                className={`${styles.filterChip} ${filterChip === "all" ? styles.active : ""}`}
                onClick={() => setFilterChip("all")}
              >
                Tất cả
              </button>
              <button 
                className={`${styles.filterChip} ${filterChip === "assignment" ? styles.active : ""}`}
                onClick={() => setFilterChip("assignment")}
              >
                Bài tập
              </button>
              <button 
                className={`${styles.filterChip} ${filterChip === "reminder" ? styles.active : ""}`}
                onClick={() => setFilterChip("reminder")}
              >
                Nhắc nhở
              </button>
              <button 
                className={`${styles.filterChip} ${filterChip === "material" ? styles.active : ""}`}
                onClick={() => setFilterChip("material")}
              >
                Tài liệu
              </button>
            </div>

            {/* ANNOUNCEMENT FEED LIST */}
            <div className={styles.feedList}>
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((ann) => {
                  // Xác định tên hiển thị cho loại bài đăng tiếng Việt
                  let typeText = "đã đăng một thông báo";
                  if (ann.type === "reminder") typeText = "đã đăng một nhắc nhở";
                  if (ann.type === "material") typeText = "đã chia sẻ một tài liệu";

                  const authorAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(ann.authorName)}&background=FE6747&color=fff&bold=true`;

                  return (
                    <div key={ann._id} className={styles.announcementCard}>
                      {/* Top Header Card */}
                      <div className={styles.cardHeader}>
                        <div className={styles.authorInfo}>
                          <img src={authorAvatar} alt="Author" className={styles.authorAvatar} />
                          <div className={styles.authorMeta}>
                            <div className={styles.authorName}>
                              <strong>{ann.authorName}</strong> {typeText}
                            </div>
                            <div className={styles.timeMeta}>
                              {formatTime(ann.createdAt)} • {classroom?.className || "Lớp học"}
                            </div>
                          </div>
                        </div>
                        <div className={styles.headerActions}>
                          {userRole === "TEACHER" && (
                            <button 
                              className={styles.deletePostBtn}
                              onClick={() => handleDeletePost(ann._id)}
                              title="Xóa bài đăng"
                            >
                              <Trash size={16} />
                            </button>
                          )}
                          <button className={styles.moreBtn} aria-label="Tùy chọn">
                            <DotsThree size={24} weight="bold" />
                          </button>
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className={styles.cardContent}>
                        <p>{ann.content}</p>
                      </div>

                      {/* Attachments Card */}
                      {/* 1. File attachments */}
                      {ann.files && ann.files.length > 0 && (
                        <div className={styles.filesGrid}>
                          {ann.files.map((file, idx) => (
                            <div key={idx} className={styles.fileAttachmentCard}>
                              <div className={styles.fileLeft}>
                                <div className={styles.pdfIconWrapper}>
                                  <FilePdf size={24} weight="fill" color="#EF4444" />
                                </div>
                                <div className={styles.fileMeta}>
                                  <span className={styles.fileName}>{file.name}</span>
                                  <span className={styles.fileSize}>{file.size} • Tài liệu đính kèm</span>
                                </div>
                              </div>
                              <button className={styles.downloadBtn} title="Tải xuống tệp">
                                <DownloadSimple size={20} weight="bold" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 2. Image attachments */}
                      {ann.images && ann.images.length > 0 && (
                        <div className={styles.imagesGrid}>
                          {ann.images.map((img, idx) => (
                            <div key={idx} className={styles.imageCard}>
                              <img src={img} alt="Post Attachment" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Footer Actions (Like, Comment, Share) */}
                      <div className={styles.cardFooterActions}>
                        <button 
                          className={styles.actionBtn}
                          onClick={() => handleLikePost(ann._id)}
                        >
                          <Heart size={18} weight="bold" color="#EF4444" />
                          <span>{ann.likes || 0}</span>
                        </button>
                        <button className={styles.actionBtn}>
                          <ChatCircle size={18} weight="bold" />
                          <span>{ann.comments.length} bình luận</span>
                        </button>
                        <button className={styles.actionBtn}>
                          <ShareNetwork size={18} weight="bold" />
                          <span>Chia sẻ</span>
                        </button>
                      </div>

                      {/* Comments section */}
                      <div className={styles.commentsSection}>
                        {ann.comments.length > 0 && (
                          <div className={styles.commentsList}>
                            {ann.comments.map((comment) => {
                              const commentAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.authorName)}&background=3b82f6&color=fff&bold=true`;
                              return (
                                <div key={comment._id} className={styles.commentItem}>
                                  <img src={commentAvatar} alt="Comment Author" className={styles.commentAvatar} />
                                  <div className={styles.commentContentWrapper}>
                                    <div className={styles.commentBubble}>
                                      <span className={styles.commentAuthor}>{comment.authorName}</span>
                                      <p className={styles.commentText}>{comment.content}</p>
                                    </div>
                                    <div className={styles.commentMeta}>
                                      <button className={styles.commentAction}>Thích</button>
                                      <span className={styles.bullet}>•</span>
                                      <button className={styles.commentAction}>Phản hồi</button>
                                      {comment.createdAt && (
                                        <>
                                          <span className={styles.bullet}>•</span>
                                          <span className={styles.commentTime}>{formatTime(comment.createdAt)}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Quick Reply Form */}
                        <div className={styles.quickReplyForm}>
                          <img src={userAvatar} alt="User Avatar" className={styles.replyAvatar} />
                          <div className={styles.replyInputWrapper}>
                            <input 
                              type="text" 
                              placeholder="Viết phản hồi nhanh..."
                              value={commentInputs[ann._id] || ""}
                              onChange={(e) => setCommentInputs({
                                ...commentInputs,
                                [ann._id]: e.target.value
                              })}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleAddComment(ann._id);
                                }
                              }}
                            />
                            <button 
                              className={styles.sendReplyBtn}
                              onClick={() => handleAddComment(ann._id)}
                              disabled={!(commentInputs[ann._id] || "").trim()}
                            >
                              <PaperPlaneRight size={16} weight="fill" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyFeed}>
                  <p>Chưa có bài đăng nào trong lớp học này.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
