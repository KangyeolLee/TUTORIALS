package kr.or.connect.reservationservice.dao.sql;

public class FileInfoDaoSqls {
	public static final String SELECT_ALL = "SELECT * FROM file_info";
	public static final String UPDATE_BY_ID = "UPDATE file_info SET file_name = :fileName, save_file_name = :saveFileName, modify_date = :modifyDate WHERE id = :id";
	public static final String DELETE_BY_ID = "DELETE FROM file_info WHERE id = :id";
}
