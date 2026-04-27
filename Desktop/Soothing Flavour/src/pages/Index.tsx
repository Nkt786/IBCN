import { useEffect, useState } from 'react';
import { ArrowRight, Phone, MapPin, Star, Leaf, Truck, Salad, RefreshCw, Flame, Dumbbell, Drumstick, Sparkles, Check, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';

type CategoryKey = 'weight-loss' | 'weight-gain' | 'keto' | 'gym';

const categories: { key: CategoryKey; title: string; desc: string; icon: any; recommend: string }[] = [
  { key: 'weight-loss', title: 'Weight Loss', desc: 'Calorie-controlled meals for fat loss.', icon: Flame, recommend: '15-day' },
  { key: 'weight-gain', title: 'Weight Gain', desc: 'Higher calorie meals for healthy bulking.', icon: Drumstick, recommend: 'monthly' },
  { key: 'keto', title: 'Keto', desc: 'Low carb, high fat meals for keto lifestyle.', icon: Sparkles, recommend: 'weekly' },
  { key: 'gym', title: 'High Protein / Gym', desc: 'Protein-rich meals for muscle growth & recovery.', icon: Dumbbell, recommend: 'monthly-both' },
];

const plans = [
  { id: 'trial', name: 'Trial / Single Meal', tagline: 'Try before you commit', price: '₹299', sub: 'One meal · No commitment', cta: 'Try Now', options: null as null | { label: string; price: string }[] },
  { id: 'weekly', name: 'Weekly Plan', tagline: '6 Days · Sunday Off', price: '', sub: '', cta: 'Start Weekly', options: [{ label: 'Lunch OR Dinner', price: '₹1999' }, { label: 'Both Meals', price: '₹3500' }] },
  { id: '15-day', name: '15 Day Plan', tagline: 'Best for fat loss results', price: '', sub: '', cta: 'Start 15 Days', options: [{ label: 'Lunch OR Dinner', price: '₹3499' }, { label: 'Both Meals', price: '₹6999' }] },
  { id: 'monthly', name: 'Monthly Plan', tagline: '26 Days · Save the most', price: '', sub: '', cta: 'Go Monthly', options: [{ label: 'Lunch OR Dinner', price: '₹5999' }, { label: 'Both Meals', price: '₹11999' }] },
];

const trustBadges = [
  'Fresh Daily Cooked',
  'Veg / Non-Veg Available',
  'Doorstep Delivery',
  'Subscription Savings',
  'Chef Prepared Meals',
];

import heroBowl from '@/assets/sf-hero-bowl.jpg';
import heroSandwich from '@/assets/sf-hero-sandwich.jpg';
import lunchWeekly from '@/assets/sf-lunch-weekly.jpg';
import lunchMonthly from '@/assets/sf-lunch-monthly.jpg';
import dinnerWeekly from '@/assets/sf-dinner-weekly.jpg';
import dinnerMonthly from '@/assets/sf-dinner-monthly.jpg';
import chefImg from '@/assets/sf-chef-international.png';
import deliveryImg from '@/assets/sf-delivery.jpg';
import freshImg from '@/assets/sf-fresh.jpg';
import flexibleImg from '@/assets/sf-flexible.jpg';

const subscriptions = [
  { meal: 'LUNCH', plan: 'WEEKLY SUBSCRIPTION', meals: '6 Meals', img: lunchWeekly },
  { meal: 'LUNCH', plan: 'MONTHLY SUBSCRIPTION', meals: '24 Meals', img: lunchMonthly },
  { meal: 'DINNER', plan: 'WEEKLY SUBSCRIPTION', meals: '6 Meals', img: dinnerWeekly },
  { meal: 'DINNER', plan: 'MONTHLY SUBSCRIPTION', meals: '24 Meals', img: dinnerMonthly },
];

const marqueeItems = [
  'Reusable Bowls', 'Homemade Dressings', 'Fresh-Prepped Meals', 'Veggies Diced Daily',
  'Reusable Bowls', 'Homemade Dressings', 'Fresh-Prepped Meals', 'Veggies Diced Daily',
];

const features = [
  { img: chefImg, title: 'International Touch', desc: 'Crafted by our globally-inspired chefs, every meal blends mindful nutrition with exciting international flavours from around the world.' },
  { img: deliveryImg, title: 'Timely Delivery', desc: 'Fresh meals delivered on time for lunch and dinner. Packaging handled with care — delivery included in your subscription.' },
  { img: freshImg, title: 'Fresh Ingredients', desc: 'A-grade, locally sourced produce — chopped, washed and assembled the same day for maximum freshness and nutrition.' },
  { img: flexibleImg, title: 'Flexible Subscriptions', desc: 'Switch between weekly and monthly plans, pause when you travel, or skip a day. Built around your real life.' },
];

const stats = [
  { value: '500+', label: 'Subscriber Community' },
  { value: '1.2 Lakh+', label: 'Meals Delivered' },
  { value: '3', label: 'Cities Served' },
];

const whatsappReviews = [
  '/wa-1.png',
  '/wa-2.png',
  '/wa-3.png',
  '/wa-4.png',
  '/wa-5.png',
  '/wa-6.png',
];

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const googleReviews = [
  { name: 'Rana Ghosh', time: '2 weeks ago', text: 'Very good experience, food quality is top notch. Well behaved and very professional. Very economic as well. Value for money with great convenience! Kudos!!!', rating: 5, initial: 'R' },
  { name: 'Adesh Potdukhe', time: '1 week ago', text: 'Food was really good it fullfill all the requirements ok our daily calories and protin intake. Thanks for such good service.', rating: 5, initial: 'A' },
  { name: 'Pulkit Tulsyan', time: '4 hours ago', text: 'Food taste was really great... Overall experience and the vibe were really nice.', rating: 5, initial: 'P' },
  { name: 'Shiva Gamer007', time: '3 hours ago', text: 'Looks like a pretty solid meal. You ve got a base of white rice a mix of vegetables (broccoli, carrots green beans corn snap peas) some sesame seeds and what appears to be a saucy protein...', rating: 5, initial: 'S' },
  { name: 'Ankit Vanigota', time: '2 weeks ago', text: 'Greate Taste, Enjoyed the food very much, just goes as the name is', rating: 5, initial: 'A' },
  { name: 'Sheel Matey', time: '2 weeks ago', text: 'Best healthy meals delicious food I loved it', rating: 5, initial: 'S' }
];

const faqs = [
  { q: 'How does the subscription work?', a: 'Pick a weekly or monthly plan for lunch or dinner. We deliver fresh meals daily to your doorstep. Pause or cancel anytime.' },
  { q: 'Can I customise meals for allergies?', a: 'Yes — share notes during checkout for dietary preferences, allergies, or spice level. Our kitchen team will adapt accordingly.' },
  { q: 'Which cities do you deliver in?', a: 'We currently serve Nagpur, Hyderabad and Pune. More cities are launching soon!' },
  { q: 'What if I travel or want to skip a day?', a: 'Just inform us in advance from your dashboard and we will pause your subscription. No meals wasted, no charges lost.' },
];

const Marquee = () => (
  <div className="bg-primary text-primary-foreground py-4 overflow-hidden">
    <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i} className="flex items-center gap-3 text-lg font-heading">
          <Salad className="w-5 h-5 text-gold" />
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Soothing Flavour — Healthy Meal Subscriptions Delivered Fresh';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Fresh, healthy lunch & dinner meal subscriptions in Nagpur, Hyderabad & Pune. Weekly and monthly plans, home-style Indian flavours, delivered daily.');
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('weight-loss');
  const recommendedPlanId = categories.find(c => c.key === selectedCategory)?.recommend;

  const handleOpenOrderModal = (plan: any) => {
    navigate('/order', {
      state: {
        plan: {
          id: plan.id,
          name: plan.name,
          price: plan.price || (plan.options ? plan.options[0].price : '')
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">

      <Header />

      {/* HERO */}
      <section id="home" className="relative bg-background overflow-hidden">
        {/* Organic Soft Glowing Background Textures */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Fresh Green Glow */}
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] rounded-full bg-primary/10 blur-[120px]" />
          {/* Warm Sunlight Glow */}
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[80%] rounded-full bg-gold/10 blur-[120px]" />

          {/* Subtle Organic Leaf Pattern Overlay */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-3.23 3.23a10.958 10.958 0 011.603 5.485c0 5.86-4.908 10.638-10.963 11.233-1.636 5.845-7.142 10.14-13.568 10.14-1.2 0-2.36-.15-3.46-.43-2.07 4.09-6.38 6.9-11.4 6.9-3.04 0-5.84-1.07-8.06-2.85-.35 1.5-.94 2.87-1.72 4.1L0 43.123l.83-.83 4.46-4.46A10.958 10.958 0 013.687 32.35c0-5.86 4.908-10.638 10.963-11.233 1.636-5.845 7.142-10.14 13.568-10.14 1.2 0 2.36.15 3.46.43 2.07-4.09 6.38-6.9 11.4-6.9 3.04 0 5.84 1.07 8.06 2.85.35-1.5.94-2.87 1.72-4.1L54.627 0z' fill='%230F7B53' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>

          {/* Premium Paper Grain Noise */}
          <div className="absolute inset-0 opacity-10 mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] items-center gap-8 pt-16 pb-8 lg:pt-28 lg:pb-8">
          {/* Left image */}
          <div className="hidden lg:block">
            <img src={heroSandwich} alt="Healthy sandwich" className="w-full h-auto object-contain animate-[float_6s_ease-in-out_infinite]" width={600} height={600} />
          </div>

          {/* Center text */}
          <div className="text-center space-y-6">
            <p className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Elevate Your Nutrition</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight">
              High Protein Meals.
              <br />
              <span className="italic text-gold">No Prep Needed.</span>
            </h1>
            <p className="text-foreground/90 max-w-xl mx-auto text-base md:text-lg">
              Fresh macro-balanced meals delivered daily to fuel gains & busy lifestyles.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 hover:shadow-lg hover:-translate-y-0.5 transition-all" asChild>
                <a href="#categories">Explore Plans <ArrowRight className="ml-2 w-4 h-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="bg-card border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:-translate-y-0.5 transition-all" asChild>
                <a href="#why">How it Works</a>
              </Button>
            </div>
            <p className="text-sm font-medium text-foreground/80 pt-4 flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-gold fill-gold" /> Trusted by 500+ happy subscribers
            </p>
          </div>

          {/* Right image */}
          <div className="hidden lg:block">
            <img src={heroBowl} alt="Healthy salad bowl" className="w-full h-auto object-contain animate-[float_7s_ease-in-out_infinite_0.5s]" width={600} height={600} />
          </div>

          {/* Mobile hero image */}
          <img src={heroBowl} alt="Healthy salad bowl" className="lg:hidden mx-auto rounded-2xl shadow-xl max-w-sm w-full" width={600} height={600} />
        </div>
      </section>



      {/* CATEGORIES + PLANS */}
      <section id="categories" className="py-12 bg-secondary">
        <div className="container">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Choose Your Goal</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-3">Eat Smart for Your Goal</h2>
            <p className="text-foreground/90 mt-3">Pick a category — we'll recommend the perfect plan for you.</p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-14">
            {categories.map((c) => {
              const Icon = c.icon;
              const active = selectedCategory === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => {
                    setSelectedCategory(c.key);
                    document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`group text-left rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${active
                    ? 'bg-primary text-primary-foreground border-primary shadow-xl'
                    : 'bg-card border-border hover:border-primary'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${active ? 'bg-gold text-accent-foreground' : 'bg-green-pale text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                    }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg leading-tight">{c.title}</h3>
                  <p className={`text-sm mt-2 leading-relaxed ${active ? 'opacity-90' : 'text-foreground/90'}`}>{c.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Plans Grid */}
          <div id="plans-grid" className="scroll-mt-24">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                Showing plans for <span className="font-semibold text-primary">{categories.find(c => c.key === selectedCategory)?.title}</span>
                {' '}— recommended pick highlighted
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((p) => {
                const isRecommended =
                  recommendedPlanId === p.id ||
                  (recommendedPlanId === 'monthly-both' && p.id === 'monthly');
                return (
                  <div
                    key={p.id}
                    className={`relative rounded-3xl p-6 flex flex-col border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isRecommended
                      ? 'bg-primary text-primary-foreground border-gold shadow-xl'
                      : 'bg-card border-border'
                      }`}
                  >
                    {isRecommended && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        Recommended
                      </span>
                    )}
                    <h3 className="font-heading font-bold text-xl">{p.name}</h3>
                    <p className={`text-xs mt-1 ${isRecommended ? 'opacity-80' : 'text-muted-foreground'}`}>{p.tagline}</p>

                    <div className="mt-5 flex-1">
                      {p.price && (
                        <p className="font-heading font-bold text-3xl">
                          {p.price}
                        </p>
                      )}
                      {p.options && (
                        <div className="space-y-2">
                          {p.options.map((o, i) => (
                            <div
                              key={i}
                              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${isRecommended ? 'bg-primary-foreground/10' : 'bg-green-pale'
                                }`}
                            >
                              <span className={isRecommended ? 'opacity-90' : 'text-foreground/80'}>{o.label}</span>
                              <span className="font-heading font-bold">{o.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {p.sub && <p className={`text-xs mt-2 ${isRecommended ? 'opacity-80' : 'text-muted-foreground'}`}>{p.sub}</p>}
                    </div>

                    <Button
                      className={`mt-6 w-full ${isRecommended
                        ? 'bg-gold text-accent-foreground hover:bg-gold-light'
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        }`}
                      onClick={() => handleOpenOrderModal(p)}
                    >
                      {p.cta} <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>




      {/* MARQUEE */}
      <Marquee />

      {/* WHY US */}
      <section id="why" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Why Customers Love Us</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-3">More than just a meal</h2>
            <p className="text-foreground/90 mt-3">It's about taste, health, and a lifestyle that fits you. Here's what makes Soothing Flavour different.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col sm:flex-row hover:shadow-xl transition-shadow">
                <img src={f.img} alt={f.title} className="w-full sm:w-48 h-48 sm:h-auto object-cover" loading="lazy" width={400} height={400} />
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-heading font-bold text-primary">{f.title}</h3>
                  <p className="text-foreground/90 text-sm mt-2 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-8 md:py-10 bg-primary text-primary-foreground">
        <div className="container grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-heading font-bold text-gold">{s.value}</p>
              <p className="mt-1.5 text-xs md:text-sm opacity-90 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Marquee />

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-12 bg-background">
        <div className="container">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Real Love, Real Results</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-3">Straight from our WhatsApp</h2>
            <p className="text-foreground/90 mt-3">Don't just take our word for it. Here is what our subscribers are saying every single day.</p>
          </div>
          {/* AUTO-SCROLLING MARQUEE GALLERY */}
          <div className="relative max-w-[100vw] mx-auto overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <div className="flex items-center gap-4 py-4 w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
              {[...whatsappReviews, ...whatsappReviews].map((img, i) => (
                <div key={i} className="flex-none w-[180px] md:w-[240px] rounded-2xl overflow-hidden border border-border/40 shadow-md bg-card relative group cursor-pointer transition-transform duration-300 hover:scale-[1.03]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <img src={img} alt={`WhatsApp Review`} className="w-full h-auto block" loading="lazy" draggable="false" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS WIDGET */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        {/* Subtle background decoration similar to the screenshot */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary">
              Customers <span className="text-gold">Says</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto items-center lg:items-center">
            {/* Left Summary Pane */}
            <div className="lg:w-1/3 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Soothing Flavour</h3>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-gold">4.9</span>
                <div className="flex text-gold fill-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Based on 24 reviews</p>
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                powered by <span className="font-bold tracking-tight text-foreground flex items-center gap-0.5"><GoogleIcon className="w-4 h-4 ml-0.5" /> Google</span>
              </div>
              <a href="https://share.google/N4ZccDnRkJ6XFIaz1" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-full px-6 mt-4 shadow-md font-semibold text-sm">
                  review us on <div className="bg-white rounded-full p-0.5 ml-1"><GoogleIcon className="w-4 h-4" /></div>
                </Button>
              </a>
            </div>

            {/* Right Cards Carousel */}
            <div className="lg:w-2/3 flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
              {googleReviews.map((r, i) => (
                <div key={i} className="flex-none w-[280px] md:w-[320px] bg-card border border-border/60 shadow-sm hover:shadow-md transition-shadow rounded-xl p-6 snap-center shrink-0 flex flex-col gap-3 relative">
                  <div className="absolute top-5 right-5">
                    <GoogleIcon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
                      {r.initial}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm text-foreground text-left">{r.name}</p>
                      <p className="text-xs text-muted-foreground text-left">{r.time}</p>
                    </div>
                  </div>
                  <div className="flex text-gold gap-0.5 mt-1">
                    {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mt-2 text-left">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-3">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-12 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center space-y-6">
          <RefreshCw className="w-10 h-10 text-gold mx-auto" />
          <h2 className="text-3xl md:text-5xl font-heading font-bold">Eat Smart. Look Better. Live Better.</h2>
          <p className="text-lg opacity-90">Join thousands who trust Soothing Flavour for daily nutrition. Order on WhatsApp or give us a call.</p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" className="bg-gold text-accent-foreground hover:bg-gold-light font-bold px-8 shadow-md" asChild>
              <a href="https://wa.me/918010356470" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-8 shadow-md" asChild>
              <a href="tel:+918010356470"><Phone className="mr-2 w-4 h-4" /> +91 80103 56470</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Sticky WhatsApp CTA */}
      <Button
        onClick={() => handleOpenOrderModal({ id: 'custom', name: 'Custom Request', price: '' })}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-5 py-6 rounded-full shadow-2xl transition-all hover:scale-105"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Get Started on WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </Button>

    </div>
  );
};

export default Index;
