import React, { useState } from 'react';
import Header from './Header';
import Carousel from './Carousel';
import ProductCard from './ProductCard';
import SearchBox from './SearchBox';
import ChatWidget from './ChatWidget';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);

  // Sample data for the 5 rotating carousels
  const carouselData = {
    costumes: [
      {
        image: '/api/placeholder/800/400',
        title: 'Medieval Princess Costume',
        description: 'Elegant medieval-style dress perfect for themed events',
        price: '₱150/day',
        link: '/costumes/medieval-princess'
      },
      {
        image: '/api/placeholder/800/400',
        title: 'Superhero Collection',
        description: 'Complete superhero costumes for all ages',
        price: '₱120/day',
        link: '/costumes/superhero'
      }
    ],
    cosplay: [
      {
        image: '/api/placeholder/800/400',
        title: 'Anime Character Cosplay',
        description: 'High-quality anime character outfits',
        price: '₱200/day',
        link: '/cosplay/anime'
      },
      {
        image: '/api/placeholder/800/400',
        title: 'Gaming Character Sets',
        description: 'Popular gaming character costumes with accessories',
        price: '₱180/day',
        link: '/cosplay/gaming'
      }
    ],
    gowns: [
      {
        image: '/api/placeholder/800/400',
        title: 'Wedding Gown Collection',
        description: 'Stunning wedding dresses in various styles',
        price: '₱500/day',
        link: '/gowns/wedding'
      },
      {
        image: '/api/placeholder/800/400',
        title: 'Evening Gowns',
        description: 'Elegant evening wear for special occasions',
        price: '₱300/day',
        link: '/gowns/evening'
      }
    ],
    contactLenses: [
      {
        image: '/api/placeholder/800/400',
        title: 'Colored Contact Lenses',
        description: 'Safe, comfortable colored contacts',
        price: '₱50/pair',
        link: '/contact-lenses/colored'
      },
      {
        image: '/api/placeholder/800/400',
        title: 'Halloween Special Lenses',
        description: 'Spooky and fun contact lenses for Halloween',
        price: '₱80/pair',
        link: '/contact-lenses/halloween'
      }
    ],
    accessories: [
      {
        image: '/api/placeholder/800/400',
        title: 'Bridal Accessories',
        description: 'Tiaras, veils, and jewelry for brides',
        price: '₱75/day',
        link: '/accessories/bridal'
      },
      {
        image: '/api/placeholder/800/400',
        title: 'Costume Accessories',
        description: 'Complete your look with themed accessories',
        price: '₱30/day',
        link: '/accessories/costume'
      }
    ]
  };

  // Featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Royal Ball Gown',
      image: '/api/placeholder/300/250',
      rentalPrice: 450,
      originalPrice: 600,
      description: 'Stunning royal blue ball gown with intricate beadwork',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Royal Blue', 'Emerald Green'],
      maxQuantity: 2,
      isNew: true
    },
    {
      id: 2,
      name: 'Vintage Wedding Dress',
      image: '/api/placeholder/300/250',
      rentalPrice: 800,
      description: 'Classic vintage-inspired wedding dress with lace details',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Ivory', 'Champagne'],
      maxQuantity: 1,
      featured: true
    },
    {
      id: 3,
      name: 'Superhero Cape Set',
      image: '/api/placeholder/300/250',
      price: 250,
      description: 'Complete superhero costume with cape and accessories',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Red', 'Blue', 'Black'],
      maxQuantity: 5
    }
  ];

  // Sample availability data
  const availableDates = [
    '2024-02-15', '2024-02-16', '2024-02-17', '2024-02-20', '2024-02-21',
    '2024-02-22', '2024-02-23', '2024-02-24', '2024-02-27', '2024-02-28'
  ];

  const unavailableDates = [
    '2024-02-14', '2024-02-18', '2024-02-19', '2024-02-25', '2024-02-26'
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // In a real app, this would filter products based on the query
    setSearchResults([]);
  };

  const handleRentSelect = (productId, date, quantity) => {
    console.log(`Rent product ${productId} on ${date} (qty: ${quantity})`);
    // This would typically open the chat widget with pre-filled message
  };

  const handlePurchase = (productId, quantity) => {
    console.log(`Purchase product ${productId} (qty: ${quantity})`);
    // This would add to cart or proceed to checkout
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Boutique Elegance</h1>
            <p>
              Rent or buy stunning costumes, cosplay outfits, elegant gowns, 
              and accessories for your special occasions.
            </p>
            
            {/* Hero Search */}
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <SearchBox
                placeholder="Search for costumes, gowns, accessories..."
                onSearch={handleSearch}
                recentSearches={['Wedding dress', 'Princess costume', 'Colored contacts']}
                popularSearches={['Ball gown', 'Superhero costume', 'Anime cosplay', 'Tiara']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Carousels Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gap: 'var(--space-3xl)' }}>
            
            {/* Costumes Carousel */}
            <Carousel
              title="Costumes"
              items={carouselData.costumes}
              autoPlay={true}
              autoPlayDelay={5000}
            />

            {/* Cosplay Carousel */}
            <Carousel
              title="Cosplay"
              items={carouselData.cosplay}
              autoPlay={true}
              autoPlayDelay={5500}
            />

            {/* Gowns Carousel */}
            <Carousel
              title="Gowns"
              items={carouselData.gowns}
              autoPlay={true}
              autoPlayDelay={6000}
            />

            {/* Contact Lenses Carousel */}
            <Carousel
              title="Contact Lenses & Solution"
              items={carouselData.contactLenses}
              autoPlay={true}
              autoPlayDelay={6500}
            />

            {/* Accessories Carousel */}
            <Carousel
              title="Accessories"
              items={carouselData.accessories}
              autoPlay={true}
              autoPlayDelay={7000}
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-cream">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
            Featured Items
          </h2>
          
          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isRental={index < 2} // First two are rental items
                onRentSelect={handleRentSelect}
                onPurchase={handlePurchase}
                availableDates={availableDates}
                unavailableDates={unavailableDates}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Section (Placeholder) */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
            See Our Collection in Action
          </h2>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'var(--cream)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-3xl)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto var(--space-lg)',
              background: 'var(--gold-primary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'white'
            }}>
              ▶
            </div>
            <h3>Watch Our Style Showcase</h3>
            <p>
              See how our customers transform their special moments with our 
              beautiful rental collection.
            </p>
            <button className="btn btn-primary">
              Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* Happy Customers Carousel (Placeholder) */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
            Happy Customers
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            {[1, 2, 3].map((testimonial) => (
              <div key={testimonial} className="card">
                <div className="card-body">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 'var(--space-md)'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'var(--gold-light)',
                      marginRight: 'var(--space-md)'
                    }}></div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>Happy Customer {testimonial}</h4>
                      <div style={{ color: 'var(--gold-primary)' }}>★★★★★</div>
                    </div>
                  </div>
                  <p style={{ fontStyle: 'italic', margin: 0 }}>
                    "Amazing service and beautiful dresses! Made my special day perfect."
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget
        whatsappNumber="639123456789"
        messengerUrl="https://m.me/your-boutique-page"
        preferredPlatform="messenger"
      />
    </div>
  );
};

export default HomePage;