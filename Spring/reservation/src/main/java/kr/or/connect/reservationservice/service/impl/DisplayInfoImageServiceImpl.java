package kr.or.connect.reservationservice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.DisplayInfoImageDao;
import kr.or.connect.reservationservice.dto.ApiDisplayInfoImage;
import kr.or.connect.reservationservice.service.DisplayInfoImageService;

@Service
public class DisplayInfoImageServiceImpl implements DisplayInfoImageService {
	@Autowired
	DisplayInfoImageDao displayInfoImageDao;
	
	@Override
	@Transactional
	public List<ApiDisplayInfoImage> getAllDisplayInfoImages() {
		return displayInfoImageDao.selectAllInfo();
	}

}
