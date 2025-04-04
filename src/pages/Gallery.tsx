
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Layout from '@/components/Layout';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gallery categories
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'social', name: 'Social Gatherings' }
  ];

  // Gallery images by category
  const images = {
    weddings: [
      {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3',
        alt: 'Wedding ceremony setup',
        caption: 'Elegant Beach Wedding, Marina Beach'
      },
      {
        src: 'https://images.unsplash.com/photo-1519741347686-c1e331fcb4d3?ixlib=rb-4.0.3',
        alt: 'Bride and groom',
        caption: 'Traditional South Indian Wedding'
      },
      {
        src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3',
        alt: 'Wedding reception',
        caption: 'Luxury Wedding Reception, ITC Grand Chola'
      },
      {
        src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?ixlib=rb-4.0.3',
        alt: 'Wedding decorations',
        caption: 'Floral Wedding Decorations'
      },
      {
        src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3',
        alt: 'Wedding venue',
        caption: 'Garden Wedding Setup'
      },
      {
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3',
        alt: 'Wedding cake',
        caption: 'Multi-tier Wedding Cake Design'
      }
    ],
    corporate: [
      {
        src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3',
        alt: 'Corporate conference',
        caption: 'Annual Tech Conference, Chennai Trade Centre'
      },
      {
        src: 'https://images.unsplash.com/photo-1560523159-4a9692d222ef?ixlib=rb-4.0.3',
        alt: 'Business meeting',
        caption: 'Executive Business Meeting'
      },
      {
        src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
        alt: 'Award ceremony',
        caption: 'Corporate Awards Night'
      },
      {
        src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3',
        alt: 'Team building',
        caption: 'Team Building Event'
      },
      {
        src: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3',
        alt: 'Product launch',
        caption: 'New Product Launch Event'
      }
    ],
    cultural: [
      {
        src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3',
        alt: 'Music festival',
        caption: 'Chennai Music Festival'
      },
      {
        src: 'https://images.unsplash.com/photo-1545128485-c400ce7b17d0?ixlib=rb-4.0.3',
        alt: 'Dance performance',
        caption: 'Classical Dance Performance'
      },
      {
        src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3',
        alt: 'Cultural exhibition',
        caption: 'Tamil Cultural Exhibition'
      },
      {
        src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3',
        alt: 'Art festival',
        caption: 'Chennai Art Festival'
      },
      {
        src: 'https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?ixlib=rb-4.0.3',
        alt: 'Traditional celebration',
        caption: 'Pongal Celebration'
      }
    ],
    social: [
      {
        src: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3',
        alt: 'Birthday party',
        caption: 'Luxury Birthday Celebration'
      },
      {
        src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3',
        alt: 'Anniversary party',
        caption: '25th Anniversary Celebration'
      },
      {
        src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3',
        alt: 'Graduation party',
        caption: 'Graduation Day Event'
      },
      {
        src: 'https://images.unsplash.com/photo-1556125574-d7f27ec36a06?ixlib=rb-4.0.3',
        alt: 'Social gathering',
        caption: 'Family Reunion Event'
      }
    ]
  };

  // Combine all images for the "All" category
  const allImages = [
    ...images.weddings,
    ...images.corporate,
    ...images.cultural,
    ...images.social
  ];

  // Get current category images
  const getCategoryImages = (category: string) => {
    if (category === 'all') return allImages;
    return images[category as keyof typeof images] || [];
  };

  // Handle image click to open lightbox
  const openLightbox = (src: string, index: number) => {
    setSelectedImage(src);
    setCurrentIndex(index);
  };

  // Navigate to next image in lightbox
  const nextImage = (categoryImages: typeof allImages) => {
    const newIndex = (currentIndex + 1) % categoryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(categoryImages[newIndex].src);
  };

  // Navigate to previous image in lightbox
  const prevImage = (categoryImages: typeof allImages) => {
    const newIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(categoryImages[newIndex].src);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-evento-purple to-evento-orange text-white py-20">
        <div className="evento-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Event Gallery</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Explore our portfolio of beautiful events organized across Chennai.
          </p>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-16">
        <div className="evento-container">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-flow-col auto-cols-auto gap-2">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map((category) => {
              const categoryImages = getCategoryImages(category.id);
              
              return (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryImages.map((image, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                        onClick={() => openLightbox(image.src, index)}
                      >
                        <div className="relative h-64">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3">
                            <p className="text-sm">{image.caption}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Lightbox Dialog */}
                  <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
                    <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
                      <div className="relative bg-black bg-opacity-90 rounded-lg overflow-hidden">
                        <div className="flex justify-end p-2 absolute top-0 right-0 z-10">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={() => setSelectedImage(null)}
                          >
                            <X className="h-6 w-6" />
                          </Button>
                        </div>
                        
                        <div className="p-1 md:p-4 flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={() => prevImage(categoryImages)}
                          >
                            <ChevronLeft className="h-8 w-8" />
                          </Button>
                          
                          <div className="flex-1 flex justify-center items-center">
                            <img
                              src={selectedImage || ''}
                              alt="Enlarged view"
                              className="max-h-[80vh] max-w-full object-contain"
                            />
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={() => nextImage(categoryImages)}
                          >
                            <ChevronRight className="h-8 w-8" />
                          </Button>
                        </div>
                        
                        {selectedImage && (
                          <div className="text-white text-center p-4 bg-black bg-opacity-50">
                            <p>{categoryImages[currentIndex].caption}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="evento-container text-center">
          <h2 className="text-3xl font-bold mb-6">Want Us to Create Your Next Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Let us help you design and execute an event that will be captured in beautiful memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-primary">Get a Quote</Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
