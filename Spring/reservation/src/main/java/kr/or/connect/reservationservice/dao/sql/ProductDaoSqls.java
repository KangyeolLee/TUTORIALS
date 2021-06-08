package kr.or.connect.reservationservice.dao.sql;

public class ProductDaoSqls {
	public static final String DELETE_BY_ID = "DELETE FROM product WHERE id = :id";
	public static final String UPDATE_BY_ID = "UPDATE product SET category_id = :categoryId, description = :description, content = :content, modify_date = :modifyDate WHERE id = :id";
	public static final String SELECT_PAGING = "SELECT * FROM product limit :start, :limit";
	public static final String SELECT_COUNT_ALL = "SELECT COUNT(*) FROM product JOIN display_info ON product.id = display_info.product_id";
	public static final String SELECT_COUNT_BY_CATEGORY = "SELECT COUNT(*) FROM product JOIN display_info ON product.id = display_info.product_id WHERE category_id = :categoryId";
	public static final String SELECT_ALL = "SELECT product.category_id, display_info.id, display_info.place_name, product.content, product.description, file_info.save_file_name"
			+ " FROM product JOIN product_image ON product.id = product_image.product_id"
			+ " JOIN file_info ON product_image.file_id = file_info.id"
			+ " JOIN display_info ON display_info.product_id = product.id WHERE product_image.type = \"th\""
			+ " LIMIT :start, :limit";
			// api/products 부분 병합
	public static final String SELECT_BY_CATEGORY = "SELECT product.category_id, display_info.id, display_info.place_name, product.content, product.description, file_info.save_file_name"
			+ " FROM product JOIN product_image ON product.id = product_image.product_id"
			+ " JOIN file_info ON product_image.file_id = file_info.id"
			+ " JOIN display_info ON display_info.product_id = product.id WHERE product_image.type = \"th\""
			+ " AND product.category_id = :categoryId"
			+ " LIMIT :start, :limit";
}
