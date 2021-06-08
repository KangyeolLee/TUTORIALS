package kr.or.connect.reservationservice.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ApiReservationUserComment {
	private int id;
	private int productId;
	private int reservationInfoId;
	private int score;
	private String comment;
	private Date createDate;
	private Date modifyDate;
	private String reservationName;
	private String reservationTel;
	private String reservationEmail;
	private Date reservationDate;
	private List<ApiReservationUserCommentImage> commentsImage = new ArrayList<>();
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public int getReservationInfoId() {
		return reservationInfoId;
	}
	public void setReservationInfoId(int reservationInfoId) {
		this.reservationInfoId = reservationInfoId;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}
	public String getReservationName() {
		return reservationName;
	}
	public void setReservationName(String reservationName) {
		this.reservationName = reservationName;
	}
	public String getReservationTel() {
		return reservationTel;
	}
	public void setReservationTel(String reservationTel) {
		this.reservationTel = reservationTel;
	}
	public String getReservationEmail() {
		return reservationEmail;
	}
	public void setReservationEmail(String reservationEmail) {
		this.reservationEmail = reservationEmail;
	}
	public Date getReservationDate() {
		return reservationDate;
	}
	public void setReservationDate(Date reservationDate) {
		this.reservationDate = reservationDate;
	}
	public List<ApiReservationUserCommentImage> getCommentsImage() {
		return commentsImage;
	}
	public void setCommentsImage(List<ApiReservationUserCommentImage> commentsImage) {
		this.commentsImage = commentsImage;
	}
	@Override
	public String toString() {
		return "ApiReservationUserComment [id=" + id + ", productId=" + productId + ", reservationInfoId="
				+ reservationInfoId + ", score=" + score + ", comment=" + comment + ", createDate=" + createDate
				+ ", modifyDate=" + modifyDate + ", reservationName=" + reservationName + ", reservationTel="
				+ reservationTel + ", reservationEmail=" + reservationEmail + ", reservationDate=" + reservationDate
				+ ", commentsImage=" + commentsImage + "]";
	}
	
	
}
