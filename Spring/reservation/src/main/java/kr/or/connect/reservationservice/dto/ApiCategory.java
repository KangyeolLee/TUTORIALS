package kr.or.connect.reservationservice.dto;

public class ApiCategory {
	private int CategoryId;
	private String name;
	private int count;
	public int getCategoryId() {
		return CategoryId;
	}
	public void setCategoryId(int categoryId) {
		CategoryId = categoryId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	@Override
	public String toString() {
		return "ApiCategory [CategoryId=" + CategoryId + ", name=" + name + ", count=" + count + "]";
	}
	
	
}
