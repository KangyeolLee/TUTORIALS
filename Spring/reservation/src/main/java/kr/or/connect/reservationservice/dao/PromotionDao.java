package kr.or.connect.reservationservice.dao;

import static kr.or.connect.reservationservice.dao.sql.PromotionDaoSqls.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservationservice.dto.ApiPromotion;
import kr.or.connect.reservationservice.dto.Promotion;

@Repository
public class PromotionDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<Promotion> rowMapper = BeanPropertyRowMapper.newInstance(Promotion.class);
	private RowMapper<ApiPromotion> rowMapperApi = BeanPropertyRowMapper.newInstance(ApiPromotion.class);
	
	public PromotionDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("promotion")
				.usingGeneratedKeyColumns("id");
	}
	
	public int insert(Promotion promotion) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(promotion);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public int deleteById(int id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.update(DELETE_BY_ID, params);
	}
	
	public List<Promotion> selectAll() {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
	
	public List<ApiPromotion> selectAllApi() {
		return jdbc.query(SELECT_ALL_API, Collections.emptyMap(), rowMapperApi);
	}
	
	public int getCount() {
		return jdbc.queryForObject(SELECT_COUNT, Collections.emptyMap(), Integer.class);
	}
}
