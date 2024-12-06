import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular'; // Importar Ionic Storage



  // Autenticación de login
  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    public barbers = [
      { email: 'barbero1', password: 'barbero1', role: 'barbero', username: 'Carlos' },
      { email: 'barbero2', password: 'barbero2', role: 'barbero', username: 'Juan' },
    ];
    private clients: any[] = [];
  
    constructor(private storage: Storage) {
      this.initStorage();
    }
  
    private async initStorage() {
      await this.storage.create();
      await this.loadClients();
    }
    getBarbers() {
      return this.barbers.map(barber => barber.username);
    }
    login(email: string, password: string): Observable<any> {
      return new Observable(observer => {
        const barber = this.barbers.find((b) => b.email === email && b.password === password);
        if (barber) {
          observer.next(barber);
          observer.complete();
          return;
        }
  
        const client = this.clients.find((c) => c.email === email && c.password === password);
        if (client) {
          observer.next(client);
          observer.complete();
          return;
        }
  
        observer.error(new Error('Credenciales incorrectas'));
      });
    }
  
    register(email: string, password: string, username: string): Observable<any> {
      return new Observable((observer) => {
        
        const existingClient = this.clients.find((c) => c.email === email);
        if (existingClient) {
          observer.error(new Error('El correo ya está registrado'));
          return;
        }
    
        
        const newClient = { 
          email, 
          password, 
          username, 
          role: 'cliente',
          id: Date.now().toString() 
        };
    
        
        this.clients.push(newClient);
        
       
        this.storage.set('clients', this.clients)
          .then(() => {
            observer.next(newClient);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      });
    }
  
    async loadClients() {
      const storedClients = await this.storage.get('clients');
      if (storedClients) {
        this.clients = storedClients;
      }
    }

  async loadCurrentUser() {
    const currentUser = await this.storage.get('currentUser');
    return currentUser;
  }
  async logout(): Promise<void> {
    try {

      await this.storage.remove('currentUser');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  async setCurrentUser(user: any) {
    await this.storage.set('currentUser', user);
  }
}
