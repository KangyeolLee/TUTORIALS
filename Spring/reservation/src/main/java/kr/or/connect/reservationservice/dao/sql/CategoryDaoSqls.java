package kr.or.connect.reservationservice.dao.sql;

public class CategoryDaoSqls {
	public static final String SELECT_COUNT = "SELECT count(*) FROM category";
	public static final String SELECT_NAME = "SELECT name FROM category WHERE id = :id";
	public static final String SELECT_ALL = "SELECT * FROM category";
	public static final String SELECT_CATEGORY = "SELECT category_id, category.name, count(*) as count FROM product"
			+ " JOIN category on category.id = product.category_id"
			+ " GROUP BY category_id";
}
