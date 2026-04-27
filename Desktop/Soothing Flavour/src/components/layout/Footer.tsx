export function Footer() {
  return (
    <footer className="bg-foreground text-background py-8 text-center">
      <div className="container max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-lg object-contain opacity-90" />
          <span className="text-xl font-heading font-bold tracking-tight">Soothing Flavour</span>
        </div>
        <p className="opacity-70 text-xs max-w-md">Premium healthy meal subscriptions in Nagpur, Hyderabad, and Pune. High protein, chef-cooked, delivered fresh daily.</p>
        <div className="flex gap-4 text-xs font-medium opacity-80 mt-1">
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Contact Us</a>
        </div>
        <p className="mt-4 opacity-50 text-[10px]">© {new Date().getFullYear()} Soothing Flavour. All rights reserved.</p>
      </div>
    </footer>
  );
}
