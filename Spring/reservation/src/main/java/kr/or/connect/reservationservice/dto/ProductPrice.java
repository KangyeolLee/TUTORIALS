package kr.or.connect.reservationservice.dto;

import java.util.Date;

public class ProductPrice {
	private int id;
	private int productId;
	private char priceTypeName;
	private long price;
	private double discountRate;
	private Date createDate;
	private Date modifyDate;
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
	public char getPriceTypeName() {
		return priceTypeName;
	}
	public void setPriceTypeName(char priceTypeName) {
		this.priceTypeName = priceTypeName;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}
	public double getDiscountRate() {
		return discountRate;
	}
	public void setDiscountRate(double discountRate) {
		this.discountRate = discountRate;
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
	@Override
	public String toString() {
		return "ProductPrice [id=" + id + ", productId=" + productId + ", priceTypeName=" + priceTypeName + ", price="
				+ price + ", discountRate=" + discountRate + "]";
	}
	
	
}
