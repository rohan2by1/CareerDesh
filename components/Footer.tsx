export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JobBoard</h3>
            <p className="text-muted-foreground">
              Connecting talented professionals with exciting career opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>Email: info@jobboard.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {currentYear} JobBoard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
