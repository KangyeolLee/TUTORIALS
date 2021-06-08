package kr.or.connect.reservationservice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.ProductImageDao;
import kr.or.connect.reservationservice.dto.ApiProductImage;
import kr.or.connect.reservationservice.service.ProductImageService;

@Service
public class ProductImageServiceImpl implements ProductImageService {
	@Autowired
	ProductImageDao productImageDao;
	
	@Override
	@Transactional
	public List<ApiProductImage> getAllProductImage() {
		return productImageDao.selectAllInfos();
	}
}
