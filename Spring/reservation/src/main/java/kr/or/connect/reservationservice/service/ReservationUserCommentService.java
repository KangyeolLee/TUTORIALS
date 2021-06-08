package kr.or.connect.reservationservice.service;

import java.util.List;

import kr.or.connect.reservationservice.dto.ApiReservationUserComment;

public interface ReservationUserCommentService {
	public List<ApiReservationUserComment> getAllComments();
	public double getAverage(int productId);
}
