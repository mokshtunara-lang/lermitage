import BookingWidget from "./booking-widget";

export default function HomePage() {
  const amenities = [
    "Meals",
    "Daily Housekeeping",
    "In-Room Dining Service",
    "Infinity Pool",
    "Garden",
    "Forest Trail",
  ];

  const nearby = [
    "Phansad Dam · 5 min drive",
    "Kashid Beach · 10–15 min drive",
    "Korlai Lighthouse / Fort · 20 min drive",
    "Alibaug · 45 min drive",
    "Mandwa Jetty · 1 hr 30 min drive",
  ];

  const pricing = [
    "Weekend · 4 guests and below · ₹30,000",
    "Weekend · 6 guests and below · ₹35,000",
    "Weekend · 8 guests and below · ₹45,000",
    "Weekend · 10–14 guests · ₹55,000",
    "Weekday (Mon–Thu) · ₹10,000 less than weekend rates",
  ];

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-semibold tracking-wide">
              Lermitage Farms
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Luxury Nature Retreat
            </div>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#home" className="hover:text-stone-600">
              Home
            </a>
            <a href="#about" className="hover:text-stone-600">
              About
            </a>
            <a href="#amenities" className="hover:text-stone-600">
              Amenities
            </a>
            <a href="#explore" className="hover:text-stone-600">
              Explore
            </a>
            <a href="#reserve" className="hover:text-stone-600">
              Reserve
            </a>
            <a href="#contact" className="hover:text-stone-600">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section
        id="home"
        className="relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1800&auto=format&fit=crop')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-end px-6 py-20 md:py-28">
          <div className="max-w-3xl text-white">
            <div className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] backdrop-blur">
              3 Bedroom Bungalow · Infinity Pool · Up to 14 Guests
            </div>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Luxury villa stays wrapped in nature.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
              Escape to a refined farm retreat with a private infinity pool,
              expansive lawn, forest surroundings, and spacious accommodation
              for families, groups, and slow weekend getaways.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#reserve"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-stone-900 shadow-sm transition hover:scale-[1.02]"
              >
                Check Availability
              </a>
              <a
                href="#contact"
                className="rounded-2xl border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
            About the stay
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Designed for open skies, luxury comfort, and city escape weekends.
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            Lermitage Farms is a beautiful 3-bedroom bungalow with a 30 ft by
            15 ft infinity pool, large lawn, and immersive natural surroundings.
            It is ideal for families, friend groups, and private getaways
            looking for peace, comfort, and a genuine break from city life.
          </p>
          <p className="mt-4 text-lg leading-8 text-stone-700">
            Enjoy birdwatching, bonfire evenings, forest walks, stargazing, and
            laid-back time within the property itself. With scenic nearby spots
            and premium stay essentials, it is built for slow, memorable escapes.
          </p>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="text-sm uppercase tracking-[0.25em] text-stone-500">
            Quick facts
          </div>

          <div className="mt-6 space-y-4 text-stone-700">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <span>Bedrooms</span>
              <span className="font-medium text-stone-900">3</span>
            </div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <span>Guests</span>
              <span className="font-medium text-stone-900">Up to 14</span>
            </div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <span>Check-in</span>
              <span className="font-medium text-stone-900">3:00 PM</span>
            </div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <span>Check-out</span>
              <span className="font-medium text-stone-900">11:00 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Best for</span>
              <span className="font-medium text-stone-900">
                Luxury Group Getaways
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="amenities" className="bg-stone-100 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
            Amenities
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Everything you need for a comfortable, elevated stay.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
              >
                <div className="text-lg font-medium">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="explore" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              Explore
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Well connected to beaches, forts, and scenic day spots.
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone-700">
              Close to Phansad Dam and Phansad Wildlife Sanctuary, with easy
              access to Kashid, Korlai, Alibaug, and Mandwa Jetty.
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              {nearby.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-stone-50 px-4 py-4 text-stone-700 ring-1 ring-stone-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reserve" className="bg-stone-900 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/60">
              Reserve
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Plan your stay with flexible booking options.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Choose your dates, guest count, and see an estimated total. You
              can continue with online payment later, or confirm your booking by
              WhatsApp for cash arrangements.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-[0.25em] text-white/60">
                Pricing
              </div>

              <div className="mt-5 space-y-3 text-white/85">
                {pricing.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>

          <BookingWidget />
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Make an enquiry or start your booking.
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone-700">
              Reach out directly for availability, custom requests, and cash
              bookings.
            </p>

            <div className="mt-8 space-y-3 text-lg text-stone-700">
              <div>
                <span className="font-medium text-stone-900">WhatsApp:</span>{" "}
                7400077899
              </div>
              <div>
                <span className="font-medium text-stone-900">Phone:</span>{" "}
                7400077899
              </div>
              <div>
                <span className="font-medium text-stone-900">Email:</span>{" "}
                lermitagefarms@gmail.com
              </div>
            </div>
          </div>

          <form className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <input
                className="rounded-2xl border border-stone-200 px-4 py-3 outline-none"
                placeholder="Name"
              />
              <input
                className="rounded-2xl border border-stone-200 px-4 py-3 outline-none"
                placeholder="Email"
              />
              <input
                className="rounded-2xl border border-stone-200 px-4 py-3 outline-none"
                placeholder="Phone / WhatsApp"
              />
              <textarea
                className="min-h-32 rounded-2xl border border-stone-200 px-4 py-3 outline-none"
                placeholder="Message"
              />
              <button
                type="button"
                className="rounded-2xl bg-stone-900 px-4 py-3 text-white"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}