import Swiper, { Autoplay} from 'swiper';
export const slider=()=>{
	
Swiper.use([Autoplay])
	const swiper=new Swiper('.swiper',{
		// Optional parameters
		
		loop: true,
		autoplay: true,
		autoplay:{
			disableOnInteraction: false
		},
		spaceBetween: 30

		// If we need pagination
	
	});

}