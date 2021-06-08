package kr.or.connect.reservationservice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.ReservationUserCommentImageDao;
import kr.or.connect.reservationservice.dto.ApiReservationUserCommentImage;
import kr.or.connect.reservationservice.service.ReservationUserCommentImageService;

@Service
public class ReservationUserCommentImageServiceImpl implements ReservationUserCommentImageService {
	@Autowired
	ReservationUserCommentImageDao reservationUserCommentImageDao;
	
	@Override
	@Transactional
	public List<ApiReservationUserCommentImage> getAllCommentsImage() {
		return reservationUserCommentImageDao.selectAll();
	}

}
