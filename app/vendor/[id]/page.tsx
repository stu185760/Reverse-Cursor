import { VendorProfile } from "@/components/vendor-profile"

export default function VendorProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <VendorProfile vendorId={params.id} />
    </main>
  )
}

