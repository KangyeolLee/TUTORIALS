package kr.or.connect.reservationservice.service;

import java.util.List;

import kr.or.connect.reservationservice.dto.Product;
import kr.or.connect.reservationservice.dto.ApiProducts;

public interface ProductService {
	public static final Integer LIMIT = 4;
	public List<Product> getProducts(Integer start);
	public List<Product> getAllProducts();
	public int getCount();
	public int getCountByCategory(Integer categoryId);
	public List<ApiProducts> getProductsApi(Integer start);		// api 부분 병합
	public List<ApiProducts> getProductsByCategory(Integer categoryId, Integer start);
}
