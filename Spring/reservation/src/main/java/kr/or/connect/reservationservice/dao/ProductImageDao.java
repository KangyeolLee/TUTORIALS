package kr.or.connect.reservationservice.dao;

import static kr.or.connect.reservationservice.dao.sql.ProductImageDaoSqls.*;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservationservice.dto.ApiProductImage;
import kr.or.connect.reservationservice.dto.ProductImage;

@Repository
public class ProductImageDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<ProductImage> rowMapper = BeanPropertyRowMapper.newInstance(ProductImage.class);
	private RowMapper<ApiProductImage> rowMapperApi = BeanPropertyRowMapper.newInstance(ApiProductImage.class);
	
	public ProductImageDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("product_image")
				.usingGeneratedKeyColumns("id");
	}
	
	public List<ProductImage> selectAll(ProductImage productImage) {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
	
	public int insert(ProductImage productImage) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(productImage);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public List<ApiProductImage> selectAllInfos() {
		return jdbc.query(SELECT_ALL_INFO, Collections.emptyMap(), rowMapperApi);
	}
}
