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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
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
}
