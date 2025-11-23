import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Reward {
  id: string;
  title: string;
  date: string;
  currentAmount: number;
  targetAmount: number;
  currency: string;
  status: 'en-cours' | 'termine';
}

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
})
export class RewardsComponent {
  currentScore = 30;
  maxScore = 50;
  showMenu: string | null = null;

  rewards: Reward[] = [
    {
      id: '1',
      title: "Récompense du 18/12/23 - Aujourd'hui",
      date: '18/12/23',
      currentAmount: 650,
      targetAmount: 2000,
      currency: 'CAD',
      status: 'en-cours',
    },
    {
      id: '2',
      title: "Récompense du 18/12/23 - Aujourd'hui",
      date: '18/12/23',
      currentAmount: 650,
      targetAmount: 2000,
      currency: 'CAD',
      status: 'en-cours',
    },
    {
      id: '3',
      title: "Récompense du 18/12/23 - Aujourd'hui",
      date: '18/12/23',
      currentAmount: 650,
      targetAmount: 2000,
      currency: 'CAD',
      status: 'termine',
    },
    {
      id: '4',
      title: "Récompense du 18/12/23 - Aujourd'hui",
      date: '18/12/23',
      currentAmount: 650,
      targetAmount: 2000,
      currency: 'CAD',
      status: 'termine',
    },
  ];

  get progressPercentage(): number {
    return Math.round((this.currentScore / this.maxScore) * 100);
  }

  getStatusLabel(status: string): string {
    return status === 'en-cours' ? 'En cours' : 'Terminé';
  }

  getStatusColor(status: string): string {
    return status === 'en-cours'
      ? 'bg-orange-100 text-orange-600'
      : 'bg-green-100 text-green-600';
  }

  toggleMenu(rewardId: string): void {
    this.showMenu = this.showMenu === rewardId ? null : rewardId;
  }

  onClaimReward(): void {
    if (this.currentScore >= this.maxScore) {
      alert('Félicitations ! Vous pouvez réclamer votre récompense !');
      // TODO: Appel API pour réclamer
    } else {
      const pointsNeeded = this.maxScore - this.currentScore;
      alert(
        `Il vous manque encore ${pointsNeeded} points pour réclamer cette récompense.`
      );
    }
  }

  onRewardAction(reward: Reward, action: string): void {
    this.showMenu = null;
    console.log(`Action ${action} sur récompense:`, reward);

    switch (action) {
      case 'details':
        alert(`Détails de la récompense ${reward.title}`);
        break;
      case 'history':
        alert(`Historique de la récompense ${reward.title}`);
        break;
      case 'cancel':
        if (confirm('Voulez-vous vraiment annuler cette récompense ?')) {
          alert('Récompense annulée');
        }
        break;
    }
  }
}
