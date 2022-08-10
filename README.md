# Tattoo-App

## Description
The main goal with this aplication is facilitate for the artist to organizate their appoimnets.
Another goal is create a section where the artist can recive appoimnet from an online form (Google forms / create personal wepPage), trying to make it easier the process of listening to an idea.

## Start proyect

First of all need to run: `npm i` to install the dependences.

I'm working with expo, to start the proyect we can use two diferents ways:
`npm start / expo start
`
## Supabase
We are using supabase like back-end with this schedule:

Table   -> **tasks**
 

| Name          | Type |
| ------------- | ---- |
|  id           | int8 |
|  title        | text |
|  description  | text |
|  done         | bool |
|  date         | date |
|  hourStart    | time |
|  hourEnd      | time |
|  color        | text |
|  position     | text |
|  img          | text[] |

 

## Goals
- [x] CRUD tasks with supabase
- [ ] Calendar connected with supabase
- [ ] Recive ideas from a online form and save in supabase
- [ ] Create login with supabase

