import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Samantha Johnson",
    text: "Exceeded our expectations with designs...",
    image: "https://i.pravatar.cc/300",
    role: "developer",
    rating: 4,
  },
  {
    name: "Isabella Rodriguez",
    text: "Their ability to capture our brand essence...",
    image: "https://i.pravatar.cc/300",
    role: "developer",
    rating: 4,
  },
  {
    name: "Gabrielle Williams",
    text: "Creative geniuses who listen and understand...",
    image: "https://i.pravatar.cc/300",
    role: "developer",
    rating: 4,
  },
  {
    name: "John Carter",
    text: "Amazing experience working with this team...",
    image: "https://i.pravatar.cc/300",
    role: "developer",
  },
  {
    name: "Isabella Rodriguez",
    text: "Their ability to capture our brand essence...",
    image: "https://i.pravatar.cc/300",
    role: "developer",
    rating: 4,
  },
];

function Card({ item }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative rounded-2xl p-0.5 w-full overflow-hidden group">
        {/* Inner Card */}
        <div className="relative p-6 bg-[#0d0d14]  rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-indigo-200">
          {/* Header */}
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3
                data-cursor="-opaque"
                className="text-lg font-semibold text-white"
              >
                {item.name}
              </h3>
              {item.role && (
                <p className="text-sm text-gray-400">{item.role}</p>
              )}

              {/* Stars */}
              <div className="flex text-yellow-400 text-sm mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < item.rating ? "★" : "☆"}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Text */}
          <p className="mt-4 text-white/70 text-sm leading-relaxed">
            “{item.text}”
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSlider() {
  return (
    <section className=" py-10 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2
          data-cursor="-opaque"
          className="text-2xl md:text-5xl font-bold"
        >
          Trusted by{" "}
          <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
            Our Developers
          </span>
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-white/60 font-normal">
          Connect users directly to content, track every interaction, and
          optimize campaigns with enterprise-grade backend infrastructure.
        </p>
      </div>
      <Swiper
        modules={[Autoplay]}
        className="mb-2"
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        speed={7000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            spaceBetween: 10,
            slidesPerView :1,
          },
          640: {
            spaceBetween: 15,
            slidesPerView :2,
          },
          1024: {
            spaceBetween: 20,
            slidesPerView:3,
          },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Autoplay]}
        className=""
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        speed={7000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
                breakpoints={{
          320: {
            spaceBetween: 10,
            slidesPerView :1,
          },
          640: {
            spaceBetween: 15,
            slidesPerView :2,
          },
          1024: {
            spaceBetween: 20,
            slidesPerView:3,
          },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
