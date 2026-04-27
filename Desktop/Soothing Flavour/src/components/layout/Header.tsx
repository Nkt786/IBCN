import { Phone, MapPin, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to correctly navigate to home hashes or scroll if already on home
  const getHashLink = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-2">
          <p className="font-heading italic text-gold">Soch, Swad aur Sehat ka Sangam — Soothing Flavour</p>
          <div className="flex items-center gap-4">
            <a href="tel:+918010356470" className="flex items-center gap-2 bg-white text-primary px-4 py-1.5 rounded-full font-bold shadow-sm hover:bg-white/90 transition-colors">
              <Phone className="w-4 h-4" /> +91 80103 56470
            </a>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Nagpur · Hyderabad · Pune
            </span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-card sticky top-0 z-50 shadow-sm border-b border-border/40">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Soothing Flavour Logo" className="h-16 w-auto object-contain drop-shadow-sm" />
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-heading font-bold text-primary hidden sm:inline-block">Soothing</span>
              <span className="text-2xl font-heading font-bold text-gold hidden sm:inline-block">Flavour</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/our-menu" className="hover:text-primary transition-colors">Menu</Link>
            <a href={getHashLink("#categories")} className="hover:text-primary transition-colors">Our Plans</a>
            <a href={getHashLink("#why")} className="hover:text-primary transition-colors">Why Us</a>
            <a href={getHashLink("#testimonials")} className="hover:text-primary transition-colors">Reviews</a>
            <a href={getHashLink("#contact")} className="hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button asChild className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href={getHashLink("#categories")}>Order Now</a>
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle mobile menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                {/* Hidden title for accessibility */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Access site links and ordering.</SheetDescription>
                <nav className="flex flex-col gap-6 mt-8 font-medium text-lg">
                  <Link to="/" onClick={handleMobileLinkClick} className="hover:text-primary transition-colors">Home</Link>
                  <Link to="/our-menu" onClick={handleMobileLinkClick} className="hover:text-primary transition-colors">Full Menu</Link>
                  <a href={getHashLink("#categories")} onClick={handleMobileLinkClick} className="hover:text-primary transition-colors">Our Plans</a>
                  <a href={getHashLink("#why")} onClick={handleMobileLinkClick} className="hover:text-primary transition-colors">Why Choose Us</a>
                  <a href={getHashLink("#testimonials")} onClick={handleMobileLinkClick} className="hover:text-primary transition-colors">Customer Reviews</a>
                  <a href={getHashLink("#contact")} onClick={handleMobileLinkClick} className="hover:text-primary transition-colors">Contact Us</a>
                  
                  <div className="mt-4 pt-6 border-t border-border flex flex-col gap-4">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <a href={getHashLink("#categories")} onClick={handleMobileLinkClick}>Order Now</a>
                    </Button>
                    <a href="tel:+918010356470" className="flex items-center justify-center gap-2 text-sm text-foreground/80 hover:text-primary mt-2">
                      <Phone className="w-4 h-4" /> Call: +91 80103 56470
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
