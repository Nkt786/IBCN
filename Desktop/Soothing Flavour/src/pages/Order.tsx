import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShieldCheck, MessageCircle, MapPin, Loader2, Info, ArrowLeft, Clock, Apple, CalendarDays, Drumstick } from 'lucide-react';
import { vegItems, nonVegItems } from '@/data/menu';

const STORAGE_KEY = 'soothing_flavour_order_form';

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const passedPlan = location.state?.plan || { id: 'custom', name: 'Custom Meal Plan', price: '' };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewTab, setPreviewTab] = useState<'Veg' | 'Non Veg'>('Veg');
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: 'Pune',
    area: '',
    address: '',
    preference: 'Veg',
    mealSelection: 'Lunch', // Default to Lunch
    startDate: '',
    notes: '',
    coupon: ''
  });

  // Dynamic SEO meta tags
  useEffect(() => {
    document.title = `Checkout: ${passedPlan.name} — Soothing Flavour`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", `Complete your order for the ${passedPlan.name}. Premium healthy meal delivery service in Pune, Nagpur, and Hyderabad.`);
    }
  }, [passedPlan.name]);

  const getMinDate = () => {
    const now = new Date();
    const currentHour = now.getHours(); // 0-23
    let minDate = new Date(now);

    if (formData.mealSelection === 'Dinner') {
      if (currentHour >= 13) {
        minDate.setDate(now.getDate() + 1);
      }
    } else {
      if (currentHour >= 6) {
        minDate.setDate(now.getDate() + 1);
      }
    }

    const year = minDate.getFullYear();
    const month = String(minDate.getMonth() + 1).padStart(2, '0');
    const day = String(minDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minDate = getMinDate();

  useEffect(() => {
    if (formData.startDate && formData.startDate < minDate) {
      setFormData(prev => ({ ...prev, startDate: minDate }));
    }
  }, [minDate, formData.startDate]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ 
          ...prev, 
          name: parsed.name || '',
          mobile: parsed.mobile || '',
          city: parsed.city || 'Pune',
          area: parsed.area || '',
          address: parsed.address || '',
          preference: parsed.preference || 'Veg',
        }));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      name: formData.name,
      mobile: formData.mobile,
      city: formData.city,
      area: formData.area,
      address: formData.address,
      preference: formData.preference
    }));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    
    if (!formData.area.trim()) newErrors.area = 'Area/Locality is required';
    if (!formData.address.trim()) newErrors.address = 'Complete address is required';
    if (!formData.startDate.trim()) newErrors.startDate = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getDeliveryTimeText = () => {
    if (formData.mealSelection === 'Lunch') return '10:00 AM - 1:00 PM';
    if (formData.mealSelection === 'Dinner') return '5:00 PM - 8:00 PM';
    return 'Lunch: 10AM-1PM | Dinner: 5PM-8PM';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const message = `Hello Soothing Flavour 👋

I want to place an order.

*Plan:* ${passedPlan.name}
*Meal Type:* ${formData.preference}
*Selection:* ${formData.mealSelection}
*Start Date:* ${formData.startDate}
*Delivery Slots:* ${getDeliveryTimeText()}

*Customer Details*
Name: ${formData.name}
Mobile: ${formData.mobile}
City: ${formData.city}
Area: ${formData.area}
Address: ${formData.address}

Coupon: ${formData.coupon || 'NONE'}
Notes: ${formData.notes || 'None'}

Please confirm availability.`;

    const waNumber = '918010356470';
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = waLink;
    }, 800);
  };

  const isTrial = passedPlan.id === 'trial';
  const selectedDay = formData.startDate ? new Date(formData.startDate).toLocaleDateString('en-US', { weekday: 'long' }) : null;

  // Compute preview items based on selected diet OR the preview tab if 'Both' is selected
  let activeDietForPreview = formData.preference;
  if (formData.preference === 'Both') {
    activeDietForPreview = previewTab;
  }

  let previewItems: any[] = [];
  if (activeDietForPreview === 'Veg') previewItems = vegItems;
  else if (activeDietForPreview === 'Non Veg') previewItems = nonVegItems;

  let itemsToShow: any[] = [];
  if (isTrial && selectedDay) {
    itemsToShow = previewItems.filter(item => item.day === selectedDay);
    if (formData.mealSelection !== 'Both Meals') {
      itemsToShow = itemsToShow.filter(item => item.mealType === formData.mealSelection);
    }
  } else if (!isTrial) {
    // For subscriptions, show a unique representation of the menu
    itemsToShow = previewItems.filter(item => item.mealType === 'Lunch').slice(0, 6);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          
          <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plans
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN - FORM */}
            <div className="lg:col-span-7 xl:col-span-8 bg-card border border-border shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-primary/5 p-6 md:p-8 border-b border-primary/10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 space-y-2">
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary flex items-center gap-3">
                    Complete Your Order 🍱
                  </h1>
                  <p className="text-foreground/80 flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-5 h-5 text-green-600" /> Trusted by 500+ Subscribers
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                
                {/* SECTION: MEAL DETAILS */}
                <div className="space-y-6 bg-secondary/30 p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-heading font-bold flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> 
                    Meal Configuration
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/90">Diet Preference *</label>
                      <select 
                        name="preference" 
                        value={formData.preference} 
                        onChange={handleChange}
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option value="Veg">Veg</option>
                        <option value="Non Veg">Non Veg</option>
                        <option value="Both">Both (Veg & Non-Veg)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/90">Meal Selection *</label>
                      <select 
                        name="mealSelection" 
                        value={formData.mealSelection} 
                        onChange={handleChange}
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Both Meals">Both Meals</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/90 flex items-center justify-between">
                        <span>{isTrial ? 'Select Date *' : 'Start Date *'}</span>
                      </label>
                      <Input 
                        name="startDate" 
                        type="date"
                        min={minDate}
                        value={formData.startDate} 
                        onChange={handleChange} 
                        className={`h-11 ${errors.startDate ? 'border-destructive' : ''}`}
                      />
                      {errors.startDate && <p className="text-xs text-destructive">{errors.startDate}</p>}
                      <p className="text-[10px] text-muted-foreground">Orders require 4-hour advanced notice.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/90 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" /> Delivery Slot
                      </label>
                      <div className="flex h-11 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm items-center text-muted-foreground font-medium">
                        {getDeliveryTimeText()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION: PERSONAL DETAILS */}
                <div className="space-y-6 bg-secondary/30 p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-heading font-bold flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> 
                    Delivery Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/90">Full Name *</label>
                      <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Rahul Sharma" 
                        className={`h-11 ${errors.name ? 'border-destructive' : ''}`}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/90">Mobile Number *</label>
                      <Input 
                        name="mobile" 
                        type="tel"
                        value={formData.mobile} 
                        onChange={handleChange} 
                        placeholder="9876543210" 
                        className={`h-11 ${errors.mobile ? 'border-destructive' : ''}`}
                      />
                      {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/90">City *</label>
                      <select 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange}
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option value="Pune">Pune</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Hyderabad">Hyderabad</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/90">Area / Locality *</label>
                      <Input 
                        name="area" 
                        value={formData.area} 
                        onChange={handleChange} 
                        placeholder="e.g. Baner, Koregaon Park" 
                        className={`h-11 ${errors.area ? 'border-destructive' : ''}`}
                      />
                      {errors.area && <p className="text-xs text-destructive">{errors.area}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/90 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> Full Delivery Address *
                    </label>
                    <Textarea 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      placeholder="Flat no, Building name, Street..." 
                      className={`resize-none ${errors.address ? 'border-destructive' : ''}`}
                      rows={3}
                    />
                    {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                  </div>
                </div>

                <div className="pt-8 border-t">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-lg h-16 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Redirecting...</>
                    ) : (
                      <><MessageCircle className="mr-3 h-6 w-6 fill-current" /> Place Order on WhatsApp</>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4 font-medium">
                    You will verify your order details with our team on WhatsApp.
                  </p>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN - MENU SUMMARY */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-24 space-y-6">
                
                {/* Summary Card */}
                <div className="bg-card border border-border shadow-lg rounded-2xl p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Order Summary</p>
                  <h4 className="text-2xl font-heading font-bold text-primary">{passedPlan.name}</h4>
                  {passedPlan.price && (
                    <div className="mt-3 bg-primary/5 px-4 py-3 rounded-xl border border-primary/10 inline-block w-full">
                      <p className="font-heading font-bold text-3xl text-foreground">{passedPlan.price}</p>
                    </div>
                  )}
                </div>

                {/* Dynamic Menu Preview */}
                <div className="bg-secondary/20 border border-border rounded-2xl p-6">
                  <h4 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                    <Apple className="w-5 h-5 text-green-600" />
                    {isTrial && selectedDay ? `Your Meal for ${selectedDay}` : 'Weekly Menu Preview'}
                  </h4>

                  {formData.preference === 'Both' && (
                    <div className="flex bg-background rounded-lg p-1 mb-4 border border-border shadow-sm">
                      <button 
                        onClick={(e) => { e.preventDefault(); setPreviewTab('Veg'); }}
                        className={`flex-1 text-sm font-semibold py-1.5 rounded-md transition-all ${previewTab === 'Veg' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary'}`}
                      >
                        Veg Menu
                      </button>
                      <button 
                        onClick={(e) => { e.preventDefault(); setPreviewTab('Non Veg'); }}
                        className={`flex-1 text-sm font-semibold py-1.5 rounded-md transition-all ${previewTab === 'Non Veg' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary'}`}
                      >
                        Non-Veg Menu
                      </button>
                    </div>
                  )}

                  {itemsToShow.length > 0 ? (
                    <div className="space-y-4">
                      {itemsToShow.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-background p-3 rounded-xl shadow-sm border border-border/50">
                          <img src={item.img} alt={item.name} className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-white" />
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold">{item.day} {item.mealType && `· ${item.mealType}`}</p>
                            <p className="font-bold text-sm leading-tight mt-0.5">{item.name}</p>
                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                              <p className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-block font-medium">{item.cal}</p>
                              {item.protein && (
                                <p className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full inline-flex items-center gap-1 font-medium">
                                  <Drumstick className="w-3 h-3" /> {item.protein}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 opacity-50">
                      <CalendarDays className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Select a start date to see your meal preview.</p>
                    </div>
                  )}
                  
                  {!isTrial && (
                    <p className="text-xs text-center text-muted-foreground mt-4 italic">
                      Menu rotates to keep your diet exciting and fresh!
                    </p>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
