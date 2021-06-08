package kr.or.connect.reservationservice.dao;

//import kr.or.connect.reservationservice.dto.Category;
import static kr.or.connect.reservationservice.dao.sql.CategoryDaoSqls.*;

import java.util.Collections;
import java.util.List;
//import java.util.HashMap;
//import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
//import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
//import org.springframework.jdbc.core.namedparam.SqlParameterSource;
//import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservationservice.dto.Category;
import kr.or.connect.reservationservice.dto.ApiCategory;

@Repository
public class CategoryDao {
	private NamedParameterJdbcTemplate jdbc;
	//private SimpleJdbcInsert insertAction;
	private RowMapper<Category> rowMapper = BeanPropertyRowMapper.newInstance(Category.class);
											// 쿼리문을 통해 가져오는 결과값들에 해당하는 속성들과 매칭되는 변수 설정
	private RowMapper<ApiCategory> rowMapperApi = BeanPropertyRowMapper.newInstance(ApiCategory.class);
	public CategoryDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		//this.insertAction = new SimpleJdbcInsert(dataSource)
		//		.withTableName("category")
		//		.usingGeneratedKeyColumns("id");
	}
	/*
	public List<Category> selectAll(Integer start, Integer limit) {
		Map<String, Integer> params = new HashMap<>();
		params.put("start", start);
		params.put("limit", limit); 
		
		return jdbc.query(sql, params, rowMapper);
	}
	
	public int insert(Category category) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(category);
		return insertAction.executeAndReturnKey(params).intValue();
	}

	public int deleteById(Long id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.update(sql, params);
	}
	*/
	public int selectCount() {	// category table 의 항목 수 반환
		return jdbc.queryForObject(SELECT_COUNT, Collections.emptyMap(), Integer.class);
	}
	
	public String selectName(int id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.queryForObject(SELECT_NAME, params, String.class);
	}
	
	public List<Category> selectAll() {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
	/*
	public int selectCategory(int categoryId) {		// api 부분 병합
		Map<String, ?> params = Collections.singletonMap("categoryId", categoryId);
		return jdbc.queryForObject(SELECT_CATEGORY, params, Integer.class);
	}
	*/
	public List<ApiCategory> selectAllApi() {
		return jdbc.query(SELECT_CATEGORY, rowMapperApi);
	}
}
