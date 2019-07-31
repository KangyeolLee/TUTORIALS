import React from 'react'
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true
}
const SlideShow = () => {
  return (
    <Slider {...settings}>
      <div>
        <img src="poster/sport_slide0.jpg" alt="" className='responsive-img' />
      </div>
      <div>
        <img src="poster/sport_slide1.jpg" alt="" className='responsive-img'/>
      </div>
      <div>
        <img src="poster/sport_slide2.jpg" alt="" className='responsive-img'/>
      </div>
      <div>
        <img src="poster/sport_slide3.jpg" alt="" className="responsive-img"/>
      </div>
      <div>
        <img src="poster/sport_slide4.jpg" alt="" className="responsive-img"/>
      </div>
    </Slider>
  )
}

export default SlideShow;