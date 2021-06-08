package kr.or.connect.reservationservice.dao.sql;

public class PromotionDaoSqls {
	public static final String SELECT_ALL = "SELECT * FROM promotion";
	public static final String DELETE_BY_ID = "DELETE FROM promotion WHERE id = :id";
	public static final String SELECT_COUNT = "SELECT COUNT(*) FROM promotion";
	public static final String SELECT_ALL_API = "SELECT promotion.id, promotion.product_id, file_info.save_file_name FROM promotion" + 
			" JOIN product_image ON product_image.product_id = promotion.product_id" + 
			" JOIN file_info ON file_info.id = product_image.file_id" + 
			" WHERE product_image.type = \"ma\"";
}
