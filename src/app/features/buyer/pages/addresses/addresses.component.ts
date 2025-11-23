import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressModalComponent } from '../../components/add-address-modal/add-address-modal.component';

interface Address {
  id: string;
  phone: string;
  fullPhone: string;
  address: string;
  isPrimary: boolean;
}

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, AddAddressModalComponent],
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  showAddModal = false;
  addressToEdit: Address | null = null;
  selectedAddressId: string | null = null;
  showMenu: string | null = null;

  addresses: Address[] = [
    {
      id: '1',
      phone: '(07) 212 3456 789',
      fullPhone: '+32 (07) 212 3456 789',
      address: "Lieu de l'adresse, Rue, Ville, Pays...",
      isPrimary: true,
    },
    {
      id: '2',
      phone: '(07) 212 3456 789',
      fullPhone: '+32 (07) 212 3456 789',
      address: "Lieu de l'adresse, Rue, Ville, Pays...",
      isPrimary: false,
    },
    {
      id: '3',
      phone: '(07) 212 3456 789',
      fullPhone: '+32 (07) 212 3456 789',
      address: "Lieu de l'adresse, Rue, Ville, Pays...",
      isPrimary: false,
    },
    {
      id: '4',
      phone: '(07) 212 3456 789',
      fullPhone: '+32 (07) 212 3456 789',
      address: "Lieu de l'adresse, Rue, Ville, Pays...",
      isPrimary: false,
    },
    {
      id: '5',
      phone: '(07) 212 3456 789',
      fullPhone: '+32 (07) 212 3456 789',
      address: "Lieu de l'adresse, Rue, Ville, Pays...",
      isPrimary: false,
    },
  ];

  get primaryAddress(): Address | undefined {
    return this.addresses.find((a) => a.isPrimary);
  }

  get secondaryAddresses(): Address[] {
    return this.addresses.filter((a) => !a.isPrimary);
  }

  openAddModal(): void {
    this.addressToEdit = null;
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.addressToEdit = null;
  }

  onAddressSaved(addressData: any): void {
    const existingIndex = this.addresses.findIndex(
      (a) => a.id === addressData.id
    );

    if (existingIndex !== -1) {
      // Modification
      this.addresses[existingIndex] = {
        ...this.addresses[existingIndex],
        ...addressData,
      };
      alert('Adresse modifiée avec succès !');
    } else {
      // Ajout
      this.addresses.push(addressData);
      alert('Adresse ajoutée avec succès !');
    }
  }

  selectAddress(addressId: string): void {
    this.selectedAddressId = addressId;
  }

  toggleMenu(addressId: string, event: Event): void {
    event.stopPropagation();
    this.showMenu = this.showMenu === addressId ? null : addressId;
  }

  onMenuAction(address: Address, action: string, event: Event): void {
    event.stopPropagation();
    this.showMenu = null;

    switch (action) {
      case 'set-primary':
        this.setPrimary(address);
        break;
      case 'edit':
        this.editAddress(address);
        break;
      case 'delete':
        this.deleteAddress(address.id);
        break;
    }
  }

  setPrimary(address: Address): void {
    this.addresses.forEach((a) => (a.isPrimary = false));
    address.isPrimary = true;
    alert('Adresse définie comme principale !');
  }

  editAddress(address: Address): void {
    this.addressToEdit = { ...address };
    this.showAddModal = true;
  }

  deleteAddress(addressId: string): void {
    if (!confirm('Voulez-vous vraiment retirer cette adresse ?')) {
      return;
    }

    this.addresses = this.addresses.filter((a) => a.id !== addressId);

    // Si on supprime l'adresse principale, définir la première comme principale
    if (!this.addresses.find((a) => a.isPrimary) && this.addresses.length > 0) {
      this.addresses[0].isPrimary = true;
    }

    // Reset sélection si l'adresse supprimée était sélectionnée
    if (this.selectedAddressId === addressId) {
      this.selectedAddressId = null;
    }

    alert('Adresse retirée avec succès !');
  }

  onSave(): void {
    if (!this.selectedAddressId) {
      alert('Veuillez sélectionner une adresse');
      return;
    }

    // Définir l'adresse sélectionnée comme principale
    this.addresses.forEach((a) => (a.isPrimary = false));
    const selectedAddress = this.addresses.find(
      (a) => a.id === this.selectedAddressId
    );
    if (selectedAddress) {
      selectedAddress.isPrimary = true;
      alert('Adresse définie comme principale !');
    }

    // TODO: Appel API pour sauvegarder
    console.log('Adresses sauvegardées');
  }
}
