## CareMatey

A collaborative tool designed for caretakers and those that hire them. Some examples of best uses are for
- Pet owners and their pet sitters
- Parents and their baby sitters
- Vacation home owners and cleaning crews
- A startup company organizing User Stories
- A study group

As a pet owner, we wanted to provide a way that our pet sitters and ourselves can communicate better to 
provide a better experience for our pets. What we found is the relationship can get very 1 sided so quickly.
When both the sitter and the owner are able to provide notes and instructions to the so-called guidebook, 
everyone is happier.

---

Built with Next.js, React, and Chakra-UI.

## Getting Started

Clone the repo

```bash
git clone https://github.com/mikikiv/CareMatey.git
```

Install packages by running

```bash
npm install
```

Create a .env file in the root directory and add the following:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

add .env to .gitignore if it is not already there

initialize prisma then follow the steps to connect to your database

```bash
npx prisma init
```

migrate the database

```bash
npx prisma migrate dev --name init
```

Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command:

```bash
npx prisma generate

npx prisma db push
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!