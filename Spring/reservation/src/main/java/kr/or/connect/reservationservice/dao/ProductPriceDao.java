package kr.or.connect.reservationservice.dao;

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

import kr.or.connect.reservationservice.dto.ProductPrice;
import static kr.or.connect.reservationservice.dao.sql.ProductPriceDaoSql.*;

@Repository
public class ProductPriceDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<ProductPrice> rowMapper = BeanPropertyRowMapper.newInstance(ProductPrice.class);
	
	public ProductPriceDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("product_price")
				.usingGeneratedKeyColumns("id");
	}
	
	public int insert(ProductPrice productPrice) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(productPrice);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public List<ProductPrice> selectAll() {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
}
