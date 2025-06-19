## ⚙️ Công nghệ sử dụng
- **Backend Framework**: .NET 8
- **Cơ sở dữ liệu**: SQL Server 2019, 
- **IDE phát triển**: Visual Studio 2022
- **Kiến trúc**: Microservices (RESTful API)
- **Authentication**: JWT (Bearer Token)
- **Communication**: HTTP REST
- **Database Access**: Entity Framework Core


## 📦 Các thư viện cần cài đặt

### 1. Cho từng Microservice:
- **Microsoft.EntityFrameworkCore** - ORM framework để làm việc với cơ sở dữ liệu
- **Microsoft.EntityFrameworkCore.SqlServer** - Provider kết nối SQL Server cho EF Core
- **Microsoft.EntityFrameworkCore.Tools** - Công cụ CLI để tạo migration và update database
- **Microsoft.AspNetCore.Authentication.JwtBearer** - Middleware xác thực JWT token
- **Microsoft.AspNetCore.Identity.EntityFrameworkCore** - quản lý Identity (xác thực, phân quyền)

- **Microsoft.EntityFrameworkCore.Design** - quản lý Identity (xác thực, phân quyền)  ---- có thể bỏ qua nếu dùng Microsoft.EntityFrameworkCore.Tools


### 4. Thư viện thêm:
- **Newtonsoft.Json** - Serialize/deserialize JSON (legacy support)
- **System.Text.Json** - JSON serializer hiệu năng cao của .NET
- **Microsoft.Extensions.Configuration** - Quản lý cấu hình ứng dụng
- **Microsoft.Extensions.Logging** - Logging abstraction cho .NET