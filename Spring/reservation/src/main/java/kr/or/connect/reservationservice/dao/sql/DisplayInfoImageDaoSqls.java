package kr.or.connect.reservationservice.dao.sql;

public class DisplayInfoImageDaoSqls {
	public static final String SELECT_ALL = "SELECT * FROM display_info_image";
	public static final String SELECT_ALL_INFO = "SELECT file_info.*, display_info_image.id as displayInfoImageId, display_info_image.display_info_id FROM file_info"
			+ " JOIN display_info_image ON display_info_image.file_id = file_info.id";
}
