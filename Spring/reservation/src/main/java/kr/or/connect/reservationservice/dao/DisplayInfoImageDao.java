package kr.or.connect.reservationservice.dao;

import static kr.or.connect.reservationservice.dao.sql.DisplayInfoImageDaoSqls.*;

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

import kr.or.connect.reservationservice.dto.ApiDisplayInfoImage;
import kr.or.connect.reservationservice.dto.DisplayInfoImage;

@Repository
public class DisplayInfoImageDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<DisplayInfoImage> rowMapper = BeanPropertyRowMapper.newInstance(DisplayInfoImage.class);
	private RowMapper<ApiDisplayInfoImage> rowMapperApi = BeanPropertyRowMapper.newInstance(ApiDisplayInfoImage.class);
	
	public DisplayInfoImageDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("display_info_image")
				.usingGeneratedKeyColumns("id");
	}
	
	public List<DisplayInfoImage> selectAll(DisplayInfoImage displayInfoImgae) {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
	
	public int insert(DisplayInfoImage displayInfoImage) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(displayInfoImage);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public List<ApiDisplayInfoImage> selectAllInfo() {
		return jdbc.query(SELECT_ALL_INFO, Collections.emptyMap(), rowMapperApi);
	}
}
