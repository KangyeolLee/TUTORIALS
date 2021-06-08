package kr.or.connect.reservationservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/*
스프링 4.x 버전은 자바 6을 기준으로 한다.
자바 7 버전까지는 인터페이스에 디폴트 메서드가 없기 때문에 설정 클래스에서 WebMvcConfigurer 인터페이스를 상속하면
인터페이스에 정의되어 있는 모든 메서드를 추가해야 했다.
이런 이유로 WebMvcConfigurer 인터페이스 대신 이 인터페이스의 기본 구현을 제공하는 WebMvcConfigurerAdapter 클래스를 상속해서
필요한 메서드만 재정의하는 방식으로 설정했다.
[출처] chap10. 스프링 MVC 프레임워크 동작 방식|작성자 강프로그래머 
*/

@Configuration
@EnableWebMvc // @EnableWebMvc 애노테이션을 사용하면 WebMvcConfigurer 타입인 빈 객체의 메서드를 호출해서 MVC 설정을 추가한다.
@ComponentScan(basePackages = {"kr.or.connect.reservationservice.controller, kr.or.connect.reservationservice.api"})
public class WebMvcContextConfiguration extends WebMvcConfigurerAdapter {
	@Override	// 모든 URL 요청에 대한 예외처리
	public void addResourceHandlers(ResourceHandlerRegistry reg) {
		reg.addResourceHandler("/css/**").addResourceLocations("/css/").setCachePeriod(31556926);
		reg.addResourceHandler("/img/**").addResourceLocations("/img/").setCachePeriod(31556926);
		reg.addResourceHandler("/js/**").addResourceLocations("/js/").setCachePeriod(31556926);
	}
	
	@Override	// 매핑 정보가 없는 URL에 대한 처리
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
		/*
		DefaultServletHttpRequestHandler는 클라이언트의 모든 요청을 WAS(웹 어플리케이션 서버, 톰캣이나 웹로직 등)가 제공하는 디폴트 서블릿에 전달한다. 

		예를 들어 "/index.html"에 대한 처리를 DefualtServletHttpRequestHandler에 요청하면 이 요청을 다시 디폴트 서블릿에 전달해서 처리하도록 한다.

		그리고 SimpleUrlHandlerMapping을 이용해서 모든 경로("/**")를 DefaultServletHttpRequestHandler를 이용해서 처리하도록 설정한다
		*/
	}
	
	@Override
	public void addViewControllers(final ViewControllerRegistry reg) {
		System.out.println("addViewControllers가 호출됩니다.");
		reg.addViewController("/").setViewName("index");
	}
	
	@Bean
	public InternalResourceViewResolver getInternalResourceViewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix("/WEB-INF/views/");
		resolver.setSuffix(".jsp");
		return resolver;
	}
}
