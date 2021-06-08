package kr.or.connect.reservationservice.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservationservice.dao.DisplayInfoDao;
import kr.or.connect.reservationservice.dto.ApiDisplayInfo;
import kr.or.connect.reservationservice.service.DisplayInfoService;

@Service
public class DisplayInfoServiceImpl implements DisplayInfoService {
	@Autowired
	DisplayInfoDao displayInfoDao;
	
	@Override
	@Transactional
	public List<ApiDisplayInfo> getAllDisplayInfo() {
		return displayInfoDao.selectAllInfos();
	}

}
