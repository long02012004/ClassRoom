import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import apiRouter from './routes'; // Nạp router tổng từ thư mục routes
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app: Application = express();

connectDB();

// 1. Các Middleware giải mã dữ liệu PHẢI NẰM TRÊN CÙNG
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Nạp API Versioning (URL sẽ là /api/v1 + /auth + /register)
app.use('/api/v1', apiRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "API v1 đang hoạt động!" });
});

// 3. Middleware xử lý lỗi BẮT BUỘC PHẢI NẰM DƯỚI CÙNG
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});