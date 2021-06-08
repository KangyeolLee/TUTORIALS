package kr.or.connect.reservationservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.or.connect.reservationservice.dto.ApiCategory;
import kr.or.connect.reservationservice.dto.ApiProducts;
import kr.or.connect.reservationservice.dto.ApiPromotion;
import kr.or.connect.reservationservice.service.CategoryService;
import kr.or.connect.reservationservice.service.ProductService;
import kr.or.connect.reservationservice.service.PromotionService;

@Controller
public class MainController {
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	ProductService productService;
	
	@Autowired
	PromotionService promotionService;
	
	@GetMapping(path="/")
	public String mainPage(@RequestParam(name = "start", required = false, defaultValue = "0") int start, ModelMap model) {
		List<ApiCategory> categoryList = categoryService.getCategoriesAndCount();
		List<ApiProducts> productList = productService.getProductsApi(start);
		List<ApiPromotion> promotionList = promotionService.getAllPromotions();
		int countPromotion = promotionService.getCount();
		
		//List<Product> productAllList = productService.getAllProducts();
		//int count = productService.getCount();
		
		model.addAttribute("categoryList", categoryList);
		model.addAttribute("productList", productList);
		//model.addAttribute("count", count);
		model.addAttribute("promotion", promotionList);
		model.addAttribute("countPromotion", countPromotion);
		//model.addAttribute("JSON", getJSON(productAllList));
		
		return "index";
	}
	
	@GetMapping(path="/detail")
	public String detailPage(@RequestParam(name = "id", required = false, defaultValue = "0") int id, ModelMap model) {	
		model.addAttribute("displayInfoId", id);
		return "detail";
	}
	/*
	public String getJSON(List<Product> product) {
		StringBuffer res = new StringBuffer();
		res.append("{ \"product\" : [");
		List<Product> proAll = productService.getAllProducts();						// RestController 를 통해 JSON 을 반환하기에 불필요
		for(int i = 0; i < proAll.size(); i++) {
			res.append("{\"id\": " + proAll.get(i).getId() + ",");
			res.append("\"categoryId\": " + proAll.get(i).getCategoryId() + ",");
			res.append("\"description\": \"" + proAll.get(i).getDescription() + "\",");
			if(i == proAll.size() - 1) {
				res.append("\"content\": \"" + proAll.get(i).getContent() + "\"}");
			}
			else {
				res.append("\"content\": \"" + proAll.get(i).getContent() + "\"},");
			}
		}
		res.append("]}");
		
		return res.toString();
	}
	*/
}

