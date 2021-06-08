package kr.or.connect.reservationservice.service;

import java.util.List;

import kr.or.connect.reservationservice.dto.Category;
import kr.or.connect.reservationservice.dto.ApiCategory;

public interface CategoryService {
	public List<String> getNameList();
	public List<Category> getCategories();
	public List<ApiCategory> getCategoriesAndCount();
}
