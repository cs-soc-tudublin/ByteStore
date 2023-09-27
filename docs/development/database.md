# Database

ByteStore requires multiple database tables to be a fully-featured and connected system. This document will go over the design of the database schema, provide example database calls and show common relations.

## DB and ORM
ByteStore 1 is built upon a PostgreSQL database.
The chosen Object Relational Mapper is [`prisma`](https://www.prisma.io/).

## DB Structure
The ByteStore database schema should be simple and highly versatile.