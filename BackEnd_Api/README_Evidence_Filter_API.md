# Evidence Filter API

## Tổng quan
API filter Evidence cho phép lọc danh sách evidence theo status và ngày CollectedAt cụ thể với hỗ trợ phân trang.

## Endpoint
```
GET /api/Evidence/filter
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string | No | Lọc theo status của evidence (Waiting for Test, In Progress, Tested) |
| collectedAt | DateTime | No | Ngày thu thập evidence cụ thể |
| page | int | No | Số trang (mặc định: 1) |
| pageSize | int | No | Số lượng item trên mỗi trang (mặc định: 10) |

## Ví dụ sử dụng

### 1. Lọc theo Status
```
GET /api/Evidence/filter?status=Active&page=1&pageSize=10
```

### 2. Lọc theo ngày CollectedAt
```
GET /api/Evidence/filter?collectedAt=2024-01-15&page=1&pageSize=10
```

### 3. Lọc theo cả Status và CollectedAt
```
GET /api/Evidence/filter?status=Active&collectedAt=2024-01-15&page=1&pageSize=10
```

### 4. Lấy tất cả evidence (không filter)
```
GET /api/Evidence/filter?page=1&pageSize=10
```

## Response Format

```json
{
  "data": [
    {
      "evidenceId": "E001",
      "caseId": "C001",
      "description": "Sample evidence description",
      "collectedAt": "2024-01-15T10:30:00",
      "collector": "John Doe",
      "status": "Active"
    }
  ],
  "totalCount": 100,
  "totalPages": 10,
  "currentPage": 1,
  "pageSize": 10,
  "hasNextPage": true,
  "hasPreviousPage": false,
  "filters": {
    "status": "Active",
    "collectedAt": "2024-01-15T00:00:00"
  }
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| data | array | Danh sách evidence đã được filter |
| totalCount | int | Tổng số evidence thỏa mãn điều kiện filter |
| totalPages | int | Tổng số trang |
| currentPage | int | Trang hiện tại |
| pageSize | int | Số lượng item trên mỗi trang |
| hasNextPage | boolean | Có trang tiếp theo không |
| hasPreviousPage | boolean | Có trang trước đó không |
| filters | object | Thông tin về các filter đã áp dụng |

## Status Values
- "Waiting for Test"
- "In Progress" 
- "Tested"

## Lưu ý
- Tất cả các parameter đều là optional
- Nếu không cung cấp filter nào, API sẽ trả về tất cả evidence
- Date format: YYYY-MM-DD hoặc YYYY-MM-DDTHH:mm:ss
- API chỉ trả về evidence chưa bị xóa (IsDeleted = false)
- Filter theo collectedAt sẽ tìm chính xác theo ngày (không tính giờ phút giây) 