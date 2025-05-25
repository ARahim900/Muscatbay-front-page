import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Droplets, Zap, Factory, ClipboardList, Package } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-[#4E4456] text-white">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image
                src="/images/muscat-bay-logo-mark.png"
                alt="Muscat Bay Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-semibold">MUSCAT BAY</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline sm:text-base">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline sm:text-base">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline sm:text-base">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-[#4E4456]/90 to-[#4E4456]/70 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Welcome to Muscat Bay</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-200">
                  Explore our integrated systems and track project progress through our comprehensive management portal.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="#systems"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#4E4456] shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Explore Systems
                  </Link>
                  <Link
                    href="#about"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative h-[250px] w-[250px] md:h-[300px] md:w-[300px] bg-[#4E4456] rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/muscat-bay-logo-mark.png"
                    alt="Muscat Bay Logo"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="systems" className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#4E4456]">
                  Project Management Systems
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access our integrated management systems to monitor and control all aspects of the Muscat Bay project.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <Link
                href="/water-system"
                className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-md transition-all hover:shadow-xl"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4E4456]/10 text-[#4E4456]">
                      <Droplets className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4E4456]">Water System</h3>
                    <p className="text-sm text-gray-500">
                      Monitor water distribution, consumption, and maintenance across the project.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-[#4E4456]">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              <Link
                href="/electricity-system"
                className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-md transition-all hover:shadow-xl"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4E4456]/10 text-[#4E4456]">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4E4456]">Electricity System</h3>
                    <p className="text-sm text-gray-500">
                      Track power distribution, usage patterns, and electrical infrastructure.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-[#4E4456]">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              <Link
                href="/stp-plant"
                className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-md transition-all hover:shadow-xl"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4E4456]/10 text-[#4E4456]">
                      <Factory className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4E4456]">STP Plant</h3>
                    <p className="text-sm text-gray-500">
                      Manage sewage treatment operations, maintenance schedules, and performance metrics.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-[#4E4456]">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              <Link
                href="/contractor-tracker"
                className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-md transition-all hover:shadow-xl"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4E4456]/10 text-[#4E4456]">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4E4456]">Contractor Tracker</h3>
                    <p className="text-sm text-gray-500">
                      Track contractor activities, project timelines, and performance evaluations.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-[#4E4456]">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              <Link
                href="/alm"
                className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-md transition-all hover:shadow-xl"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4E4456]/10 text-[#4E4456]">
                      <Package className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4E4456]">ALM</h3>
                    <p className="text-sm text-gray-500">
                      Assets Lifecycle Management - Track and manage all facility assets throughout their lifecycle.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-[#4E4456]">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-16 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#4E4456]">About Muscat Bay</h2>
                <p className="mt-4 text-gray-500 md:text-xl/relaxed">
                  Muscat Bay is a prestigious development project that combines luxury living with sustainable
                  infrastructure. Our integrated management systems ensure efficient operation of all utilities and
                  services.
                </p>
                <div className="mt-8">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#4E4456] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#4E4456]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4E4456] text-white">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4E4456]">Integrated Systems</h3>
                    <p className="text-gray-500">
                      Our management portal provides a unified interface for all utility systems.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4E4456] text-white">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4E4456]">Real-time Monitoring</h3>
                    <p className="text-gray-500">Access real-time data and analytics for all project components.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4E4456] text-white">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4E4456]">Contractor Management</h3>
                    <p className="text-gray-500">
                      Efficiently track and manage all contractor activities and performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#4E4456]">Get Started Today</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access our management systems and start monitoring your project components.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#4E4456] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#4E4456]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Login to Dashboard
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-[#4E4456] bg-transparent px-8 text-sm font-medium text-[#4E4456] shadow-sm transition-colors hover:bg-[#4E4456]/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-[#4E4456] py-6 text-white">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 mr-2">
              <Image src="/images/muscat-bay-logo-mark.png" alt="Muscat Bay Logo" fill className="object-contain" />
            </div>
            <span className="text-sm font-semibold">MUSCAT BAY</span>
          </div>
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} Muscat Bay. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
