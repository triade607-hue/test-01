import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileEmailSectionComponent } from '../../components/profile-email-section/profile-email-section.component';
import { ProfilePasswordSectionComponent } from '../../components/profile-password-section/profile-password-section.component';
import { ProfilePhotoSectionComponent } from '../../components/profile-photo-section/profile-photo-section.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProfileEmailSectionComponent,
    ProfilePhotoSectionComponent,
    ProfilePasswordSectionComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  // Données du profil
  email = 'monadresse@gmail.com';
  phone = '010 000 0000';
  profilePhoto = 'https://i.pravatar.cc/160?img=25';

  constructor(private router: Router) {}

  onEmailPhoneSave(data: {
    email: string;
    phone: string;
    fullPhone: string;
  }): void {
    console.log('Sauvegarde email/téléphone:', data);
    this.email = data.email;
    this.phone = data.phone;
    // TODO: Appel API pour sauvegarder email/phone
    alert('Email et téléphone enregistrés avec succès !');
  }

  onPhotoChange(file: File): void {
    console.log('Photo sélectionnée:', file);
    // TODO: Upload vers le serveur
    alert('Photo mise à jour automatiquement !');
  }

  onPasswordSave(data: { currentPassword: string; newPassword: string }): void {
    console.log('Sauvegarde mot de passe');
    // TODO: Appel API pour changer le mot de passe
    alert('Mot de passe modifié avec succès !');
  }

  onDeactivateAccount(): void {
    // Redirection vers la page de désactivation
    this.router.navigate(['/buyer/profile/deactivate-account']);
  }
}
