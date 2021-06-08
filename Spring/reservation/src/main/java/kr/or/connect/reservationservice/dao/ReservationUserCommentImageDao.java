package kr.or.connect.reservationservice.dao;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservationservice.dto.ApiReservationUserCommentImage;
import static kr.or.connect.reservationservice.dao.sql.ReservationUserCommentImageDaoSql.*;

@Repository
public class ReservationUserCommentImageDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ApiReservationUserCommentImage> rowMapper = BeanPropertyRowMapper.newInstance(ApiReservationUserCommentImage.class);
	
	public ReservationUserCommentImageDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<ApiReservationUserCommentImage> selectAll() {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
}
