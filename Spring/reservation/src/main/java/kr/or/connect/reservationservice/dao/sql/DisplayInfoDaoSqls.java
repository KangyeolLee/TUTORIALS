package kr.or.connect.reservationservice.dao.sql;

public class DisplayInfoDaoSqls {
	public static final String DELETE_BY_ID = "DELETE FROM display_info WHERE id = :id";
	public static final String UPDATE_BY_ID = "UPDATE display_info SET opening_hours = :openingHours, place_name = :placeName, place_lot = :placeLot, place_street = :placeStreet, tel = :tel, homepage = :homepage, email = :email, modify_date = :modifyDate WHERE id = :id";
	public static final String SELECT_ALL = "SELECT * FROM display_info";
	public static final String SELECT_ALL_INFOS = "SELECT display_info.*, category.id as categoryId, category.name, product.description, product.content, product.event FROM display_info"
			+ " JOIN product ON product.id = display_info.product_id"
			+ " JOIN category ON category.id = product.category_id";
}
