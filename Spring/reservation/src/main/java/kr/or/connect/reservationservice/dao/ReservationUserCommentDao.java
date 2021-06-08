package kr.or.connect.reservationservice.dao;

import static kr.or.connect.reservationservice.dao.sql.ReservationUserCommentDaoSql.SELECT_ALL;
import static kr.or.connect.reservationservice.dao.sql.ReservationUserCommentDaoSql.SELECT_AVERAGE;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservationservice.dto.ApiReservationUserComment;

@Repository
public class ReservationUserCommentDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ApiReservationUserComment> rowMapper = BeanPropertyRowMapper.newInstance(ApiReservationUserComment.class);
	
	public ReservationUserCommentDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<ApiReservationUserComment> selectAll() {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
	
	public double getScores(int productId) {
		Map<String, ?> params = Collections.singletonMap("productId", productId);
		return jdbc.queryForObject(SELECT_AVERAGE, params, Double.class);
	}
}
