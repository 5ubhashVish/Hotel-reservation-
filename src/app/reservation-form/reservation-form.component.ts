import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Reservation } from '../models/reservation';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservations: FormGroup = new FormGroup({});
  id: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservations = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });

    this.route.params.subscribe((param: Params) => {
      if (param['id']) {
        this.id = param['id'];
        this.reservationService
          .getReservation(param['id'])
          ?.subscribe((res) => {
            if (res) {
              this.reservations.patchValue(res);
            }
          });
      }
    });
  }

  onSubmit() {
    if (this.reservations.valid) {
      let res: Reservation = this.reservations.value;

      if (this.id) {
        res.id = this.id;
        this.reservationService.updateReservations(res).subscribe();
      } else {
        res.id = Date.now().toString();
        this.reservationService.addReservation(res).subscribe();
      }

      this.router.navigate(['/list']);
    }
  }
}
