# Database

ByteStore requires multiple database tables to be a fully-featured and connected system. This document will go over the design of the database schema, provide example database calls and show common relations.

## DB and ORM
ByteStore 1 is built upon a PostgreSQL database.
The chosen Object Relational Mapper is [`prisma`](https://www.prisma.io/).

## DB Structure
The ByteStore database schema should be simple and highly versatile.

### Tables:
- Groups,
- Users,
- User Groups,
- Equipment,
- Equipment Points,
- Role,
- Permissions,
- Actions,
- Accounts,
- Consumables,
- Locations,
- Logs,
- Checkouts,
- Reservations,
- Notifications,
- Documents.

**Groups**
In ByteStore, Groups are organisations that have equipment and users. Groups can be Societies, Clubs, sub-organisations, etc.
There is an auto-generated 'universal' group which will have default data for certain tables that all groups automatically inherit (but can remove).

| Column Name  | ID                              | Name                  | Parent                                                     |
|--------------|---------------------------------|-----------------------|------------------------------------------------------------|
| Data Type    | Text, Primary Key, Not Null     | Text, Not Null        | References Group ID                                        |
| Explaination | A UUID for internal referencing | The name of the Group | An optional element in the case this Group is a sub-entity |

In the event that a Group has a parent, all administrators of the parent group will automatically be able to access and administrate child-groups.

**Users**
Users are people who have created accounts in ByteStore, they can be invited to, or join multiple groups. Users join and sign in using SSO systems, and can have 2FA methods enabled, like security keys or OTPs.

**User Groups**
User Groups is a middletable which contains what groups a User is in and their role within the group.

**Equipment**
Equipment contains all pieces of equipment from all groups. They are tied to groups and have relevant data based on Equipment Points.

**Equipment Points**
Equipment Points is a list of all possible data points that equipment might need, these could be things like name, quantity, description, location, price, etc. ByteStore comes pre-fitted with multiple default values, but Groups may create their own unique data points, so they can also be linked to groups.

**Roles**
Roles are collated sets of permissions that Users can be assigned, these could be things like 'add equipment', 'check out', 'invite'. ByteStore will come pre-fitted with default roles, but Groups can create their own unique roles or edit their default roles.

**Permissions**
Permissions are a list of all permissions that ByteStore supports.

**Actions**
Actions are one-off, or repeating actions Users have to do to equipment. Actions can be highly customised with their schedule, and multiple pieces of Equipment can be attached in different ways to an Action.

**Accounts**
Accounts are login details for services, they contain usernames, passwords and OTP generation. Accounts are non-viewable by default, but access can be given to Users by Group Admins.

**Consumables**
Consumables are items which is ues by Equipment. When a consumable is linked to Equipment, the amount used can be defined. These can then be 'used' by the Equipment.

**Locations**
Locations are place in the world where Equipment can be stored. When checked in, the location will be a stated or created location by the Group. When checked out, it will be 'with' the person who checked it out.

**Logs**
Logging, reporting and accountability is an important element of any inventory tracker. It leaves breadcrumbs to figure out where a lost piece of Equipment may be, or what a specific User is doing, it can also help with doing purchase planning, i.e. seeing that a certain piece of Equipment is consistently checked out, hinting that more of that item should be purchased.

**Checkouts**
Checkout is a list of all Checkout and Check Ins of Equipment by Users. Checkout duration can be customised (capped or defaulted) by Group Admins.

**Reservations**
In-demand Equipment can be reserved by Users, reservation caps can be customised by Group Admins, it will follow first-come, first-serve rules.

**Notifications**
Check In deadline notifications, alert notifications, available reservation notifications, etc. shall be stored here for the User notifications system. The table will also store if they have been read or not.

**Documents**
For tracking, invoices and other instructional documents will be stored for Equipment. This will also store template messages / forms that can be configured by Group Admins.