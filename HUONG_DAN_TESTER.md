# HƯỚNG DẪN CHO TESTER - HỆ THỐNG QUẢN LÝ ĐIỀU TRA TỘI PHẠM

## BƯỚC 1: CHUẨN BỊ
1. **Tải và cài đặt Docker Desktop:**
   - Windows: https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe
   - macOS: https://desktop.docker.com/mac/main/amd64/Docker.dmg
   - Linux: Cài qua package manager

2. **Khởi động Docker Desktop** và đảm bảo nó đang chạy

3. **Giải nén** file zip vào thư mục bất kỳ

## BƯỚC 2: KHỞI CHẠY HỆ THỐNG

### Trên Windows:
Mở **Command Prompt** hoặc **PowerShell** trong thư mục vừa giải nén và chạy:
```cmd
docker-compose up --build
```

## BƯỚC 3: TRUY CẬP HỆ THỐNG

Đợi khoảng **3-5 phút** để hệ thống khởi động hoàn tất, sau đó:

### 🌐 Frontend (Giao diện người dùng):
- **URL:** http://localhost:3000
- Đây là giao diện chính để test các chức năng

### 🔧 Backend API (Swagger UI):
- **URL:** http://localhost:5000/swagger
- Dùng để test trực tiếp các API endpoints

### 🗄️ Database:
- **Server:** localhost,1433
- **Database:** CrimeInvestigationDB
- **Username:** sa
- **Password:** YourStrong@Passw0rd

## BƯỚC 4: TÀI KHOẢN TEST

Hệ thống đã có sẵn các tài khoản để test:

### 👤 Tài khoản Admin 1:
- **Username:** Huy0307
- **Password:** Huy0307@
- **Quyền:** Toàn quyền quản trị

## BƯỚC 5: KIỂM TRA HỆ THỐNG
mpose down`

## 🚨 XỬ LÝ SỰ CỐ

### Lỗi "Port already in use":
```cmd
docker-compose down
docker system prune -f
docker-compose up --build
```

### Lỗi Database connection:
```cmd
docker-compose down
docker volume rm mockproject_062025_nhom13_sqlserver_data
docker-compose up --build
```

### Lỗi Frontend không load được:
- Kiểm tra http://localhost:3000
- Xóa cache browser (Ctrl + Shift + Delete)



