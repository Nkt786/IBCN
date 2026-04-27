import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/plans', label: 'Plans' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-heading font-bold text-primary">Soothing</span>
          <span className="text-2xl font-heading font-bold text-gold">Flavour</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {isAdmin && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin"><LayoutDashboard className="w-4 h-4 mr-1" /> Admin</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard"><User className="w-4 h-4 mr-1" /> Account</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-1" /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/plans">Order Now</Link>
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-3 animate-fade-in">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border space-y-2">
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/admin" onClick={() => setOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Admin
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    <User className="w-4 h-4 mr-2" /> Account
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { signOut(); setOpen(false); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link to="/auth" onClick={() => setOpen(false)}>Sign In</Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/plans" onClick={() => setOpen(false)}>Order Now</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
