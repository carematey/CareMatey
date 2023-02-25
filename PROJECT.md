# Purpose

The relationship between an owner (pet owner, homeowner, etc) and a sitter (the hired help to housesit, petsit, etc) is a unique one. An owner may only see their pet sitter once a year (or less) while the sitter may be hired dozens of times a year, to different owners event, to care for the owners pets, home, plants, etc.

This tool's purpose is to create live documention between an owner and their sitter. A place where an owner can write up once, for any sitter to utilize while watching their home; while a sitter can suggest new notes, or improve existing ones, especially as pets, homes, and care changes over time.

# Goals

-   Allow an owner to securly send their care instruction site to anyone they want.
-   Provide sitters a reliable tool for helping maintain an owner's place/property/pets as they've agreed upon elseware.

# Requirements

-   Owners can create an 'unlimited' number of instruction cards from their dashboard for their 'Home'
-   Instruction cards can have any number of tags to help with filtering
-   Sitters can view an owners 'Home' with instruction cards without creating an account
-   Sitters viewed 'Homes' become saved to the sitter's history after viewing

# Future Goals:

-   Owners must be able to create a single account and more than one 'Home'
-   Owners can mark their 'Home' as secure and require a customizable password for access
-   Sitters with an account are able to
    -   make new suggested instruction cards for a 'Home'
    -   make suggested changes to existing instruction cards
-   Owners can view sitters who have saved their 'Home' and revoke their access
-   Owners can generate a unique link that will soft-create a sitter account (no email required and offer sign-in option) when opened
    -   Link should be time based (disable on this day, when the sitter is expected to have left from the home already)
-   Provide Owners with a way to generate a QR code they can print to also soft-create a sitter account when opened

# Security thoughts

-   Any inputted text should be checked for addresses. We should always guide Owners to avoid putting their home address on public websites
-   Revoking a sitter's access will need to be done in a secure way and may mean that an owner's site url is encrypted. This could be very hard to deal with
