import { prisma } from '../lib/prisma';

export default async function HomePage() {
  try {
    // 1. Thử lấy dữ liệu
    const dishes = await prisma.dishes.findMany();

    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#2ecc71' }}>✅ Kết nối Database OK!</h1>
        <h2>Danh sách món ăn ({dishes.length}):</h2>
        
        {dishes.length > 0 ? (
          <ul>
            {dishes.map((dish) => (
              <li key={dish.id} style={{ marginBottom: '10px' }}>
                <strong>{dish.name}</strong> - {dish.price?.toLocaleString()} VNĐ
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#e67e22' }}>
            Kết nối thông suốt nhưng bảng "dishes" đang trống. Hãy thêm dữ liệu trong DBeaver rồi F5 nhé!
          </p>
        )}
      </div>
    );
  } catch (error) {
    // 2. Nếu lỗi (sai mật khẩu DB, sai đường dẫn Prisma...) nó sẽ hiện ở đây
    console.error(error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>❌ Lỗi kết nối Database!</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
}