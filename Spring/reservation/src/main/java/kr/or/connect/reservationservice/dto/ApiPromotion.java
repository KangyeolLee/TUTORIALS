package kr.or.connect.reservationservice.dto;

public class ApiPromotion {
	private int id;
	private int productId;
	private String saveFileName;
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
	public String getSaveFileName() {
		return saveFileName;
	}
	public void setSaveFileName(String saveFileName) {
		this.saveFileName = saveFileName;
	}
	@Override
	public String toString() {
		return "ApiPromotion [id=" + id + ", productId=" + productId + ", saveFileName=" + saveFileName + "]";
	}
	
}
