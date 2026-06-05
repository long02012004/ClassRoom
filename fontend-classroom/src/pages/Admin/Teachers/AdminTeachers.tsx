import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { 
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { 
  Plus, 
  MagnifyingGlass, 
  DotsThree,
  Funnel,
  PencilSimple,
  Key,
  LockKey,
  ShieldStar
} from "phosphor-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "../../../components/Styles/ToastContext";
import styles from "./AdminTeachers.module.scss";
import { authService } from "../../../service/auth.service";

// Define the User type
export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Giáo viên" | "Học sinh";
  status: "Active" | "Locked";
  avatarUrl?: string;
};

// Mock Data
const initialData: User[] = [
  { id: "GV001", name: "Nguyễn Văn A", email: "nva@school.edu.vn", role: "Giáo viên", status: "Active", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
  { id: "AD001", name: "Trần Quản Trị", email: "admin@school.edu.vn", role: "Admin", status: "Active", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: "HS102", name: "Lê Minh C", email: "lmc@student.edu.vn", role: "Học sinh", status: "Locked", avatarUrl: "https://i.pravatar.cc/150?u=a048581f4e29026701d" },
  { id: "GV002", name: "Phạm Thị B", email: "ptb@school.edu.vn", role: "Giáo viên", status: "Active", avatarUrl: "https://i.pravatar.cc/150?u=a04258a2462d826712d" },
  { id: "HS103", name: "Hoàng Văn D", email: "hvd@student.edu.vn", role: "Học sinh", status: "Active", avatarUrl: "" },
  { id: "GV003", name: "Vũ Đình E", email: "vde@school.edu.vn", role: "Giáo viên", status: "Locked", avatarUrl: "https://i.pravatar.cc/150?u=a04258a2462d826712f" },
  { id: "HS104", name: "Đặng Thu F", email: "dtf@student.edu.vn", role: "Học sinh", status: "Active", avatarUrl: "https://i.pravatar.cc/150?u=a048581f4e29026701e" },
];

export default function AdminTeachers() {
  const [users, setUsers] = useState<User[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useToast();
  
  // New User Form State
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  // Column Definitions
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Họ và tên",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-slate-100 shadow-sm">
              {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} /> : null}
              <AvatarFallback className="bg-primary text-white font-semibold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900">{user.name}</span>
            </div>
          </div>
        );
      },
      // Override default filter so globalFilter can search by both name and email
      filterFn: (row, id, value) => {
        const nameMatch = row.original.name.toLowerCase().includes(value.toLowerCase());
        const emailMatch = row.original.email.toLowerCase().includes(value.toLowerCase());
        return nameMatch || emailMatch;
      },
    },
    {
      accessorKey: "email",
      header: "Email / Mã số",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-slate-700 font-medium">{row.original.email}</span>
          <span className="text-xs text-slate-500">{row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Vai trò",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        if (role === "Admin") return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Admin</Badge>;
        if (role === "Giáo viên") return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Giáo viên</Badge>;
        return <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">Học sinh</Badge>;
      },
      filterFn: (row, id, value) => {
        return value === "" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        if (status === "Active") {
          return (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 gap-1.5 px-2.5 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Hoạt động
            </Badge>
          );
        }
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 gap-1.5 px-2.5 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Đang khóa
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value === "" || row.getValue(id) === value;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right w-full">Hành động</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                  <span className="sr-only">Mở menu</span>
                  <DotsThree size={20} weight="bold" className="text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-2 font-medium text-slate-700">
                  <PencilSimple size={16} /> Sửa thông tin
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2 font-medium text-slate-700">
                  <ShieldStar size={16} /> Đổi quyền
                </DropdownMenuItem>
                {user.role === "Học sinh" && (
                  <DropdownMenuItem className="cursor-pointer gap-2 font-medium text-slate-700">
                    <Key size={16} /> Reset mật khẩu
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-2 font-bold text-red-600 focus:bg-red-50 focus:text-red-700">
                  <LockKey size={16} /> Khóa tài khoản
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    // Provide our custom global filter function explicitly if needed
    globalFilterFn: "auto",
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Gọi API tạo giáo viên thông qua authService
      const response = await authService.createTeacher({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Thành công, hiển thị message từ backend
      toast.success(response.message || "Tạo tài khoản Giáo viên thành công!", 3000);
      
      // Thêm user mới vào bảng
      if (response.user) {
        const newUser: User = {
          id: response.user.id.substring(0, 5).toUpperCase(), // Giả lập mã hiển thị
          name: response.user.name,
          email: response.user.email,
          role: "Giáo viên",
          status: "Active",
        };
        setUsers([newUser, ...users]);
      }
      
      setShowDialog(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi tạo tài khoản!", 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-[1400px] mx-auto bg-[#fafafa] min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className={`text-3xl font-bold tracking-tight text-slate-900 ${styles.add}`}>
            Quản lý người dùng
          </h2>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Quản lý danh sách giáo viên, học sinh và phân quyền truy cập.
          </p>
        </div>
      </div>

      {/* TABLE TOOLBAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Tìm kiếm theo tên / email..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-9 bg-white shadow-sm border-slate-200"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto bg-white gap-2 border-slate-200 shadow-sm text-slate-600 font-semibold">
                <Funnel size={16} weight="bold" />
                Vai trò {table.getColumn("role")?.getFilterValue() ? `: ${table.getColumn("role")?.getFilterValue()}` : ""}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[180px]">
              <DropdownMenuItem onClick={() => table.getColumn("role")?.setFilterValue("Admin")}>Admin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("role")?.setFilterValue("Giáo viên")}>Giáo viên</DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("role")?.setFilterValue("Học sinh")}>Học sinh</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => table.getColumn("role")?.setFilterValue("")} className="font-bold text-slate-500">Tất cả vai trò</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto bg-white gap-2 border-slate-200 shadow-sm text-slate-600 font-semibold">
                <Funnel size={16} weight="bold" />
                Trạng thái {table.getColumn("status")?.getFilterValue() ? `: ${table.getColumn("status")?.getFilterValue() === "Active" ? "Hoạt động" : "Đang khóa"}` : ""}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[180px]">
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Active")}>Hoạt động</DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Locked")}>Đang khóa</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("")} className="font-bold text-slate-500">Tất cả trạng thái</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:opacity-90 text-primary-foreground font-semibold shadow-sm w-full md:w-auto">
              <Plus size={16} weight="bold" />
              Thêm giáo viên mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateUser}>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-900">Thêm Giáo viên mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin chi tiết để cấp tài khoản giáo viên.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold text-slate-700">Họ và tên</Label>
                  <Input 
                    id="name" 
                    placeholder="Ví dụ: Nguyễn Văn A" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-slate-700">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Ví dụ: nva@school.edu.vn" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-semibold text-slate-700">Mật khẩu khởi tạo</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Nhập mật khẩu..." 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)} className="font-semibold" disabled={isSubmitting}>Hủy</Button>
                <Button type="submit" className="bg-primary text-white font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? "Đang tạo..." : "Tạo tài khoản"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* DATA TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col mt-2">
        <Table>
          <TableHeader className="bg-slate-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b-slate-200">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-[11px] font-bold text-slate-500 uppercase tracking-wider py-4 h-auto">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-50/80 cursor-default border-b-slate-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-slate-500 font-medium">
                  Không tìm thấy kết quả nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* PAGINATION */}
        <div className="flex items-center justify-between border-t border-slate-100 p-4 bg-white">
          <div className="text-sm text-slate-500 font-medium">
            Hiển thị {table.getRowModel().rows?.length} trên tổng {table.getFilteredRowModel().rows.length} người dùng
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-slate-600 font-semibold"
            >
              Trang trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-slate-600 font-semibold"
            >
              Trang tiếp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
