import React, { Component } from 'react';
import './Dashboard.css';
import M from 'materialize-css';
import SlideShow from './SlideShow';

class Dashboard extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12">
            <h1 className='white-text center'>이 달의 모임</h1>
          </div>

          {/* Modal Trigger Area */}
          <a href='#modal1' className='modal-trigger black-text'>
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img src="poster/blackmirror_poster.png" alt="poster1" className='responsive-img' />
                </div>
                {/* <div className="card-content grey darken-4 blue-grey-text text-lighten-4 blackMirror">
                  <blockquote><span className='card-title'>블랙미러</span></blockquote>
                  <p className=''>08.13 / 08.20 / 08.27 (매주 화)</p>
                </div> */}
              </div>
            </div>
          </a>

          <a href='#modal2' className='modal-trigger black-text'>
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img src="poster/sport_poster.png" alt="poster2" className='responsive-img' />
                </div>
                {/* <div className="card-content sports">
                  <blockquote><span className="card-title">운동</span></blockquote>
                  <p>08.07 / 08.14 / 08.21 / 08.23 (수 / 마지막 금)</p>
                </div> */}
              </div>
            </div>
          </a>

          <a href='#modal3' className='modal-trigger black-text'>
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img src="poster/overnight_poster.png" alt="poster4" className='responsive-img' />
                </div>
                {/* <div className="card-content deep-purple darken-3 white-text overNight">
                  <blockquote><span className="card-title">밤샘</span></blockquote>
                  <p>08.23 (금)</p>
                </div> */}
              </div>
            </div>
          </a>

        </div>

        {/* Modal Structures */}
        <div id="modal1" className="modal modal-fixed-footer container blackMirror">   
          <div className="modal-content grey darken-4 blue-grey-text text-lighten-4">
            <div className='img-wrapper'><img src="poster/blackmirror_content.jpg" alt="" className='responsive-img' /></div>  
            <h4 className='modal-title'>블랙미러: 미래 사회 매뉴얼</h4>
            <p className='modal-second-title'>"당신이 이따금 마주했을 검은 거울엔 무엇이 담겨 있었나요?"</p>
            <div className="divider"></div>
            {/* <img src="poster/blackmirror_content.jpg" alt="" className='responsive-img' /> */}
            <div className="meetingIntro">
              <blockquote><p className='sub-title'>모임 소개 「블랙미러: 미래 사회 매뉴얼」</p></blockquote>
              <p>기술의 발전으로 인해 찾아올 미래 사회의 모습을 담은 드라마, ‘블랙 미러’</p>
              <p>드라마 속 이야기는 아직 당신이 들고 있는 화면 속의 일입니다.</p>
              <p>하지만 사람을 별점으로 평가하고, 돈이 없는 사람만 광고를 보고, 원하는 기억을 돌려보는 모습은 어쩌면,</p>
              <p>멀지 않은 미래의 이야기일지도 모릅니다.</p>
              <p>너무나도 빠르게 변화하는 사회의 내일은 어떤 모습일까요?</p>
              <p>그 속의 당신은 어떤 모습인가요?</p>
              <p>다가오는 미래의 주연이 될 20대들이 모여 함께 매뉴얼을 만들어봅시다!</p>
            </div>

            <div className="meetingProgress">
              <blockquote><p className='sub-title'>모임 진행</p></blockquote>
              <p className='sub-highlight'><i className="material-icons">message</i>&nbsp;&nbsp;Part 1. 작품 속 미래</p>
              <p>인상 깊었던 장면, 작품 속 미래 사회의 기술과 그로 인한 문제들.</p>
              <p>전반적인 작품에 대한 이야기를 나눕니다.</p>
    
              <p className='sub-highlight'><i className="material-icons">message</i>&nbsp;&nbsp;Part 2. 현실 그리고 한국에 적용하기</p>
              <p>블랙미러는 현재 사회에 존재하는 문제점들을 미래의 모습을 통해 시사합니다.</p>
              <p>작품에서 보여주는 문제점들을 현실에 맞게 적용하고, 한국 사회에서 나타날 문제들에 대해 이야기를 나눕니다.</p>
          
              <p className='sub-highlight'><i className="material-icons">message</i>&nbsp;&nbsp;Part 3. 매뉴얼 만들기</p>
              <p>작품 이후의 주인공의 삶은 어떻게 되었을까요?</p>
              <p>작품을 통해 드러난 문제점들에 대한 본인의 생각은 어떤가요?</p>
              <p>작품 속 주인공의 모습을 참고하여 다가올 미래에 대한 매뉴얼을 함께 제작해 봅시다.</p>
            </div>
       
            <div className="meetingTogether">
              <blockquote><p className='sub-title'>함께 해요!</p></blockquote>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp; 블랙미러에 대해 대화를 나누고 싶지만 이야기할 곳이 없는 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp; 블랙미러를 보고 난 여운이 길게 남아 있는 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp; 나날히 발전하는 기술에 왠지 모를 찝찝함을 가지신 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp; 자유롭게 자기 생각을 말하고 교환하는 걸 좋아하는 모든 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp; 이세돌vs알파고 승부에 충격을 받은 분들</p>
            </div>

            <div className="meetingManual">
              <blockquote><p className='sub-title'>참가 매뉴얼</p></blockquote>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 1.</strong> 홈페이지를 통해 「블랙미러: 미래 사회 매뉴얼」 모임에 참가 신청한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 2.</strong> 모임 참여 확인 후, 오픈채팅방에 참여한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 3.</strong> 에피소드 시청 후, 함께 이야기 나누고 싶은 내용을 채팅방에 올린다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 4.</strong> 모임 참여 전 오픈 채팅방에 업로드 되는 발제문을 확인한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 5.</strong> 모임에 참여하여 즐겁게 이야기 나눈다. :)</p>
            </div>

            <div className="meetingPeople">
              <blockquote><p className='sub-title'>모집 인원</p></blockquote>
              <p><i className="material-icons">people</i>&nbsp;&nbsp;6명</p>
            </div>

            <div className="meetingTime">
              <blockquote><p className='sub-title'>모임 일시</p></blockquote>
              <p><i className="material-icons">access_time</i>&nbsp;&nbsp;<strong>Week 1.</strong> 2019년 8월 13일 (화) 오전 11시<span><i className="material-icons">attachment</i>&nbsp;S3 ep.6 「미움 받는 사람들」</span></p>
              <p><i className="material-icons">access_time</i>&nbsp;&nbsp;<strong>Week 2.</strong> 2019년 8월 20일 (화) 오전 11시<span><i className="material-icons">attachment</i>&nbsp;S3 ep.1 「추락」</span></p>
              <p><i className="material-icons">access_time</i>&nbsp;&nbsp;<strong>Week 3.</strong> 2019년 8월 27일 (화) 오전 11시<span><i className="material-icons">attachment</i>&nbsp;S4 ep.4 「미움 받는 사람들」</span></p>
            </div>

            <div className="meetingPlace">
              <blockquote><p className='sub-title'>장소</p></blockquote>
              <p><i className="material-icons">location_on</i>&nbsp;&nbsp;공덕역 카페 오펠레 (서울 마포구 독막로 291-5)</p>
            </div>

            <div className="divider interval"></div>
            <div className="notice red-text center">
              <p><i className="material-icons">error</i>&nbsp;&nbsp;모임 참여에 대한 비용은 무료이며, 모임 중 발생하는 비용(커피 값)은 개인 부담입니다.</p><br/>
              <p><i className="material-icons">error</i>&nbsp;&nbsp;문의: untilburnout@naver.com</p>
            </div>

          </div>
          <div className="modal-footer">
            <a target='_blank' rel="noopener noreferrer" href="https://docs.google.com/forms/d/1d2LURmBspdccENR0Zo9x9fY4Yi-YeAloJb9DIDihNvo" className='waves-effect waves-green btn-flat white-text'>신청하기</a>  
            <a href="#!" className='modal-close waves-effect waves-green btn-flat white-text'>close</a>
          </div>
        </div>

        <div id="modal2" className="modal modal-fixed-footer container sports">
          <div className="modal-content">
            <SlideShow />
            <h4 className='modal-title'>운동이 별거야?</h4>
            <p className='modal-second-title'>“저도 혼자 하긴 좀 그런데 같이 하실래요?”</p>
            <div className="divider"></div>
            <div className="meetingIntro">
              <blockquote><p className='sub-title'>모임 소개 「운동이 별거야?」</p></blockquote>
              <p>해보고 싶은 운동이 있는데 선뜻 하기 어려우신가요?</p>
              <p>동호회는 부담스럽고 가볍게 즐기고 싶은데 마땅한 곳을 못 찾으셨나요?</p>
              <p>가볍게 맛보는 운동, 같이 하실래요?</p>
              <p>친구와 함께 방문하고 여러 사람들과 함께 운동해요!</p>
              <p>더운 여름, 시원하게 운동할 수 있도록 실내로 준비 했습니다 :)</p>
            </div>

            <div className="meetingProgress">
              <blockquote><p className='sub-title'>모임 진행</p></blockquote>
              <p><i className="material-icons">message</i>&nbsp;&nbsp;<strong>Week 1.</strong> 볼링 l 나랑 같이 쳐볼링?</p>
              <p><i className="material-icons">message</i>&nbsp;&nbsp;<strong>Week 2.</strong> 배드민턴 l 아무리 짜내도 안 나와요</p>
              <p><i className="material-icons">message</i>&nbsp;&nbsp;<strong>Week 3.</strong> 사격 l 저거 맞추면 나랑 사격</p>
              <p><i className="material-icons">message</i>&nbsp;&nbsp;<strong>Week 4.</strong> 클라이밍 l 넌 너무 암벽해</p>
            </div>
       
            <div className="meetingTogether">
              <blockquote><p className='sub-title'>함께 해요!</p></blockquote>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;부담 없이 다양한 운동을 경험해보고 싶으신 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;여러 사람과 함께 운동하는 것을 즐기는 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;진짜 친한 친구랑 막상 함께 운동은 안 해보신 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;고등학교 체육시간 이후로 격하게 몸을 움직여보지 않으신 분들</p>
            </div>

            <div className="meetingManual">
              <blockquote><p className='sub-title'>참가 규칙</p></blockquote>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Rule 1.</strong> 홈페이지를 통해 「운동이 별거야?」 모임에 친구와 함께 참가 신청한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Rule 2.</strong> 모임 참여 확인 후, 오픈채팅방에 참여한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Rule 3.</strong> 오픈채팅방에 올라오는 운동법을 간단하게 숙지한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Rule 4.</strong> 모임에 참여하여 운동의 매력을 느껴본다. :)</p>
            </div>

            <div className="meetingPeople">
              <blockquote><p className='sub-title'>모집 인원</p></blockquote>
              <p><i className="material-icons">people</i>&nbsp;&nbsp;8명 (4팀)</p>
            </div>

            <div className="meetingTime">
              <blockquote><p className='sub-title'>모임 일시 및 장소</p></blockquote>
              <p><i className="material-icons">access_time</i>&nbsp;&nbsp;<strong>Week 1.</strong>2019년 8월 07일 (수) 오후 2시 <i className="material-icons">location_on</i>&nbsp;&nbsp;실내 볼링장, 공덕역 클럽 스트라이크 </p>
              <p><i className="material-icons">access_time</i>&nbsp;&nbsp;<strong>Week 2.</strong>2019년 8월 14일 (수) 오후 2시 <i className="material-icons">location_on</i>&nbsp;&nbsp;실내 배드민턴장, 오동 근린공원 실내배드민턴장</p>
              <p><i className="material-icons">access_time</i>&nbsp;&nbsp;<strong>Week 3.</strong>2019년 8월 21일 (수) 오후 2시 <i className="material-icons">location_on</i>&nbsp;&nbsp;실내 사격장, 목동 실내사격장</p>
              <p><i className="material-icons">access_time</i>&nbsp;&nbsp;<strong>Week 4.</strong>2019년 8월 23일 (금) 오후 2시 <i className="material-icons">location_on</i>&nbsp;&nbsp;실내 클라이밍장, 송파 락스타 클라이밍</p>
            </div>

            <div className="meetingPlace">
              <p className='red-text'><i className="material-icons">error</i>&nbsp;&nbsp;<strong>장소는 참여인원과 예약 현황에 따라 변경 될 수 있음을 알려드립니다.</strong></p>
            </div>

            <div className="divider interval"></div>
            <div className="notice red-text center">
              <p><i className="material-icons">error</i>&nbsp;&nbsp;모임 참여에 대한 비용은 무료이며, 모임 중 발생하는 비용(게임비)은 개인 부담입니다.</p><br/>
              <p><i className="material-icons">error</i>&nbsp;&nbsp;문의: untilburnout@naver.com</p>
            </div>

          </div>
          <div className="modal-footer">
          <a target='_blank' rel="noopener noreferrer" href="https://docs.google.com/forms/d/19sOzWT9E7TZE8kQ1fpVr_UNcQ75P8q_A9odaLzj8hs0" className='waves-effect waves-green btn-flat'>신청하기</a>
            <a href="#!" className='modal-close waves-effect waves-green btn-flat'>close</a>
          </div>
        </div>

        <div id="modal3" className="modal modal-fixed-footer container overNight ">
          <div className="modal-content deep-purple darken-3 white-text">
            <div className="img-wrapper"><img src="poster/overnight_content.jpg" alt="" className='responsive-img' /></div>
            <h4 className='modal-title'>서울의 밤</h4>
            <p className='modal-second-title'>“잠들기엔 아쉬운 오늘, 잠들지 않는 서울의 밤”</p>
            <div className="divider"></div>
            <div className="meetingIntro">
              <blockquote><p className='sub-title'>모임 소개 「서울의 밤」</p></blockquote>
              <p>어스름한 새벽, 홀로 어둠을 밝히는 가로등, 간간히 들리는 찻소리</p>
              <p>무심코 스쳐간 풍경의 다른 모습을 보신 적이 있으신가요?</p>
              <p>낮에는 볼 수 없었던 서울의 색다른 모습을 눈에 담아보세요.</p>
              <p>색다른 서울의 모습을 함께 느끼고, 진솔한 대화도 나눠봅시다.</p>
            </div>

            <div className="meetingProgress">
              <blockquote><p className='sub-title'>모임 진행</p></blockquote>
              <p><i className="material-icons">filter_1</i>&nbsp; 23:00 ~ 24:00 l 아이스브레이킹 및 코스 짜기 (혜화역 카페)</p>
              <p>(추천 지 : 낙산공원, 덕수궁 돌담길, 서울로, 북악스카이웨이, 한강, 석촌호수)</p>
              <p><i className="material-icons">filter_2</i>&nbsp; 00:00 ~ 01:00 l 자정의 낙산공원</p>  
              <p><i className="material-icons">filter_3</i>&nbsp; 01:30 ~ 02:30 l 새벽 한 시 반의 북악스카이웨이</p>
              <p><i className="material-icons">filter_4</i>&nbsp; 03:00 ~ 05:00 l 나의 첫인상 그리고 진솔한 이야기 </p>
              <p><i className="material-icons">filter_5</i>&nbsp; 05:30 ~ 06:30 l 새벽 다섯 시 반의 서울로 7017*</p>
              <p><i className="material-icons">filter_6</i>&nbsp; 06:30 ~ 07:00 l 다시 일상으로</p><br/>
              <p className='red-text'><i className="material-icons">error</i>&nbsp;&nbsp;<strong>낙산공원 이외의 장소는 임의로 지정된 곳이며, 함께 모여 정합니다!</strong></p>
            </div>
       
            <div className="meetingTogether">
              <blockquote><p className='sub-title'>함께 해요!</p></blockquote>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;감성 가득 인생 샷 남기고 싶으신 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;새벽 밤거리 걷는 기분을 좀 아시는 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;아침형 인간과는 거리가 머신 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;남들이 보는 나의 모습이 궁금하신 분들</p>
              <p><i className="material-icons">keyboard_arrow_right</i>&nbsp;무더운 밤 ~ 잠은 오지 않~는 분들</p>
            </div>

            <div className="meetingManual">
              <blockquote><p className='sub-title'>참여 방법</p></blockquote>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 1.</strong> 홈페이지를 통해 「서울의 밤」 모임에 참가 신청한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 2.</strong> 모임 참여 확인 후, 오픈채팅방에 참여한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 3.</strong> 모임에 참여하기 전 충분한 휴식을 취한다.</p>
              <p><i className="material-icons">check</i>&nbsp;&nbsp;<strong>Step 4.</strong> 모임에 참여하여 잊지 못할 서울의 밤을 눈에 담는다. :)</p>
            </div>

            <div className="meetingPeople">
              <blockquote><p className='sub-title'>모집 인원</p></blockquote>
              <p><i className="material-icons">people</i>&nbsp;&nbsp;8명</p>
            </div>

            <div className="meetingTime">
              <blockquote><p className='sub-title'>모임 일시 및 장소</p></blockquote>
              <p><i className="material-icons">access_time</i>&nbsp;&nbsp;8월 23일 (금) 늦은 11시</p>
              <p><i className="material-icons">location_on</i>&nbsp;&nbsp;혜화역 카페</p>
            </div>

            <div className="divider interval"></div>
            <div className="notice red-text center">
              <p><i className="material-icons">error</i>&nbsp;&nbsp;모임 참여에 대한 비용은 무료이며, 모임 중 발생하는 비용은 개인 부담입니다.</p><br/>
              <p><i className="material-icons">error</i>&nbsp;&nbsp;문의: untilburnout@naver.com</p>
            </div>

          </div>
          <div className="modal-footer deep-purple darken-4">
            <a target='_blank' rel="noopener noreferrer" href="https://docs.google.com/forms/d/17osPvocN5_bUIBZl8s_S2f0L27Z1tIx9TtpO8DjNaEQ" className='waves-effect waves-green btn-flat white-text'>신청하기</a>
            <a href="#!" className='modal-close waves-effect waves-green btn-flat white-text'>close</a>
          </div>
        </div>

      </div>
    )
  }
}

export default Dashboard;