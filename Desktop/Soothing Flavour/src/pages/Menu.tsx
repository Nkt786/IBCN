import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, CalendarDays, Drumstick } from 'lucide-react';

import { vegItems, nonVegItems } from '@/data/menu';

const MenuCard = ({ item }: { item: any }) => {
  return (
    <div className={`relative mt-12 rounded-3xl p-6 pt-14 pb-8 shadow-sm transition-transform hover:-translate-y-1 ${item.color}`}>
      {/* Floating Image */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full p-1 bg-white shadow-md">
        <img 
          src={item.img} 
          alt={item.name} 
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <div className="text-center space-y-4">
        {/* Title */}
        <h3 className="font-heading font-extrabold text-lg text-primary tracking-tight leading-tight">
          {item.name}
        </h3>
        
        {/* Details */}
        <div className="space-y-1 text-sm font-semibold text-foreground/80 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-primary">
            <Apple className="w-4 h-4" />
            <span>{item.cal}</span>
          </div>
          {item.protein && (
            <div className="flex items-center gap-1.5 text-orange-600">
              <Drumstick className="w-4 h-4" />
              <span>{item.protein} Protein</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 mt-1">
            <CalendarDays className="w-4 h-4 opacity-70" />
            <span>Day: {item.day} ({item.mealType})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Menu() {
  useEffect(() => {
    document.title = "Our Weekly Menu — Soothing Flavour";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore our high-protein, chef-prepared weekly menu. See the delicious Veg and Non-Veg meals we're serving this week in Pune, Nagpur, and Hyderabad.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <p className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Our Menu</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary">Weekly Meal Plan</h1>
            <p className="text-foreground/90 max-w-xl mx-auto">Explore our carefully curated weekly meals designed to keep you healthy, energized, and satisfied.</p>
          </div>

          <Tabs defaultValue="veg" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-secondary rounded-full">
                <TabsTrigger value="veg" className="rounded-full font-bold text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Veg Plan</TabsTrigger>
                <TabsTrigger value="non-veg" className="rounded-full font-bold text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Non-Veg Plan</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="veg" className="animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {vegItems.map((item, idx) => (
                  <MenuCard key={`veg-${idx}`} item={item} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="non-veg" className="animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {nonVegItems.map((item, idx) => (
                  <MenuCard key={`non-veg-${idx}`} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
