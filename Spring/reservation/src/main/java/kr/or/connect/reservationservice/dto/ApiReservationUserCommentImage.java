package kr.or.connect.reservationservice.dto;

import java.util.Date;

public class ApiReservationUserCommentImage {
	private int id;
	private String fileName;
	private String saveFileName;
	private String contentType;
	private int deleteFlag;
	private Date createDate;
	private Date modifyDate;
	private int reservationUserCommentImageid;
	private int reservationInfoId;
	private int reservationUserCommentId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getSaveFileName() {
		return saveFileName;
	}
	public void setSaveFileName(String saveFileName) {
		this.saveFileName = saveFileName;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public int getDeleteFlag() {
		return deleteFlag;
	}
	public void setDeleteFlag(int deleteFlag) {
		this.deleteFlag = deleteFlag;
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
	public int getReservationUserCommentImageid() {
		return reservationUserCommentImageid;
	}
	public void setReservationUserCommentImageid(int reservationUserCommentImageid) {
		this.reservationUserCommentImageid = reservationUserCommentImageid;
	}
	public int getReservationInfoId() {
		return reservationInfoId;
	}
	public void setReservationInfoId(int reservationInfoId) {
		this.reservationInfoId = reservationInfoId;
	}
	public int getReservationUserCommentId() {
		return reservationUserCommentId;
	}
	public void setReservationUserCommentId(int reservationUserCommentId) {
		this.reservationUserCommentId = reservationUserCommentId;
	}
	@Override
	public String toString() {
		return "ApiReservationUserCommentImage [id=" + id + ", fileName=" + fileName + ", saveFileName=" + saveFileName
				+ ", contentType=" + contentType + ", deleteFlag=" + deleteFlag + ", createDate=" + createDate
				+ ", modifyDate=" + modifyDate + ", reservationUserCommentImageid=" + reservationUserCommentImageid
				+ ", reservationInfoId=" + reservationInfoId + ", reservationUserCommentId=" + reservationUserCommentId
				+ "]";
	}
	
}
