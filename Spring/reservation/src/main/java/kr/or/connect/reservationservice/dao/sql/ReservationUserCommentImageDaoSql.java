package kr.or.connect.reservationservice.dao.sql;

public class ReservationUserCommentImageDaoSql {
	public static final String SELECT_ALL = "SELECT file_info.*, reservation_user_comment_image.id as reservationUserCommentImageid, reservation_user_comment_image.reservation_info_id, reservation_user_comment_image.reservation_user_comment_id"
			+ " FROM file_info JOIN reservation_user_comment_image ON reservation_user_comment_image.file_id = file_info.id";
}
