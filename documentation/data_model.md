# Data Model

## Structure

> **Users**
- _id:_ Primary key that identifies the user
- _role_id:_ Foreign key of the role the user has
- _password:_ The password of the user
- _name:_ The name of the user
- _email:_ The email of the user
- _profile_img:_ The profile image of the user

> **Sessions**
- _id:_ Primary key that identifies the session
- _user_id:_ Foreign key of the user the session belongs to
- _score:_ The final score the user obtained in this session
- _ships_destroyed:_ The amount of ships the user destroyed in this session
- _bullets_fired:_ The amount of bullets the user fired in this session
- _powerups:_ The amount of powerups the user picked up in this session

> **Roles**
- _id:_ Primary key that identifies the role
- _role_name:_ Which role it is (IE: User/Administrator)

> **Relationships**
- _Role/User:_ One-To-Many, many users can have the same role
- _User/Session:_ One-To-Many, an user can have many sessions

## Entity-Relationship Diagram
[alt text](documentation\images\Entity-Relationship Diagram.jpg)
## Relational Diagram
[alt text](documentation\images\Relational Diagram.jpg)
## UML Diagram
[alt text](documentation\images\UML Diagram.png)
