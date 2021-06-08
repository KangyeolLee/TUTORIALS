package kr.or.connect.reservationservice.dao;

import static kr.or.connect.reservationservice.dao.sql.DisplayInfoDaoSqls.*;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
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

import kr.or.connect.reservationservice.dto.ApiDisplayInfo;
import kr.or.connect.reservationservice.dto.DisplayInfo;

@Repository
public class DisplayInfoDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<DisplayInfo> rowMapper = BeanPropertyRowMapper.newInstance(DisplayInfo.class);
	private RowMapper<ApiDisplayInfo> rowMapperApi = BeanPropertyRowMapper.newInstance(ApiDisplayInfo.class);
	
	public DisplayInfoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("display_info")
				.usingGeneratedKeyColumns("id");
	}
	
	public int insert(DisplayInfo displayInfo) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(displayInfo);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public int deleteById(int id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.update(DELETE_BY_ID, params);
	}
	
	public int updateById(String openingHours, String placeName, String placeLot, String placeStreet, String tel, String homepage, String email, Date modifyDate, int id) {
		Map<String, Object> params = new HashMap<>();
		params.put("openingHours", openingHours);
		params.put("placeName", placeName);
		params.put("placeLot", placeLot);
		params.put("placeStreet", placeStreet);			// 공백값 또는 특정값을 넣으면 기존 값을 유지할 수 있는 지 알아볼 것! [수정요망]
		params.put("tel", tel);							
		params.put("homepage", homepage);
		params.put("email", email);
		params.put("modifyDate", modifyDate);
		params.put("id", id);	
		return jdbc.update(UPDATE_BY_ID, params);
	}
	
	public List<DisplayInfo> selectAll() {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
	
	public List<ApiDisplayInfo> selectAllInfos() {
		return jdbc.query(SELECT_ALL_INFOS, Collections.emptyMap(), rowMapperApi);
	}
}
