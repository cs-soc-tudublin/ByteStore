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
- Equipment,
- User Groups,
- Permissions,
- Actions,
- Manufacturers,
- Consumables,
- Locations

**Groups**
In ByteStore, Groups are organisations that have equipment and users. Groups can be Societies, Clubs, sub-organisations, etc.

| Column Name  | ID                              | Name                  | Parent                                                     |
|--------------|---------------------------------|-----------------------|------------------------------------------------------------|
| Data Type    | Text, Primary Key, Not Null     | Text, Not Null        | References Group ID                                        |
| Explaination | A UUID for internal referencing | The name of the Group | An optional element in the case this Group is a sub-entity |

In the event that a Group has a parent, all administrators of the parent group will automatically be able to access and administrate child-groups.

**Users**

**Equipment**

**User Groups**

**Permissions**

**Actions**

**Manufacturers**

**Consumables**

**Locations**