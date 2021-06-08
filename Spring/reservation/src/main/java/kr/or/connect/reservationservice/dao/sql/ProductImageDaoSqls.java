package kr.or.connect.reservationservice.dao.sql;

public class ProductImageDaoSqls {
	public static final String SELECT_ALL = "SELECT * FROM product_image";
	public static final String SELECT_ALL_INFO = "SELECT file_info.*, product_image.id as productImageId, product_image.product_id, product_image.type FROM file_info"
			+ " JOIN product_image ON product_image.file_id = file_info.id";
}
