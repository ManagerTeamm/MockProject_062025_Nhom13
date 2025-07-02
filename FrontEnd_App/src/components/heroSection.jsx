import { Carousel } from 'react-bootstrap';

const slides = [
  { src: "/images/slide1.png", alt: 'Slide 1' },
  { src: "/images/slide2.png", alt: 'Slide 2' },
  { src: "/images/slide3.png", alt: 'Slide 3' },
];

export default function HeroSection() {
  return (
    <Carousel variant="dark" fade className="shadow rounded" style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <img
            src={slide.src}
            alt={slide.alt}
            className="d-block w-100 h-100 object-fit-cover"
            style={{ borderRadius: 12, maxHeight: 500, objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}