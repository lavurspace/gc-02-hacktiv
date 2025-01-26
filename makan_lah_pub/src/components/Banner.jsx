import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/swiper-custom.css";

const bannerImages = [
	{
		id: 1,
		url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
		alt: "Delicious Food Banner 1",
	},
	{
		id: 2,
		url: "https://images.unsplash.com/photo-1543353071-873f17a7a088",
		alt: "Delicious Food Banner 2",
	},
	{
		id: 3,
		url: "https://images.unsplash.com/photo-1542528180-1c2803fa048c",
		alt: "Delicious Food Banner 3",
	},
];

export default function Banner() {
	return (
		<div className="container mx-auto px-4 mt-20 mb-8">
			<div className="group relative rounded-2xl overflow-hidden">
				<Swiper
					spaceBetween={0}
					centeredSlides={true}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						bulletActiveClass: "swiper-pagination-bullet-active bg-green-500",
					}}
					navigation={{
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}}
					modules={[Autoplay, Pagination, Navigation]}
					className="h-[400px] w-full rounded-2xl"
				>
					{bannerImages.map((banner) => (
						<SwiperSlide key={banner.id}>
							<div className="relative w-full h-full">
								<img
									src={banner.url}
									alt={banner.alt}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
							</div>
						</SwiperSlide>
					))}
					<div className="absolute inset-y-0 left-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<button className="swiper-button-prev !text-white !w-12 !h-12 !bg-black/30 rounded-full backdrop-blur-sm hover:!bg-black/50 transition-colors duration-300 after:!text-lg"></button>
					</div>
					<div className="absolute inset-y-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<button className="swiper-button-next !text-white !w-12 !h-12 !bg-black/30 rounded-full backdrop-blur-sm hover:!bg-black/50 transition-colors duration-300 after:!text-lg"></button>
					</div>
				</Swiper>
			</div>
		</div>
	);
}
