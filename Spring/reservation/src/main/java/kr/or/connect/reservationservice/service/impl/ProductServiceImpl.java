package kr.or.connect.reservationservice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.ProductDao;
import kr.or.connect.reservationservice.dto.Product;
import kr.or.connect.reservationservice.dto.ApiProducts;
import kr.or.connect.reservationservice.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductDao productDao;
	
	@Override
	@Transactional
	public List<Product> getProducts(Integer start) {
		List<Product> list = productDao.selectAll(start, ProductService.LIMIT);
		return list;
	}
	@Override
	@Transactional
	public List<Product> getAllProducts() {
		List<Product> list = productDao.selectAll(0, productDao.selectCount());
		return list;
	}
	@Override
	@Transactional
	public int getCount() {
		return productDao.selectCount();
	}
	
	@Override
	@Transactional
	public int getCountByCategory(Integer categoryId) {
		return productDao.selectCountByCategory(categoryId);
	}
	
	@Override		// api 관련 부분 병합
	@Transactional
	public List<ApiProducts> getProductsApi(Integer start) {
		return productDao.selectAllApi(start, ProductService.LIMIT);		
	}
	
	@Override
	@Transactional
	public List<ApiProducts> getProductsByCategory(Integer categoryId, Integer start) {
		return productDao.selectByCategory(categoryId, start, ProductService.LIMIT);
	}
}
