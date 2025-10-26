import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              Easy<span className="text-primary">Customized</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              India's premier reverse marketplace connecting customers with skilled vendors.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">For Customers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard/create-ad" className="hover:text-primary transition-colors">Post a Request</Link></li>
              <li><Link href="/dashboard/browse" className="hover:text-primary transition-colors">Browse Requests</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">My Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">For Vendors</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard/browse" className="hover:text-primary transition-colors">Find Opportunities</Link></li>
              <li><Link href="/auth/sign-up" className="hover:text-primary transition-colors">Become a Vendor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EasyCustomized. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

