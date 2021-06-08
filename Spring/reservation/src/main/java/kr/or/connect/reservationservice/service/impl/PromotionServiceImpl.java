package kr.or.connect.reservationservice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.PromotionDao;
import kr.or.connect.reservationservice.dto.ApiPromotion;
import kr.or.connect.reservationservice.service.PromotionService;

@Service
public class PromotionServiceImpl implements PromotionService {
	@Autowired
	PromotionDao promotionDao;
	
	@Override
	@Transactional
	public List<ApiPromotion> getAllPromotions() {
		return promotionDao.selectAllApi();
	}

	@Override
	public int getCount() {
		return promotionDao.getCount();
	}
}
