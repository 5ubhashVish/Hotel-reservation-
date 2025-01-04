import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private api = 'http://localhost:3001';
  reservations: Reservation[] = [];
  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api + '/reservations');
  }

  getReservation(id: string): Observable<Reservation> | undefined {
    return this.http.get<Reservation>(this.api + '/reservation/' + id);
  }

  addReservation(res: Reservation) {
    // this.reservations.push(res);
    // this.http.post<Reservation>(this.api + '/reservation/' + id);
    return this.http.post<any>(this.api + '/reservation', res);
  }

  removeReservation(id: string) {
    return this.http.delete<void>(this.api + '/reservation/' + id);
  }

  updateReservations(res: Reservation) {
    return this.http.put<any>(this.api + '/reservation/' + res.id, res);
  }
}
