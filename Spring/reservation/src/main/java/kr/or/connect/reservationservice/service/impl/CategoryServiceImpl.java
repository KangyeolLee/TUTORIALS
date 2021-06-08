package kr.or.connect.reservationservice.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.CategoryDao;
import kr.or.connect.reservationservice.dto.Category;
import kr.or.connect.reservationservice.dto.ApiCategory;
import kr.or.connect.reservationservice.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	CategoryDao categoryDao;
	
	@Override
	@Transactional
	public List<String> getNameList() {
		int index = categoryDao.selectCount();
		List<String> names = new ArrayList<String>();
		
		for(int i = 1; i <= index; i++) {
			names.add(categoryDao.selectName(i));
		}
		return names;
	}
	@Override
	@Transactional
	public List<Category> getCategories() {
		return categoryDao.selectAll();
	}
	
	@Override
	@Transactional
	public List<ApiCategory> getCategoriesAndCount() {
		return categoryDao.selectAllApi();
	}
}
