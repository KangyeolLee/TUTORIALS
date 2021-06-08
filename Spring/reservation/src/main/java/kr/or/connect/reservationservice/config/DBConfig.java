package kr.or.connect.reservationservice.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

@Configuration
@EnableTransactionManagement
public class DBConfig implements TransactionManagementConfigurer {
	private String driverClassName = "com.mysql.cj.jdbc.Driver";
	private String url = "jdbc:mysql://localhost:3306/reservationdb?useUnicode=true&characterEncoding=utf8&verifyServerCertificate=false&useSSL=true&serverTimezone=UTC";
	private String username = "reservationuser";
	private String password = "reservation123";
	
	@Bean	// DB 연동에 사용할 DataSource를 스프링 빈으로 등록하고 DB 연동 기능을 구현한 빈 객체는 DataSource를 주입받아 사용
	public DataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(driverClassName);
		dataSource.setUrl(url);
		dataSource.setUsername(username);
		dataSource.setPassword(password);
		
		return dataSource;
	}
	
	@Override
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		return transactionManager();
	}
	
	@Bean
	public PlatformTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}

}

// RowMapper의 mapRow() 메서드는 SQL 실행 결과를 구한 ResultSet에서 한 행의 데이터를 읽어와 자바 객체로 변환하는 매퍼 기능을 구현