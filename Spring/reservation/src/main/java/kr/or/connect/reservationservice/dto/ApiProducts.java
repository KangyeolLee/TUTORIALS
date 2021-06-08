package kr.or.connect.reservationservice.dto;

public class ApiProducts {
	private int id;
	private int categoryId;
	private String placeName;
	private String content;
	private String description;
	private String saveFileName;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public String getPlaceName() {
		return placeName;
	}
	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getSaveFileName() {
		return saveFileName;
	}
	public void setSaveFileName(String saveFileName) {
		this.saveFileName = saveFileName;
	}
	@Override
	public String toString() {
		return "ApiProducts [id=" + id + ", categoryId=" + categoryId + ", placeName=" + placeName + ", content="
				+ content + ", description=" + description + ", saveFileName=" + saveFileName + "]";
	}
	
}
