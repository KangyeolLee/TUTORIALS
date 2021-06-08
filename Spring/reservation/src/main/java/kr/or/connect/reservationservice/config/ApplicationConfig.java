package kr.or.connect.reservationservice.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(basePackages = {"kr.or.connect.reservationservice.dao", "kr.or.connect.reservationservice.service"})
@Import({DBConfig.class})
public class ApplicationConfig {
	// kr.or.connect.reservationservice.dao 와 kr.or.connect.reservationservice.service 에 구현될
	// 메서드나 클래스들을(= BEAN) 컴포넌트 스캔을 통해 읽어들여 오는 과정 처리
	// 해당 과정에서 DB 연동 관련 설정도 사용하므로 Import 처리
}
