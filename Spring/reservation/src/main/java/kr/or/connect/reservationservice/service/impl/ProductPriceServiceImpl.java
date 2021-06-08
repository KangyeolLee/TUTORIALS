package kr.or.connect.reservationservice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.ProductPriceDao;
import kr.or.connect.reservationservice.dto.ProductPrice;
import kr.or.connect.reservationservice.service.ProductPriceService;

@Service
public class ProductPriceServiceImpl implements ProductPriceService {
	@Autowired
	ProductPriceDao productPriceDao;
	
	@Override
	@Transactional
	public List<ProductPrice> getAllProductPrices() {
		return productPriceDao.selectAll();
	}

}
