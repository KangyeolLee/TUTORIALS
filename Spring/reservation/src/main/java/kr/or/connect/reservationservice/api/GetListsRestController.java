package kr.or.connect.reservationservice.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.reservationservice.dto.ApiCategory;
import kr.or.connect.reservationservice.dto.ApiDisplayInfo;
import kr.or.connect.reservationservice.dto.ApiDisplayInfoImage;
import kr.or.connect.reservationservice.dto.ApiProductImage;
import kr.or.connect.reservationservice.dto.ApiProducts;
import kr.or.connect.reservationservice.dto.ApiPromotion;
import kr.or.connect.reservationservice.dto.ApiReservationUserComment;
import kr.or.connect.reservationservice.dto.ApiReservationUserCommentImage;
import kr.or.connect.reservationservice.dto.ProductPrice;
import kr.or.connect.reservationservice.service.CategoryService;
import kr.or.connect.reservationservice.service.DisplayInfoImageService;
import kr.or.connect.reservationservice.service.DisplayInfoService;
import kr.or.connect.reservationservice.service.ProductImageService;
import kr.or.connect.reservationservice.service.ProductPriceService;
import kr.or.connect.reservationservice.service.ProductService;
import kr.or.connect.reservationservice.service.PromotionService;
import kr.or.connect.reservationservice.service.ReservationUserCommentImageService;
import kr.or.connect.reservationservice.service.ReservationUserCommentService;

@RestController
@RequestMapping(path="/api")
public class GetListsRestController {
	@Autowired
	ProductService productService;
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	PromotionService promotionService;
	
	@Autowired
	DisplayInfoService displayInfoService;
	
	@Autowired
	ProductImageService productImageService;
	
	@Autowired
	DisplayInfoImageService displayInfoImageService;
	
	@Autowired
	ReservationUserCommentService reservationUserCommentService;
	
	@Autowired
	ReservationUserCommentImageService reservationUserCommentImageService;
	
	@Autowired
	ProductPriceService productPriceService;
	
	@RequestMapping(path="/products")
	public Map<String, Object> products(@RequestParam(name = "categoryId", required = false, defaultValue = "0") int categoryId,
			@RequestParam(name = "start", required = false, defaultValue = "0") int start) {
		List<ApiProducts> apiProducts = productService.getProductsApi(start);
		List<ApiProducts> apiProductsByCategory = productService.getProductsByCategory(categoryId, start);
		Map<String, Object> jsonValue = new HashMap<>();
		
		if(categoryId == 0) {
			jsonValue.put("totalCount", productService.getCount());
			jsonValue.put("items", apiProducts);
		} else {
			jsonValue.put("totalCount", productService.getCountByCategory(categoryId));
			jsonValue.put("items", apiProductsByCategory);
		}
		
		return jsonValue;
	}
	
	@RequestMapping(path="/products/{displayInfoId}")
	public Map<String, Object> displayInfo(@PathVariable("displayInfoId") int displayInfoId) {
		Map<String, Object> jsonValue = new HashMap<>();	
		List<ApiDisplayInfo> apiDisplayInfo = displayInfoService.getAllDisplayInfo();
		List<ApiProductImage> apiProductImage = productImageService.getAllProductImage();
		List<ApiDisplayInfoImage> apiDisplayInfoImage = displayInfoImageService.getAllDisplayInfoImages();
		List<ApiReservationUserComment> apiReservationUserComment = reservationUserCommentService.getAllComments();
		List<ApiReservationUserCommentImage> apiReservationUserCommentImage = reservationUserCommentImageService.getAllCommentsImage();
		List<ProductPrice> productPrice = productPriceService.getAllProductPrices();
		List<ApiProductImage> listProductImage = new ArrayList<>();
		List<ApiDisplayInfoImage> listDisplayInfoImage = new ArrayList<>();
		List<ApiReservationUserComment> listReservationUserComment = new ArrayList<>();
		List<ProductPrice> listProductPrice = new ArrayList<>();
		
		for(int i = 0; i < apiDisplayInfo.size(); i++) {
			if(apiDisplayInfo.get(i).getId() == displayInfoId) {
				jsonValue.put("displayInfo", apiDisplayInfo.get(i));
				
				for(int j = 0; j < apiProductImage.size(); j++) {
					if(apiDisplayInfo.get(i).getProductId() == apiProductImage.get(j).getProductId()) {
						listProductImage.add(apiProductImage.get(j));	
					}	
				}
				for(int k = 0; k < apiDisplayInfoImage.size(); k++) {
					if(apiDisplayInfo.get(i).getId() == apiDisplayInfoImage.get(k).getDisplayInfoId()) {
						listDisplayInfoImage.add(apiDisplayInfoImage.get(k));
					}
				}
				for(int l = 0; l < apiReservationUserComment.size(); l++) {
					if(apiDisplayInfo.get(i).getProductId() == apiReservationUserComment.get(l).getProductId()) {
						
						for(int m = 0; m < apiReservationUserCommentImage.size(); m++) {
							if(apiReservationUserComment.get(l).getId() == apiReservationUserCommentImage.get(m).getReservationUserCommentId()) {
								apiReservationUserComment.get(l).getCommentsImage().add(apiReservationUserCommentImage.get(m));
							}
						}
						listReservationUserComment.add(apiReservationUserComment.get(l));
						displayInfoId = apiReservationUserComment.get(l).getProductId();
					}
				}
				for(int n = 0; n < productPrice.size(); n++) {
					if(apiDisplayInfo.get(i).getProductId() == productPrice.get(n).getProductId()) {
						listProductPrice.add(productPrice.get(n));
					}
				}
				jsonValue.put("productImages", listProductImage);
				jsonValue.put("displayInfoImages", listDisplayInfoImage);
				jsonValue.put("comments", listReservationUserComment);
				jsonValue.put("averageScore", reservationUserCommentService.getAverage(displayInfoId));
				jsonValue.put("productPrices", listProductPrice);
			}
		}				
		
		return jsonValue;
	}
	
	@RequestMapping(path="/categories")
	public Map<String, Object> categories() {
		List<ApiCategory> apiCategory = categoryService.getCategoriesAndCount();
		Map<String, Object> jsonValue = new HashMap<>();
		
		jsonValue.put("items", apiCategory);
		
		return jsonValue;
	}
	
	@RequestMapping(path="/promotions")
	public Map<String, Object> promotions() {
		List<ApiPromotion> apiPromotions = promotionService.getAllPromotions();
		Map<String, Object> jsonValue = new HashMap<>();
		
		jsonValue.put("items", apiPromotions);
		
		return jsonValue;
	}
}
