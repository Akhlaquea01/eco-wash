import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}
interface Testimonial {
  stars: number;
  message: string;
  name: string;
  role: string;
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  services = [
    {
      icon: '💧',
      name: 'Basic Wash',
      description: 'Exterior wash with foam and rinse',
      price: 19.99
    },
    {
      icon: '✨',
      name: 'Premium Wash',
      description: 'Exterior + interior vacuum & wipe',
      price: 34.99
    },
    {
      icon: '👑',
      name: 'Deluxe Package',
      description: 'Full detail with wax & tire shine',
      price: 54.99
    },
    {
      icon: '🧼',
      name: 'Interior Deep Clean',
      description: 'Seats, carpets, and dashboard detail',
      price: 44.99
    },
    {
      icon: '🛡️',
      name: 'Ceramic Coating',
      description: 'Long-lasting protection & shine',
      price: 89.99
    },
    {
      icon: '🚙',
      name: 'Fleet Wash',
      description: 'Bulk pricing for multiple vehicles',
      price: 0
    }
  ];

  offers = [
    {
      badge: 'SAVE 25%',
      title: 'Summer Special',
      description: 'Get Premium Wash at just',
      price: 26.24,
      note: 'Valid until end of month',
      buttonText: 'Claim Offer',
      buttonStyle: 'btn-secondary',
      serviceName: 'Premium Wash - Summer Special'
    },
    {
      badge: 'BUY 3 GET 1 FREE',
      title: 'Loyalty Bundle',
      description: 'Book 3 washes, get 1 free',
      price: 59.97,
      note: 'Perfect for regular customers',
      buttonText: 'Get Bundle',
      buttonStyle: 'btn-secondary',
      serviceName: 'Loyalty Bundle'
    },
    {
      badge: 'REFERRAL BONUS',
      title: 'Refer & Earn',
      description: 'Earn credit for each friend',
      price: 10,
      note: 'Unlimited referrals',
      buttonText: 'Learn More',
      buttonStyle: 'btn-secondary',
      serviceName: ''
    },
    {
      badge: 'MONTHLY PASS',
      title: 'Unlimited Wash Pass',
      description: 'Unlimited washes per month',
      price: 79,
      note: 'Cancel anytime',
      buttonText: 'Subscribe',
      buttonStyle: 'btn-secondary',
      serviceName: 'Unlimited Monthly Pass'
    }
  ];

  testimonials: Testimonial[] = [
    {
      stars: 5,
      message: 'Amazing service! My car looks brand new. The team was professional and efficient. Highly recommended!',
      name: 'Sarah Johnson',
      role: 'Verified Customer'
    },
    {
      stars: 5,
      message: 'Best car wash in town! Quick, affordable, and they really care about the details. Will definitely come back.',
      name: 'Michael Chen',
      role: 'Verified Customer'
    },
    {
      stars: 5,
      message: 'The ceramic coating is incredible! My car stays clean longer and has an amazing shine. Worth every penny!',
      name: 'Emily Rodriguez',
      role: 'Verified Customer'
    }
  ];
  protected readonly title = signal('eco-wash');
  isModalOpen = signal(false);

  booking = signal<BookingForm>({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  selectedService = signal<string>('');
  today = new Date().toISOString().split('T')[0];

  // Modal controls
  openBookingModal(serviceName?: string) {
    if (serviceName) this.selectedService.set(serviceName);
    this.isModalOpen.set(true);
  }

  closeBookingModal() {
    this.isModalOpen.set(false);
  }

  // Booking form submission
  handleBooking(form: any) {
    if (form.valid) {
      alert(`✅ Booking confirmed for ${this.selectedService()}! We'll contact you soon.`);
      this.closeBookingModal();
      form.resetForm();
      this.selectedService.set('');
    }
  }

  // Contact form submission
  handleContact(form: any) {
    if (form.valid) {
      alert('✅ Message sent! We’ll get back to you within 24 hours.');
      form.resetForm();
    }
  }
  selectService(serviceName: string, price: number) {
    this.selectedService.set(serviceName);
    this.booking.update(form => ({ ...form, service: serviceName }));
    this.openBookingModal(serviceName);
  }
  contact = {
    name: '',
    email: '',
    message: '',
  };

  sendMail() {
    const subject = encodeURIComponent(`Message from ${this.contact.name}`);
    const body = encodeURIComponent(
      `From: ${this.contact.email}\n\n${this.contact.message}`
    );
    const mailto = `mailto:akhlaquea01@gmail.com?subject=${subject}&body=${body}`;

    // Open user's email client
    window.location.href = mailto;
  }

  contactInfo = {
    location: 'ECO WASH "N" SERVICES,Nawab Road, Near Marwari High School, Chandwara, Muzaffarpur, Bihar (842001)',
    directionLink: 'https://share.google/a2s7TbolXIVqdoRJT',
    phone: '+919504707510',
    displayPhone: '9504707510',
    email: 'mdashabalam786@gmail.com',
    hours: {
      weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
      saturday: 'Saturday: 9:00 AM - 5:00 PM',
      sunday: 'Sunday: 10:00 AM - 4:00 PM'
    }
  };
}
