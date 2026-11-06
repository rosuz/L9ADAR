# L9aDar — Architecture et fonctionnalités du MVP

## Vision du produit

L9aDar permet aux étudiants de créer un projet de colocation, trouver des colocataires compatibles, discuter, partager un logement et former leur groupe.

## Architecture fonctionnelle — style VS Code

```text
L9aDar — MVP
│
├── 01 — Public
│   ├── Landing Page
│   ├── Login
│   ├── Sign Up
│   └── Forgot Password
│
├── 02 — Student Profile
│   ├── Profile Setup
│   └── Edit Profile
│
├── 03 — Housing Plan
│   ├── Choose Housing Status
│   │   ├── I Found a Home
│   │   └── I'm Still Looking
│   ├── Housing Information
│   ├── Living Preferences
│   └── Rent Split Helper
│
├── 04 — Matches
│   ├── Matches List
│   ├── Basic Filters
│   ├── Save Profile
│   └── Roommate Profile
│
├── 05 — Messages
│   ├── Conversations List
│   ├── Direct Conversation
│   ├── Share Home in Chat
│   └── Mutual Interest
│
├── 06 — Plan Members
│   ├── Invite to Plan
│   ├── Accept Invitation
│   ├── Decline Invitation
│   └── Leave Plan
│
├── 07 — My Plan
│   ├── Plan Summary
│   ├── Selected Home
│   ├── Confirmed Members
│   ├── Remaining Spots
│   └── Edit Plan
│
├── 08 — Safety
│   ├── Block User
│   └── Report User
│
└── 09 — Settings
    ├── Edit Account
    ├── Change Password
    └── Delete Account
```

## 1. Authentification

Fonctionnalités :

- créer un compte ;
- se connecter ;
- se déconnecter ;
- demander la réinitialisation du mot de passe ;
- modifier le mot de passe.

## 2. Profil étudiant

Informations du profil :

- photo ;
- nom ;
- université ;
- formation ;
- année d'étude ;
- ville ;
- courte biographie.

Actions :

- créer le profil ;
- modifier le profil ;
- supprimer le compte.

## 3. Housing Plan

Le Housing Plan représente le projet de colocation de l'utilisateur.

### Parcours « I Found a Home »

L'utilisateur renseigne :

- ville ;
- quartier ;
- type de logement ;
- loyer ;
- nombre de chambres ;
- capacité maximale ;
- date d'emménagement ;
- nombre de colocataires recherchés ;
- lien de l'annonce, facultatif.

### Parcours « I'm Still Looking »

L'utilisateur renseigne :

- ville ;
- quartiers souhaités ;
- budget par personne ;
- date d'emménagement ;
- taille souhaitée du groupe.

## 4. Types de logement

```text
Entire place
Private room
Shared room
```

- `Entire place` : prix total du logement.
- `Private room` : prix de la chambre.
- `Shared room` : prix par lit.

## 5. Rent Split Helper

Pour un logement entier, L9aDar estime automatiquement le prix par personne.

```text
6,000 MAD total
3 occupants
≈ 2,000 MAD/person
```

Afficher également :

- capacité maximale ;
- membres confirmés ;
- places restantes.

## 6. Préférences de colocation

Préférences :

- smoking ;
- quiet hours ;
- cleaning ;
- guests.

## 7. Matches

Afficher une liste de colocataires compatibles avec le Housing Plan.

Fonctionnalités :

- consulter les résultats ;
- filtrer par ville ;
- filtrer par budget ;
- filtrer par date ;
- sauvegarder un profil ;
- ouvrir un profil ;
- envoyer un message.

Indication affichée sur les profils proposés :

```text
Compatible with your housing plan
```

## 8. Roommate Profile

Afficher :

- photo ;
- nom ;
- université ;
- formation ;
- ville ;
- budget ;
- date d'emménagement ;
- biographie ;
- préférences principales.

Actions :

- `Message` ;
- `Save` ;
- `Block` ;
- `Report`.

## 9. Messages

Fonctionnalités :

- liste des conversations ;
- messages directs ;
- compteur de messages non lus ;
- partage d'un logement ;
- ouverture du profil ;
- indication d'intérêt.

Question simple :

```text
Interested in planning together?
```

Réponses :

```text
Yes
Maybe
No
```

## 10. Share Home in Chat

Une carte de logement peut être envoyée dans une conversation.

Elle contient :

- image ;
- titre ;
- quartier ;
- type ;
- prix ;
- nombre de chambres ;
- capacité ;
- coût estimé par personne.

Le logement reste privé dans la conversation et le Housing Plan.

## 11. Invitation au Housing Plan

Après discussion, un utilisateur peut inviter une personne dans son Housing Plan.

Actions :

- envoyer une invitation ;
- accepter ;
- refuser ;
- quitter le plan ;
- retirer un membre.

## 12. My Plan

Afficher :

- ville ;
- budget ;
- date ;
- logement sélectionné ;
- membres confirmés ;
- invitations en attente ;
- capacité totale ;
- places restantes.

Actions :

- modifier le plan ;
- ajouter ou remplacer le logement ;
- consulter les matches ;
- ouvrir une conversation ;
- fermer le plan.

## Pages à coder

```text
app/
├── page                         # Landing
├── login                        # Login
├── signup                       # Sign Up
├── forgot-password              # Forgot Password
│
├── profile/
│   ├── setup                    # Create Profile
│   └── edit                     # Edit Profile
│
├── plan/
│   ├── new/
│   │   ├── status               # Found home / Still looking
│   │   ├── housing              # Housing information
│   │   └── preferences          # Living preferences
│   └── page                     # My Plan
│
├── matches/
│   ├── page                     # Matches List
│   └── [userId]                 # Roommate Profile
│
├── messages/
│   ├── page                     # Conversations
│   └── [conversationId]         # Direct Chat
│
└── settings/
    └── page                     # Account Settings
```

## Modèle de données

```text
User
StudentProfile
HousingPlan
HousingPreference
Home
PlanMember
PlanInvitation
SavedProfile
Conversation
Message
Notification
UserBlock
UserReport
```

## Résumé du MVP

> Créer un plan, trouver des colocataires, discuter, partager un logement et former le groupe.
