"use client";

import { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

function formatDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getNightCount(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getBaseRate(guests: number, isWeekend: boolean) {
  let weekendRate = 30000;

  if (guests <= 4) weekendRate = 30000;
  else if (guests <= 6) weekendRate = 35000;
  else if (guests <= 8) weekendRate = 45000;
  else weekendRate = 55000;

  return isWeekend ? weekendRate : weekendRate - 10000;
}

function dateRangeIncludesWeekend(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return false;

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const current = new Date(start);

  while (current < end) {
    const day = current.getDay();
    if (day === 5 || day === 6 || day === 0) return true;
    current.setDate(current.getDate() + 1);
  }

  return false;
}

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(4);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const nights = useMemo(() => getNightCount(checkIn, checkOut), [checkIn, checkOut]);

  const hasWeekend = useMemo(
    () => dateRangeIncludesWeekend(checkIn, checkOut),
    [checkIn, checkOut]
  );

  const total = useMemo(() => {
    if (!nights) return 0;
    const rate = getBaseRate(guests, hasWeekend);
    return rate * nights;
  }, [guests, hasWeekend, nights]);

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Hi, I want to book Lermitage Farms.\n` +
        `Name: ${name || "-"}\n` +
        `Phone: ${phone || "-"}\n` +
        `Email: ${email || "-"}\n` +
        `Check-in: ${formatDate(checkIn) || "-"}\n` +
        `Check-out: ${formatDate(checkOut) || "-"}\n` +
        `Guests: ${guests}\n` +
        `Nights: ${nights}\n` +
        `Estimated Total: ₹${total || 0}`
    );

    return `https://wa.me/917400077899?text=${text}`;
  }, [name, phone, email, checkIn, checkOut, guests, nights, total]);

  async function hasDateConflict() {
    const { data: bookingConflicts, error: bookingError } = await supabase
      .from("bookings")
      .select("id, check_in, check_out, payment_status")
      .neq("payment_status", "cancelled")
      .lt("check_in", checkOut)
      .gt("check_out", checkIn);

    if (bookingError) {
      throw bookingError;
    }

    if (bookingConflicts && bookingConflicts.length > 0) {
      return true;
    }

    const { data: blockedConflicts, error: blockedError } = await supabase
      .from("blocked_dates")
      .select("id, start_date, end_date")
      .lt("start_date", checkOut)
      .gt("end_date", checkIn);

    if (blockedError) {
      throw blockedError;
    }

    return !!(blockedConflicts && blockedConflicts.length > 0);
  }

  async function saveBooking(paymentMode: "cash" | "online") {
    setMessage("");

    if (!checkIn || !checkOut) {
      setMessage("Please select check-in and check-out dates.");
      return false;
    }

    if (nights <= 0) {
      setMessage("Check-out must be after check-in.");
      return false;
    }

    if (!name.trim() || !phone.trim()) {
      setMessage("Please enter your name and phone number.");
      return false;
    }

    setIsSaving(true);

    try {
      const conflict = await hasDateConflict();

      if (conflict) {
        setMessage("Those dates are already unavailable. Please choose different dates.");
        setIsSaving(false);
        return false;
      }

      const { error } = await supabase.from("bookings").insert({
        check_in: checkIn,
        check_out: checkOut,
        guests,
        total_price: total,
        payment_mode: paymentMode,
        payment_status: paymentMode === "cash" ? "cash_pending" : "pending",
        guest_name: name,
        phone,
        email,
        notes: `Created from website booking widget. Nights: ${nights}. Pricing mode: ${
          hasWeekend ? "Weekend rate" : "Weekday rate"
        }`,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        setMessage(`Save failed: ${error.message}`);
        setIsSaving(false);
        return false;
      }

      setIsSaving(false);
      return true;
    } catch (error: any) {
      console.error("Conflict check error:", error);
      setMessage(`Save failed: ${error.message || "Unknown error"}`);
      setIsSaving(false);
      return false;
    }
  }

  async function handleCashBooking() {
    const ok = await saveBooking("cash");
    if (!ok) return;
    window.open(whatsappUrl, "_blank");
  }

  async function handleOnlineBooking() {
    const ok = await saveBooking("online");
    if (!ok) return;
    setMessage("Booking saved. Razorpay will be connected next.");
  }

  return (
    <div className="rounded-3xl bg-white p-6 text-stone-900 shadow-2xl">
      <div className="text-sm uppercase tracking-[0.25em] text-stone-500">
        Booking Widget
      </div>

      <div className="mt-6 grid gap-4">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="rounded-2xl border border-stone-200 px-4 py-3"
        />

        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="rounded-2xl border border-stone-200 px-4 py-3"
        />

        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="rounded-2xl border border-stone-200 px-4 py-3"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
            <option key={num} value={num}>
              {num} Guest{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="rounded-2xl border border-stone-200 px-4 py-3"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone / WhatsApp"
          className="rounded-2xl border border-stone-200 px-4 py-3"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="rounded-2xl border border-stone-200 px-4 py-3"
        />

        <div className="rounded-2xl bg-stone-100 px-4 py-4 text-sm text-stone-700">
          <div>
            Nights: <span className="font-semibold">{nights || 0}</span>
          </div>
          <div>
            Pricing mode:{" "}
            <span className="font-semibold">
              {hasWeekend ? "Weekend rate" : "Weekday rate"}
            </span>
          </div>
          <div className="mt-2 text-base font-semibold text-stone-900">
            Estimated Total: ₹{total.toLocaleString("en-IN")}
          </div>
        </div>

        {message ? (
          <div className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-700">
            {message}
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleOnlineBooking}
          disabled={isSaving}
          className="rounded-2xl bg-stone-900 px-4 py-3 text-white disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Pay Online"}
        </button>

        <button
          type="button"
          onClick={handleCashBooking}
          disabled={isSaving}
          className="rounded-2xl border border-stone-300 px-4 py-3 text-stone-900 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Book via WhatsApp / Cash"}
        </button>
      </div>
    </div>
  );
}