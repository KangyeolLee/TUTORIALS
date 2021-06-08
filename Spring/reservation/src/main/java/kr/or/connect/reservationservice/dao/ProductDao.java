package kr.or.connect.reservationservice.dao;

import static kr.or.connect.reservationservice.dao.sql.ProductDaoSqls.*;



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

import kr.or.connect.reservationservice.dto.Product;
import kr.or.connect.reservationservice.dto.ApiProducts;

@Repository
public class ProductDao {
	 private NamedParameterJdbcTemplate jdbc;
	 private SimpleJdbcInsert insertAction;
	 private RowMapper<Product> rowMapper = BeanPropertyRowMapper.newInstance(Product.class);
	 private RowMapper<ApiProducts> rowMapperApi = BeanPropertyRowMapper.newInstance(ApiProducts.class);
	 
	 public ProductDao(DataSource dataSource) {
		 this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		 this.insertAction = new SimpleJdbcInsert(dataSource)
				 .withTableName("product")
				 .usingGeneratedKeyColumns("id");
	 }
	 
	 public int insert(Product product) {
		 SqlParameterSource params = new BeanPropertySqlParameterSource(product);
		 return insertAction.executeAndReturnKey(params).intValue();
	 }
	 
	 public int deleteById(int id) {
		 Map<String, ?> params = Collections.singletonMap("id", id);
		 return jdbc.update(DELETE_BY_ID, params);
	 }
	 
	 public int updateById(Integer categoryId, String description, String content, Date modifyDate, Integer id) {
		 Map<String, Object> params = new HashMap<>();
		 params.put("categoryId", categoryId);
		 params.put("description", description);
		 params.put("content", content);
		 params.put("modifyDate", modifyDate);
		 params.put("id", id);
		 return jdbc.update(UPDATE_BY_ID, params);
	 }
	 
	 public List<Product> selectAll(Integer start, Integer limit) {
		 Map<String, Integer> params = new HashMap<>();
		 params.put("start", start);
		 params.put("limit", limit);
		 return jdbc.query(SELECT_PAGING, params, rowMapper);		
	 }
	 
	 public int selectCount() {
		 return jdbc.queryForObject(SELECT_COUNT_ALL, Collections.emptyMap(), Integer.class);
	 }
	 
	 public int selectCountByCategory(Integer categoryId) {
		 Map<String, ?> params = Collections.singletonMap("categoryId", categoryId);
		 return jdbc.queryForObject(SELECT_COUNT_BY_CATEGORY, params, Integer.class);
	 }
	 
	 public List<ApiProducts> selectByCategory(Integer categoryId, Integer start, Integer limit) {		// api/products 관련 부분 병합
		 Map<String, Integer> params = new HashMap<>();													// 카테고리 별 정렬
		 params.put("categoryId", categoryId);
		 params.put("start", start);
		 params.put("limit", limit);
		 return jdbc.query(SELECT_BY_CATEGORY, params, rowMapperApi);
	 }
	
	 public List<ApiProducts> selectAllApi(Integer start, Integer limit) {		// api/products 관련 부분 병합
		 Map<String, Integer> params = new HashMap<>();							// 모든 값 정렬
		 params.put("start", start);
		 params.put("limit", limit);
		 return jdbc.query(SELECT_ALL, params, rowMapperApi);
	 }
}
