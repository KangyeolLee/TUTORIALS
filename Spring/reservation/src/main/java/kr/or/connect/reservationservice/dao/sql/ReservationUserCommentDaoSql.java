package kr.or.connect.reservationservice.dao.sql;

public class ReservationUserCommentDaoSql {
	public static final String SELECT_ALL= "SELECT reservation_user_comment.*, reservation_info.reservation_name, reservation_info.reservation_tel, reservation_info.reservation_email, reservation_info.reservation_date FROM reservation_user_comment"
			+ " JOIN reservation_info ON reservation_info.id = reservation_user_comment.reservation_info_id";
	public static final String SELECT_AVERAGE = "SELECT AVG(score) FROM reservation_user_comment WHERE product_id = :productId";
}
