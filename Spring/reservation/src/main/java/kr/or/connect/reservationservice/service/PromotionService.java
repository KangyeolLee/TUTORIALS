package kr.or.connect.reservationservice.service;

import java.util.List;

import kr.or.connect.reservationservice.dto.ApiPromotion;

public interface PromotionService {
	public List<ApiPromotion> getAllPromotions();
	public int getCount();
}
