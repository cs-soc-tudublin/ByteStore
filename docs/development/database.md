# Database

ByteStore requires multiple database tables to be a fully-featured and connected system. This document will go over the design of the database schema, provide example database calls and show common relations.

## DB and DBMS
ByteStore 1 is built upon a PostgreSQL database.
The chosen Database Management System is the `pg` package.

## DB Structure
The ByteStore database schema should be simple and highly versatile.