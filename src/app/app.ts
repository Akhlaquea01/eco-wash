import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface BookingForm {
  name: string;
  email?: string;
  phone: string;
  vehicleNumber: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  price: number
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
export class App implements OnInit {
  private http = inject(HttpClient);

  services: any[] = [];
  offers: any[] = [];
  testimonials: Testimonial[] = [];
  contactInfo: any = {};

  ngOnInit() {
    this.http.get<any>('assets/data.json').subscribe(data => {
      this.services = data.services;
      this.offers = data.offers;
      this.testimonials = data.testimonials;
      this.contactInfo = data.contactInfo;
    });
  }

  protected readonly title = signal('eco-wash');
  isModalOpen = signal(false);

  booking = signal<BookingForm>({
    name: '',
    email: '',
    phone: '',
    vehicleNumber: '',
    service: '',
    date: '',
    time: '',
    notes: '',
    price: 0
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
    } else {
      // Mark all fields as touched to display validation errors
      Object.values(form.controls).forEach(control => {
        (control as any).markAsTouched();
      });
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
    this.booking.update(form => ({ ...form, service: serviceName, price: price }));
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
}
