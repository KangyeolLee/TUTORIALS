package kr.or.connect.reservationservice.dao;

import static kr.or.connect.reservationservice.dao.sql.FileInfoDaoSqls.*;

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

import kr.or.connect.reservationservice.dto.FileInfo;

@Repository
public class FileInfoDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<FileInfo> rowMapper = BeanPropertyRowMapper.newInstance(FileInfo.class);
	
	public FileInfoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("file_info")
				.usingGeneratedKeyColumns("id");
	}
	
	public int insert(FileInfo fileInfo) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(fileInfo);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public int deleteById(int id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.update(DELETE_BY_ID, params);
	}
	
	public List<FileInfo> selectAll() {
		return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
	}
	
	public int updateById(String fileName, String saveFileName, Date modifyDate, int id) {
		Map<String, Object> params = new HashMap<>();
		params.put("fileName", fileName);
		params.put("saveFileName", saveFileName);
		params.put("modifyDate", modifyDate);
		params.put("id", id);
		return jdbc.update(UPDATE_BY_ID, params);
	}
}
