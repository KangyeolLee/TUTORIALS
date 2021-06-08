package kr.or.connect.reservationservice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.ReservationUserCommentDao;
import kr.or.connect.reservationservice.dto.ApiReservationUserComment;
import kr.or.connect.reservationservice.service.ReservationUserCommentService;

@Service
public class ReservationUserCommentServiceImpl implements ReservationUserCommentService {
	@Autowired
	ReservationUserCommentDao reservationUserCommentDao;
	
	@Override
	@Transactional
	public List<ApiReservationUserComment> getAllComments() {
		return reservationUserCommentDao.selectAll();
	}
	
	@Override
	@Transactional
	public double getAverage(int productId) {
		List<ApiReservationUserComment> list = getAllComments();
		int check = 0;
		
		for(int i = 0; i < list.size(); i++) {
			if(list.get(i).getProductId() == productId) {
				check++;
			}
		}
		if(check > 0) {
			return reservationUserCommentDao.getScores(productId);
		}
		else {
			return 0;
		}
	}

}
